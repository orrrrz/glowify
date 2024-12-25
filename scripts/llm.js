const Vendors = {
    dashscope: {
        url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
        model: "qwen-plus"
    },
    moonshot: {
        url: 'https://api.moonshot.cn/v1/chat/completions',
        model: "moonshot-v1-8k"
    }
}

const CozeWorkflows = {
    TRANSLATE: "7451957951755845658",
    EXPLAIN: "7452151691367120907"
}



function complete(vendor, system_prompt, user_prompt, secret, callback) {
    
    const url = Vendors[vendor].url;
    const payload = {
        model: Vendors[vendor].model,
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
    const system_prompt = `You are a world-famous translation expert proficient in both ${options.language} and English. Given an input and optionally its appearing context, please explain the input in ${options.language}.

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
    const user_prompt = `context:\n${context}\ninput: ${text}\noutput: `;
    if (options.vendor === 'coze') {
        coze_workflow(text, context, options.language, options.llmApiKey, CozeWorkflows.TRANSLATE, callback);
    } else {
        complete(options.vendor, system_prompt, user_prompt, options.llmApiKey, callback);
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
        complete(options.vendor, system_prompt, user_prompt, options.llmApiKey, callback);
    }
}

async function coze_workflow(text, context, language, apiKey, workflowId,callback) {
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


