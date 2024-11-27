
function requestGlows() {
    // send message to background.js
    console.log(`[sidepanel.js] message request: SP_REQ_HIGHLIGHTS`);
    chrome.runtime.sendMessage({action: 'SP_REQ_HIGHLIGHTS'}, (response) => {
        console.log(`[sidepanel.js] message receive: SP_REQ_HIGHLIGHTS, message: ${JSON.stringify(response)}`);
        if (response.success) {
            showGlows(response.highlights);
        } else {
            console.log(`[sidepanel.js] message response: SP_REQ_HIGHLIGHTS, error: ${response.message}`);
        }
    });
}   

function showToolbarButtons(show) {
  const buttonGroup = document.querySelector('.button-group');
  buttonGroup.style.display = show ? 'flex' : 'none';
}

function showNoHighlights() {
  const container = document.querySelector('.highlights-container');
  const msg = document.createElement('div');
  msg.className = 'no-highlights-message';
  msg.innerHTML = `Happy 404!`;
  container.appendChild(msg);
  showToolbarButtons(false);
}

function showGlows(highlights) {
    const container = document.querySelector('.highlights-container');
    container.innerHTML = '';
    
    if (highlights.length === 0) {
        showNoHighlights();
        return;
    }

    showToolbarButtons(true);
    
    highlights.forEach(highlight => {
      const glow = document.createElement('div');
      glow.className = 'glow-item';
      glow.id = highlight.id;  
      glow.innerHTML = `
        <div class="glow-text">${highlight.text}</div>
        ${highlight.comment ? `<div class="glow-comment">${highlight.comment}</div>` : ''}
        <button class="delete-btn" title="Delete highlight">×</button>
      `;
      
      // Add click event for the highlight item
      glow.onclick = function(event) {
        if (!event.target.classList.contains('delete-btn')) {
          console.log(`[sidepanel.js] highlight item clicked, id: ${highlight.id}`);
          chrome.runtime.sendMessage({action: 'SP_HIGHLIGHT_CLICKED', id: highlight.id}, (response) => {
              console.log(`[sidepanel.js] message receive: SP_HIGHLIGHT_CLICKED, message: ${JSON.stringify(response)}`);
          }); 
        }
      };
      
      // Add click event for the delete button
      const deleteBtn = glow.querySelector('.delete-btn');
      deleteBtn.onclick = function(event) {
        event.stopPropagation();
        console.log(`[sidepanel.js] delete button clicked, id: ${highlight.id}`);
        chrome.runtime.sendMessage({action: 'SP_DELETE_HIGHLIGHT', id: highlight.id}, (response) => {
            console.log(`[sidepanel.js] message receive: SP_HIGHLIGHT_DELETED, message: ${JSON.stringify(response)}`);
            // Remove the highlight item from the DOM after successful deletion
            if (response && response.success) {
                glow.remove();
            }
        });
      };
      
      container.appendChild(glow);
    });
}

function onMessage(message) {
    console.log(`[sidepanel.js] onMessage, message: ${JSON.stringify(message)}`);
    if (message.action === 'BG_UPDATE_SIDE_PANEL') {
        showGlows(message.highlights);
    }   
    return true;
}


function initButtons() {
  const clearBtn = document.querySelector('.clear-btn');
  const hideBtn = document.querySelector('.hide-btn');
  const copyBtn = document.querySelector('.copy-btn');
  const highlightsContainer = document.querySelector('.highlights-container');

  clearBtn.addEventListener('click', () => {
    highlightsContainer.innerHTML = '';
    showNoHighlights();
          
    chrome.runtime.sendMessage({action: 'SP_CLEAR_HIGHLIGHTS'}, (response) => {
        console.log(`[sidepanel.js] message receive: SP_CLEAR_HIGHLIGHTS, message: ${JSON.stringify(response)}`);
    });
  });

  hideBtn.addEventListener('click', () => {
     const highlightsContainer = document.querySelector('.highlights-container');
     
     // if current button is 'Hide', then set hidden to true, otherwise set hidden to false.
     const visible = hideBtn.innerHTML.includes('Hide') ? false : true;

      // send message to background.js
      chrome.runtime.sendMessage({action: 'SP_TOGGLE_HIGHLIGHTS', visible: visible}, (response) => {
        console.log(`[sidepanel.js] message receive: SP_TOGGLE_HIGHLIGHTS, message: ${JSON.stringify(response)}`);
      });

      hideBtn.innerHTML = !visible ? '<i class="fas fa-eye"></i>Show' : '<i class="fas fa-eye-slash"></i>Hide';
  });

  copyBtn.addEventListener('click', async () => {
      const highlights = Array.from(highlightsContainer.querySelectorAll('.glow-item'))
          .map(el => {
            const text = el.querySelector('.glow-text').textContent.trim();
            const comment = el.querySelector('.glow-comment') ? el.querySelector('.glow-comment').textContent.trim() : '';
            return `${text}\t${comment}`;
          })
          .join('\n');
      
      try {
          await navigator.clipboard.writeText(highlights);
          // Optional: Show success message
          copyBtn.innerHTML = '<i class="fas fa-check"></i>Copied!';
          setTimeout(() => {
              copyBtn.innerHTML = '<i class="fas fa-copy"></i>Copy';
          }, 2000);
      } catch (err) {
          console.error('Failed to copy text:', err);
      }
  });
}

function onContentLoaded() {
    console.log(`[sidepanel.js] add message listener`);
    chrome.runtime.onMessage.addListener(onMessage);
    console.log(`[sidepanel.js] request highlights`);
    initButtons();
    requestGlows();
}

document.addEventListener('DOMContentLoaded', onContentLoaded);
