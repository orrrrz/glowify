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
    }
}

const CozeWorkflows = {
    TRANSLATE: "7451957951755845658",
    EXPLAIN: "7452151691367120907"
}


const SystemPrompts = {
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

const UserPrompts = {
    forTranslate: function(text, context) {
        return `context:\n${context}\ninput: ${text}\noutput: `;
    },
    forExplain: function(text, context) {
        return `context:\n${context}\nconcept: ${text}\noutput: `;
    }
}


function complete(vendor, system_prompt, user_prompt, secret, callback) {
    
    const url = Vendors[vendor].url;
    const payload = {
        model: Vendors[vendor].model,
        store: true,
        messages: [
            {
                role: "system",
                content: system_prompt
            },
            {
                role: "user",
                content: user_prompt
            }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${secret}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(`[llm.js] complete result: ${JSON.stringify(data)}`);
        callback(data.choices[0].message.content);
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
        coze_workflow(text, context, options.language, options.llmApiKey, CozeWorkflows.TRANSLATE, callback);
    } else {
        complete(options.vendor, 
            SystemPrompts.forTranslate(options.language, verbose=false), 
            UserPrompts.forTranslate(text, context), 
            options.llmApiKey, 
        callback);
    }
}

function explain(text, context, options, callback) {
    const system_prompt = `You are a knowledgeable teacher, skilled in explaining any concept with precise and easily understandable language, while keeping the explanation simple and short. Given the context, please explain the meaning of the specified concept. Please always response in ${options.language}.
    example:
    context:
        you actually have electron humor
    concept:
        electron humor
    output:
        一种以电子及其特性为主题的幽默，通常表现为科学笑话或双关语。这类幽默往往需要一定的科学知识，尤其是对原子和亚原子粒子的理解
    `;
    const user_prompt = `context:\n${context}\nconcept: ${text}\noutput: `;
    console.log(`[llm.js] explain prompt: ${user_prompt}`);
    if (options.vendor === 'coze') {
        coze_workflow(text, context, options.language, options.llmApiKey, CozeWorkflows.EXPLAIN, callback);
    } else {
        complete(options.vendor, 
            SystemPrompts.forExplain(options.language), 
            UserPrompts.forExplain(text, context), 
            options.llmApiKey, 
            callback
        );
    }
}

async function coze_workflow(text, context, language, apiKey, workflowId,callback) {
    console.log(`[llm.js] coze_workflow: ${text}, ${context}, ${language}, ${workflowId}`);
    const cozeResponse = await fetch('https://api.coze.cn/v1/workflow/run', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            workflow_id: workflowId,
            parameters: { 
                content: text,
                context: context,
                language: language
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
    const system_prompt = `You are a translation expert proficient in both English and ${options.language}. Given the following word and its appearing context, please explain the word meaning in ${options.language}.`;
    const user_prompt = `context:\n${context}\ninput: ${text}\noutput: `;
    console.log(`[llm.js] lookup prompt: ${user_prompt}`);
    if (options.vendor === 'coze') {
        coze_workflow(text, context, options.language, options.llmApiKey, CozeWorkflows.TRANSLATE, callback);
    } else {
        complete(options.vendor, system_prompt, user_prompt, options.llmApiKey, callback);
    }
}


