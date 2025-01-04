const Vendors = {
    dashscope: {
        url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
        model: "qwen-plus"
    },
    moonshot: {
        url: 'https://api.moonshot.cn/v1/chat/completions',
        model: "moonshot-v1-8k"
    },
    openai: {
        url: 'https://api.openai.com/v1/chat/completions',
        model: "gpt-4o-mini"
    }, 
    deepseek: {
        url: 'https://api.deepseek.com/chat/completions',
        model: "deepseek-chat"
    }
}

const CozeWorkflows = {
    TRANSLATE: "7451957951755845658",
    EXPLAIN: "7452151691367120907"
}


const DefaultSystemPrompts = {
    forTranslate: function(language, verbose = false) {
        if (!verbose) {
            return `You are a world-famous translation expert proficient in both ${language} and English. Given an input and optionally its appearing context, please explain the input in ${language}.

            example 1:
            context: ITAP of the Adirondacks, usa
            input: ITAP
            output: I Took A Picture的缩写

            example 2:
            context: I need to go to the bank to withdraw some money.
            input: bank
            output: 银行

            example 3:
            context: We sat on the bank of the river and watched the sunset.
            input: bank
            output: 河岸

            example 4:
            context: 专访曼昆：中国经济、股市、楼市与余额宝
            input: 曼昆
            output: 人名，知名经济学家，代表作《经济学原理》
            `
        }
        return `
        Role: You are an expert linguist and translator with deep knowledge of language patterns, etymology, and contextual understanding. Your task is to:

        1. Translate the given sentence while preserving its contextual meaning
        2. Break down any unusual vocabulary or idiomatic expressions if exists
        3. Explain notable grammatical structures if exists. If not, dont explain.
        4. Keep the translation concise and clear.
        5. Keep the explanation as simple and short as possible, without redundant words.
        6. Please always response in ${language}

        Example:

        input:
        As it turns out, this moment had been in the making for years.

        context:

        output:
        结果表明，这一刻已经酝酿多年了。 "As it turns out" 是一个固定短语，意思是“结果表明”或“事实证明”。 "in the making" 是一个固定短语，意思是“正在形成中”或“正在酝酿中”。
        `
    },
    forExplain: function(language) {
        return `
        Role: You are a knowledgeable teacher, skilled in explaining any concept with precise and easily understandable language, while keeping the explanation simple and short. Given the context, please explain the meaning of the specified concept. Please always response in ${language}.

        example:
        context:
            you actually have electron humor
        concept:
            electron humor
        output:
            一种以电子及其特性为主题的幽默，通常表现为科学笑话或双关语。这类幽默往往需要一定的科学知识，尤其是对原子和亚原子粒子的理解
        `
    }
}

const DefaultUserPrompts = {
    forTranslate: function(text, context) {
        return `context:\n${context}\ninput: ${text}\noutput: `;
    },
    forExplain: function(text, context) {
        return `context:\n${context}\nconcept: ${text}\noutput: `;
    }
}


function complete(task, text, context, options, callback) {
    // console.log(`[llm.js] complete: ${text}, ${context}, ${JSON.stringify(options)}`);
    const url = Vendors[options.vendor].url;

    let systemPrompt = "";
    let userPrompt = "";
    
    if (task === 'translate') {

        systemPrompt = DefaultSystemPrompts.forTranslate(options.language);
        if (options.sysPromptTranslate && options.sysPromptTranslate.length > 0) {
            systemPrompt = options.sysPromptTranslate.replace('{{language}}', options.language);
            // console.log(`[llm.js] use custom system prompt: ${systemPrompt}`);
        } else {
            // console.log(`[llm.js] use default system prompt: ${systemPrompt}`);
        }

        userPrompt = DefaultUserPrompts.forTranslate(text, context);
        if (options.userPromptTranslate && options.userPromptTranslate.length > 0) {
            userPrompt = options.userPromptTranslate.replace('{{text}}', text).replace('{{context}}', context);
        }
    } else if (task === 'explain') {

        systemPrompt = DefaultSystemPrompts.forExplain(options.language);
        if (options.sysPromptExplain && options.sysPromptExplain.length > 0) {
            systemPrompt = options.sysPromptExplain.replace('{{language}}', options.language);
        }

        userPrompt = DefaultUserPrompts.forExplain(text, context);
        if (options.userPromptExplain && options.userPromptExplain.length > 0) {
            userPrompt = options.userPromptExplain.replace('{{text}}', text).replace('{{context}}', context);
        }
    }

    // console.log(`[llm.js] systemPrompt: ${systemPrompt}`);
    // console.log(`[llm.js] userPrompt: ${userPrompt}`);

    const payload = {
        model: Vendors[options.vendor].model,
        store: true,
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${options.llmApiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // console.log(`[llm.js] complete result: ${JSON.stringify(data)}`);
        callback({
            "success": true,
            "data": data.choices[0].message.content
        });
    })
    .catch((error) => {
        console.error(`[llm.js] complete error: ${error}`);
        callback({
            "success": false,
            "message": error    
        })
    });
}

function translate(text, context, options, callback) {
    if (options.vendor === 'coze') {
        coze_workflow(text, context, options, CozeWorkflows.TRANSLATE, callback);
    } else {
        complete("translate", text, context, options, callback);
    }
}

function explain(text, context, options, callback) {
    if (options.vendor === 'coze') {
        coze_workflow(text, context, options, CozeWorkflows.EXPLAIN, callback);
    } else {
        complete("explain", text, context, options, callback);
    }
}

async function coze_workflow(text, context, options, workflowId,callback) {
    console.log(`[llm.js] coze_workflow: ${text}, ${context}, ${options}, ${workflowId}`);
    const cozeResponse = await fetch('https://api.coze.cn/v1/workflow/run', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${options.llmApiKey}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            workflow_id: workflowId,
            parameters: { 
                content: text,
                context: context,
                language: options.language
            }
        })
    });
    console.log(`[llm.js] coze response: ${JSON.stringify(cozeResponse)}`);
    const cozeData = await cozeResponse.json();
    console.log(`[llm.js] coze data: ${JSON.stringify(cozeData)}`);
    const data = cozeData.data;
    // convert string to json
    const jsonData = JSON.parse(data);
    callback(jsonData.output);
}

function lookup(text, context, options, callback) {
    if (options.vendor === 'coze') {
        coze_workflow(text, context, options, CozeWorkflows.TRANSLATE, callback);
    } else {
        complete('translate', text, context, options, callback);
    }
}


