document.getElementById('save-to-notion').addEventListener('change', function() {
  const notionSettings = document.getElementById('notion-settings');
  notionSettings.style.display = this.checked ? 'block' : 'none';
});

// get all button that have .visibility-button class
const toggleButtons = document.querySelectorAll('.visibility-button');

toggleButtons.forEach(button => {
  const inputId = button.getAttribute('for');
  button.addEventListener('click', function() {
    const apiKeyInput = document.getElementById(inputId);
    apiKeyInput.type = apiKeyInput.type === 'password' ? 'text' : 'password';
    this.textContent = apiKeyInput.type === 'password' ? '👁️' : '🙈';
  });
});


function showMessageTip(message, isSuccess) {
  const messageTip = document.getElementById('message-tip');
  if (isSuccess) {
    messageTip.textContent = message;
    messageTip.classList.add('success');
  } else {
    messageTip.textContent = message;
    messageTip.classList.add('error');
  }
  messageTip.style.display = 'block';
  messageTip.classList.add('show');

  setTimeout(() => {
    messageTip.classList.remove('show');
    setTimeout(() => {
      messageTip.style.display = 'none';
      messageTip.classList.remove('success', 'error');
    }, 300); // Match this duration with the CSS transition duration
  }, 3000);
}

document.querySelector('.save-button').addEventListener('click', function() {
  const highlightColor = document.getElementById('highlight-color').value;
  const highlightBgColor = document.getElementById('highlight-bg-color').value; 
  const minTextLength = document.getElementById('min-text-length').value;
  const saveToNotion = document.getElementById('save-to-notion').checked;
  const notionApiKey = document.getElementById('notion-api-key').value;
  const notionDatabaseId = document.getElementById('notion-database-id').value;
  const vendor = document.getElementById('vendor').value;
  const llmApiKey = document.getElementById('llm-api-key').value;
  const language = document.getElementById('language').value;
  const enabledUrls = document.getElementById('enabled-urls').value
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0);

  const sysPromptTranslate = document.getElementById('sys-prompt-translate').value;
  const userPromptTranslate = document.getElementById('user-prompt-translate').value;
  const sysPromptExplain = document.getElementById('sys-prompt-explain').value;
  const userPromptExplain = document.getElementById('user-prompt-explain').value;
  
  chrome.storage.local.set({ 
    highlightColor, 
    highlightBgColor, 
    minTextLength, 
    saveToNotion, 
    notionApiKey, 
    notionDatabaseId,
    vendor,
    llmApiKey,
    language,
    enabledUrls,
    sysPromptTranslate,
    userPromptTranslate,
    sysPromptExplain,
    userPromptExplain
  }, function() {
    console.log(`[options.js] Options saved.`);
    showMessageTip('Options saved successfully!', true);
  });

  // Update message to background.js
  chrome.runtime.sendMessage({
    action: 'SP_UPDATE_OPTIONS',
    options: {
      highlightColor,
      highlightBgColor,
      minTextLength,
      saveToNotion,
      notionApiKey,
      notionDatabaseId,
      vendor,
      llmApiKey,
      language,
      enabledUrls,
      sysPromptTranslate,
      userPromptTranslate,
      sysPromptExplain,
      userPromptExplain
    }
  });
});

// Update storage loading
chrome.storage.local.get([
  'highlightColor', 
  'highlightBgColor', 
  'minTextLength', 
  'saveToNotion', 
  'notionApiKey', 
  'notionDatabaseId',
  'vendor',
  'llmApiKey',
  'language',
  'enabledUrls',
  'sysPromptTranslate',
  'userPromptTranslate',
  'sysPromptExplain',
  'userPromptExplain'
], function(data) {
  document.getElementById('highlight-color').value = data.highlightColor || '#000000';
  document.getElementById('highlight-bg-color').value = data.highlightBgColor || '#ff0000';
  document.getElementById('min-text-length').value = data.minTextLength || 3;
  document.getElementById('save-to-notion').checked = data.saveToNotion || false;
  document.getElementById('notion-api-key').value = data.notionApiKey || '';
  document.getElementById('notion-database-id').value = data.notionDatabaseId || '';
  document.getElementById('vendor').value = data.vendor || 'dashscope';
  document.getElementById('llm-api-key').value = data.llmApiKey || '';
  document.getElementById('language').value = data.language || 'chinese';
  document.getElementById('notion-settings').style.display = data.saveToNotion ? 'block' : 'none';
  document.getElementById('enabled-urls').value = (data.enabledUrls || []).join('\n');
  document.getElementById('sys-prompt-translate').value = data.sysPromptTranslate || '';
  document.getElementById('user-prompt-translate').value = data.userPromptTranslate || '';
  document.getElementById('sys-prompt-explain').value = data.sysPromptExplain || '';
  document.getElementById('user-prompt-explain').value = data.userPromptExplain || '';
});