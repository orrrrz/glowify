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
  
  chrome.storage.local.set({ 
    highlightColor, 
    highlightBgColor, 
    minTextLength, 
    saveToNotion, 
    notionApiKey, 
    notionDatabaseId,
    vendor,
    llmApiKey,
    language
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
      language
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
  'language'
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
});

    // Add this to your existing JavaScript or in a new script tag
document.getElementById('sponsor-button').addEventListener('click', function() {
  // Replace 'YOUR_PAYMENT_URL' with the actual URL of your payment page
  window.open('YOUR_PAYMENT_URL', '_blank');
});