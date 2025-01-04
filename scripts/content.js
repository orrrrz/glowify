const Constants = {
  HIGHLIGHT_CLASS: 'lt-highlight',
  COMMENT_CLASS: 'lt-comment'
}

const Options = {
  highlightColor: '#ff0000',
  highlightBgColor: '#ffeb3b',
  minTextLength: 3,
  saveToNotion: false,
  notionApiKey: '',
  notionDatabaseId: '',
  vendor: 'openai',
  llmApiKey: '',
  language: 'Chinese',
  enabledUrls: [],
  sysPromptTranslate: '',
  userPromptTranslate: '',
  sysPromptExplain: '',
  userPromptExplain: '',
  load: function(cb) {
    chrome.storage.local.get(['highlightColor', 'highlightBgColor', 'minTextLength', 'autoSync', 'llmApiKey', 'vendor', 'language', 'enabledUrls', 'sysPromptTranslate', 'userPromptTranslate', 'sysPromptExplain', 'userPromptExplain', 'saveToNotion'], function(data) {
      Options.highlightColor = data.highlightColor || Options.highlightColor;
      Options.highlightBgColor = data.highlightBgColor || Options.highlightBgColor;
      Options.minTextLength = data.minTextLength || Options.minTextLength;
      Options.autoSync = data.autoSync || Options.autoSync;
      Options.llmApiKey = data.llmApiKey || Options.llmApiKey;
      Options.vendor = data.vendor || Options.vendor;
      Options.language = data.language || Options.language;
      Options.enabledUrls = data.enabledUrls || Options.enabledUrls;
      Options.sysPromptTranslate = data.sysPromptTranslate || Options.sysPromptTranslate;
      Options.userPromptTranslate = data.userPromptTranslate || Options.userPromptTranslate;
      Options.sysPromptExplain = data.sysPromptExplain || Options.sysPromptExplain;
      Options.userPromptExplain = data.userPromptExplain || Options.userPromptExplain;
      Options.saveToNotion = data.saveToNotion || Options.saveToNotion;
      cb();
    }); 
  }
}

let savedRange = null; // Add this line to declare savedRange


function highlightRange(range) {

} 

function onCopy() {
  const selection = window.getSelection();
  // print all ranges in selection
  // console.log(`[content.js] selection ranges: ${selection.rangeCount}`);
  if (Toolbar.getCurrentMode() === Mode.EDIT_MODE) {
    const highlightSpan = Toolbar.getHighlightSpan();
    // console.log(`[content.js] onCopy highlight text: ${highlightSpan.id}`);
    if (highlightSpan) {
      // console.log(`[content.js] onCopy highlight text: ${highlightSpan.textContent}`);
      navigator.clipboard.writeText(highlightSpan.textContent); 
    }
  } else {
    if (selection.rangeCount > 0) {
      DomUtils.copySelection(selection);
    }
  }
  Toolbar.hide();
}



function getCurrentOccurrence(range, text) {
  const textBeforeSelection = DomUtils.getTextUpToNode(range.startContainer, range.startOffset);
  const occurrencesBefore = textBeforeSelection.split(text).length - 1;
  return occurrencesBefore + 1;
}


function createGlow(text, n) {
  // console.log(`[content.js] highlightOccurrence: ${text}, ${n}`);
  const range = searchOccurrence(text, n);

  const span = HighlightSpan.create(
    range, 
    Options.highlightColor, 
    Options.highlightBgColor
  );  
  span.dataset.text = text;
  span.dataset.occurrence = n;

  Toolbar.setHighlightId(span.id);
  // console.log(`[content.js] highlighted range: ${range.toString()}, dataset: ${JSON.stringify(span.dataset)}`);  

  onGlowChange("create", HighlightSpan.getData(span));
  return span;
}

function onHighlight() {

  const {text, occurrence, highlighted, selected} = getCurrentText();
  if (highlighted) {
    return;
  }

  const glow = createGlow(text, occurrence);
  if (selected) {
    window.getSelection().removeAllRanges(); 
  }

  Toolbar.hide();
  updateSidePanel();
}

function onTranslate() {
  const {highlighted, text} = getCurrentText();
  if (!highlighted) {
    createGlow(text, occurrence);
  } 

  const glow = Toolbar.getHighlightSpan();

  // get the full text that this selection is in.
  const context = glow.parentNode.textContent;

  translate(text, context, Options, (data) => {
    // console.log(`[content.js] translate result: ${data}`);
    if (data.success) {
      saveComment(data.data, glow);
    } else {
      saveComment("Failed to translate", glow);
    }
  }); 

}

function onExplain() {
  const {highlighted, occurrence, text} = getCurrentText();
  if (!highlighted) {
    createGlow(text, occurrence);
  } 

  const glow = Toolbar.getHighlightSpan();
  const context = glow.parentNode.textContent;

  explain(text, context, Options, (data) => {
    // console.log(`[content.js] explain result: ${data}`);
    if (data.success) {
      saveComment(data.data, glow);
    } else {
      saveComment("Failed to explain", glow);
    }
  }); 

  Toolbar.hide();
  updateSidePanel();
}

function appendAudioLink(parent, text) {
  const link = document.createElement('a');
  link.href = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;
  link.target = '_blank'; 
  link.title = 'Pronunciation';
  link.textContent = '';
  link.className = "audio"

  const image = document.createElement('img');
  image.src = "https://cdn.icon-icons.com/icons2/3106/PNG/512/sound_speaker_audio_icon_191620.png";

  image.style.width = '1em';
  image.style.height = '1em';
  image.style.display = 'inline';
  image.style.verticalAlign = 'sub';
  image.style.margin="0";
  link.appendChild(image);
  parent.insertBefore(link, parent.firstChild);
}

function appendAudioButton(parent, text) {
  // create a image button
  const image = document.createElement('img');
  image.src = "https://cdn.icon-icons.com/icons2/3106/PNG/512/sound_speaker_audio_icon_191620.png";
  image.style.width = '1em';
  image.style.height = '1em';
  image.style.display = 'inline';
  image.style.verticalAlign = 'sub';
  image.style.margin="0";
  image.className = "audio"

  parent.insertBefore(image, parent.firstChild);
  image.addEventListener('click', () => {
    const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;
    const audio = new Audio(url);
    audio.play();
  });
}

function getCurrentText() {
  let glow = Toolbar.getHighlightSpan();
  if (glow) {
    return {
      selected: window.getSelection().rangeCount > 0,
      highlighted: true,
      text: glow.dataset.text, 
      occurrence: glow.dataset.occurrence
    };
  }
  const selection = window.getSelection();
  if (selection.rangeCount <= 0) {
    return {
      selected: false,
      highlighted: false,
      text: "",
      occurrence: 0
    };
  } 
  const range = selection.getRangeAt(0);
  const text = selection.toString();

  const currentOccurrence = getCurrentOccurrence(range, text);
  return {
    selected: true,
    highlighted: false,
    text: text, 
    occurrence: currentOccurrence
  };
}

function onWordLookup() {
  const {highlighted, text, occurrence} = getCurrentText();
  if (!highlighted) {
    createGlow(text, occurrence);
  } 

  const glow = Toolbar.getHighlightSpan();
  const context = glow.parentNode.textContent;
  // console.log(`[content.js] lookup text: ${text}, context: ${context}`);

  lookup(text, context, Options, (data) => {
    // console.log(`[content.js] lookup result: ${data}`);
    if (data.success) {
      saveComment(data.data, glow);
    } else {
      saveComment("Failed to lookup", glow);
    }
    const commentSpan = Toolbar.getCommentSpan();
    if (commentSpan) {
      if (commentSpan.querySelector('.audio')) {
        return;
      }
      const domain = window.location.hostname;
      // console.log(`[content.js] lookup domain: ${domain}`);
      if (domain === 'x.com' || domain === 'reddit.com') {
        appendAudioLink(commentSpan, text);
      } else {
        appendAudioButton(commentSpan, text);
      }
    }
  }); 

  Toolbar.hide();
  updateSidePanel();
}

function onTranslate() {
  const {highlighted, text, occurrence} = getCurrentText();
  if (!highlighted) {
    createGlow(text, occurrence);
  } 

  const glow = Toolbar.getHighlightSpan();
  const context = glow.parentNode.textContent;

  translate(text, context, Options, (data) => {
    // console.log(`[content.js] translate result: ${data}`);
    if (data.success) {
      saveComment(data.data, glow);
    } else {
      saveComment("Failed to translate", glow);
    }

    // if text is all english letters or space or dash, then append audio button.
    if (text.match(/^[a-zA-Z\s-]+$/)) {
      const commentSpan = Toolbar.getCommentSpan();
      if (commentSpan) {
        if (commentSpan.querySelector('.audio')) {
          return;
        }
        const domain = window.location.hostname;
        // console.log(`[content.js] lookup domain: ${domain}`);
        if (domain === 'x.com' || domain === 'reddit.com') {
          appendAudioLink(commentSpan, text);
        } else {
          appendAudioButton(commentSpan, text);
        }
      }
    } // end of if
  }); 

  Toolbar.hide();
  updateSidePanel();
}

function onGlowChange(event, highlightInfo) {


  const data = {
    pageDomain: window.location.hostname,
    pageUrl: window.location.href,
    pageTitle: document.title
  }

  Object.assign(data, highlightInfo);

  // console.log(`action: CT_HIGHLIGHT_CHANGED, event: ${event}, data: ${JSON.stringify(data)}`);  

  chrome.runtime.sendMessage({
    action: 'CT_HIGHLIGHT_CHANGED',
    event: event,
    data: data
  }); 
}

/**
 * 分为以下几种情况:
 * 1. 当前文本未高亮， 此时 highlightSpan 为空， 则使用 savedRange 来高亮
 * 2. 当前文本已高亮:
 *    2.1 当前文本已有 comment， 则此时输入框初始内容为此comment
 *    2.2 当前文本没有 comment， 则此时输入框初始内容为空
 */
function onComment() {
  
  
  let currentComment = "";

  const {selected, highlighted, text, occurrence} = getCurrentText();

  if (!highlighted) {
    glow = createGlow(text, occurrence);
  } else {
    glow = Toolbar.getHighlightSpan();

    const commentContentSpan = Toolbar.getCommentContentSpan();
    if (commentContentSpan) {
      currentComment = commentContentSpan.textContent;
      // console.log(`currentComment: ${currentComment}`);
    } 
  }

  if (glow) {
    const commentContentSpan = Toolbar.getCommentContentSpan();
    // console.log(`commentContentSpan: ${commentContentSpan}`);
    if (commentContentSpan) {
      currentComment = commentContentSpan.textContent;
      // console.log(`currentComment: ${currentComment}`);
    } 
  } 

  CommentForm.create(currentComment, (comment) => {
    saveComment(comment, glow);
  }, glow.textContent);
  Toolbar.hide();
}

// 保存评论
function saveComment(comment, glow) {
  // console.log(`saving comment: ${comment}, highlightSpan: ${glow.textContent}`);

  let commentSpan = Toolbar.getCommentSpan();
  if (comment === "") {
    commentSpan?.remove(); 
  } else {
      if (!commentSpan) { 
        commentSpan = CommentSpan.create(comment, glow);
      } else {
        const commentContentSpan = Toolbar.getCommentContentSpan();
        if (commentContentSpan) {
          commentContentSpan.textContent = comment;
        }
      }
  }

  glow.dataset.comment = comment;  
  glow.dataset.updatedAt = StrUtils.getCurrentTs();

  // console.log(`comment saved. dataset of highlight ${highlightSpan.id}: ${JSON.stringify(highlightSpan.dataset, space=2)}`);
  updateSidePanel();
  onGlowChange("update", HighlightSpan.getData(glow));
}



function deleteGlow(glow) {
  if (glow) {
    const commentSpan = glow.nextElementSibling;
    // console.log(`deleteGlow commentSpan: ${commentSpan}`);

    if (commentSpan && commentSpan.classList.contains("g-inline-comment")) {
      commentSpan.remove();
    } 
    
    // 保存父节点的引用
    const parentNode = glow.parentNode;
    
    const fragment = document.createDocumentFragment();
    while (glow.firstChild) {
      fragment.appendChild(glow.firstChild);
    }

    parentNode.replaceChild(fragment, glow);
    
    // 使用保存的父节点引用来合并文本节点
    parentNode.normalize();
  }
}

function onDelete() {
  const glow = Toolbar.getHighlightSpan();

  deleteGlow(glow);

  onGlowChange("delete", HighlightSpan.getData(glow));
  
  hideToolbar();
  updateSidePanel();
}


function isSelectionAcrossMultipleParagraphs(selection) {
  const range = selection.getRangeAt(0);
  const startContainer = range.startContainer;
  const endContainer = range.endContainer;

  // Helper function to get the closest paragraph
  const getClosestParagraph = (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      return node.closest('p');
    }
    return node.parentElement ? node.parentElement.closest('p') : null;
  };

  // If start and end are in different paragraphs, return true
  if (getClosestParagraph(startContainer) !== getClosestParagraph(endContainer)) {
    return true;
  }

  // Check all nodes within the range
  const nodeIterator = document.createNodeIterator(range.commonAncestorContainer);
  let node;
  let paragraphs = new Set();

  while (node = nodeIterator.nextNode()) {
    if (range.intersectsNode(node) && node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'P') {
      paragraphs.add(node);
      if (paragraphs.size > 1) {
        return true;
      }
    }
  }

  return false;
}

function onMouseUp(event) {
  // console.log(`[content.js] onMouseUp, isEnabled: ${App.isEnabled()}`);
  if (!App.isEnabled()) {
    // console.log(`skip mouseup in disabled page: ${window.location.href}`);
    return;
  } 

  if (event.target.closest('#selection-toolbar')) {
    // console.log("skip mouseup in toolbar.");
    return;
  }

  if (event.target.closest('#comment-form')) {
    // console.log("skip mouseup in comment form.");
    return;
  }

  // if current cursor is inside a code block, then return
  if (event.target.closest('code') || event.target.closest('pre')) {
    // console.log("skip mouseup in code block.");
    Toolbar.hide();
    return;
  }

  const selection = window.getSelection();
  if (selection.toString().length < Options.minTextLength) {
    // console.log(`skip mouse up with no selection or too small text. selection = ${selection.toString()}`);
    Toolbar.hide();
    return;
  }

  // Check if selection spans multiple text nodes
  if (selection.anchorNode !== selection.focusNode) {
    const anchorParent = selection.anchorNode.parentElement;
    const focusParent = selection.focusNode.parentElement;
    
    // If the parent elements are different, it spans multiple text nodes
    if (anchorParent !== focusParent) {
      // console.log("Selection spans multiple text nodes. Skipping.");
      // console.log(`selection spans multiple text nodes. selection: ${selection.toString()}, anchorNode: ${selection.anchorNode.outerHTML}, focusNode: ${selection.focusNode.outerHTML}`);
      Toolbar.hide();
      return;
    }
  }

  if (selection.anchorNode.nodeType === Node.ELEMENT_NODE && selection.anchorNode.closest('#comment-form')) {
    // console.log("skip mouseup in comment form.");
    Toolbar.hide();
    return;
  }

  if (selection.focusNode.nodeType === Node.ELEMENT_NODE && selection.focusNode.closest('#comment-form')) {
    // console.log("skip mouseup in comment form.");
    Toolbar.hide();
    return;
  }

  // console.log(`start container: ${selection.anchorNode.outerHTML}`);
  // console.log(`end container: ${selection.focusNode.outerHTML}`); 
  if (CommentForm.isShowing()) {
    CommentForm.remove();
    Toolbar.hide();
  }

  // if current selection strech over multiple P nodes, just return and don't show toolbar.
  const startNode = selection.anchorNode;
  const endNode = selection.focusNode;
  if (isSelectionAcrossMultipleParagraphs(selection)) {
    // console.log(`skip mouseup in multiple P nodes`);
    Toolbar.hide();
    return;
  } 

  // console.log(`show toolbar in norm mode, selected text: ${selection.toString()}, target: ${event.target.outerHTML}`);
  Toolbar.show(Mode.NORM_MODE, event);
}

function getAllGlows() {
  return Array.from(document.querySelectorAll("." + Constants.HIGHLIGHT_CLASS)).map(HighlightSpan.getData);
}

function updateSidePanel() {
  chrome.runtime.sendMessage({
    action: 'CT_UPDATE_SIDE_PANEL',
    highlights: getAllGlows()
  }, (response) => {
    
  });
  saveGlowsToLocal();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'BG_REQ_HIGHLIGHTS') {

    sendResponse({highlights: getAllGlows()});
  } else if (message.action === 'BG_HIGHLIGHT_CLICKED') {

    const highlightSpan = document.querySelector(`#${message.id}`);
    if (highlightSpan) {
      highlightSpan.scrollIntoView({ behavior: 'smooth' }); 
    }
  } else if (message.action === 'BG_UPDATE_OPTIONS') {

    // console.log(`event: BG_UPDATE_OPTIONS, data: ${JSON.stringify(message)}`);
    Object.assign(Options, message.options);

  } else if (message.action === 'BG_DELETE_HIGHLIGHT') {

    // console.log(`event: BG_DELETE_HIGHLIGHT, data: id = ${message.id}`);
    const highlightSpan = document.querySelector(`#${message.id}`);
    if (highlightSpan) {
      deleteGlow(highlightSpan);
      sendResponse({success: true});  
    } else {
      sendResponse({success: false});
    }
  } else if (message.action === 'BG_CLEAR_HIGHLIGHTS') {
    document.querySelectorAll("." + Constants.HIGHLIGHT_CLASS).forEach(glow => {
      onGlowChange("delete", HighlightSpan.getData(glow));
      deleteGlow(glow);
    });
  } else if (message.action === 'BG_HIGHLIGHT_SELECTION') {

    App.enable(true);
    onHighlight();
  } else if (message.action === 'BG_ACTION_CLICKED') {

    // console.log(`event: BG_ACTION_CLICKED`);
    App.toggleEnable(); 
    sendResponse({success: true, isEnabled: App.isEnabled()});
  } else if (message.action === 'BG_TOGGLE_HIGHLIGHTS') {
    // console.log(`event: BG_TOGGLE_HIGHLIGHTS, visible: ${message.visible}`);
    setVisibility(message.visible);
  } else if (message.action === 'BG_REQUEST_ENABLED_STATUS') {
    sendResponse({isEnabled: App.isEnabled()});
  }
  return true;
});


function setVisibility(visible) {
  // get all comment spans.
  const commentSpans = document.querySelectorAll(".g-inline-comment");
  commentSpans.forEach(commentSpan => {
    commentSpan.style.display = visible ? 'inline' : 'none';
  });

  // get all highlight spans.
  const highlightSpans = document.querySelectorAll("." + Constants.HIGHLIGHT_CLASS);
  highlightSpans.forEach(highlightSpan => {
    highlightSpan.style.backgroundColor = visible ? Options.highlightBgColor : 'transparent';
    highlightSpan.style.color = visible ? Options.highlightColor : 'inherit';
  });
}

function saveGlowsToLocal() {

  const highlights = getAllGlows();
  const urlHash = StrUtils.getUrlHash(window.location.href);

  // console.log(`[content.js] highlights: ${JSON.stringify(highlights)}`);  
  localStorage.setItem('highlights-' + urlHash, JSON.stringify(highlights));
}



function loadGlowsFromLocal() {
  const urlHash = StrUtils.getUrlHash(window.location.href);
  const highlights = JSON.parse(localStorage.getItem('highlights-' + urlHash)) || [];
  // console.log(`[content.js] load highlights: ${JSON.stringify(highlights)}`);  
  highlights.forEach(highlightData => {
      const highlightSpan = HighlightSpan.restore(highlightData, Options.highlightColor, Options.highlightBgColor);
      // console.log(`highlight restored: ${highlightSpan}, comment : ${highlightData.comment}`);
      if (highlightSpan && highlightData.comment && highlightData.comment !== "") {
        CommentSpan.create(highlightData.comment, highlightSpan);
    }
  });
  // console.log('All highlights loaded from local storage');
}




function loadGlows() {
  if (Options.saveToNotion) {
    chrome.runtime.sendMessage({
      action: 'CT_FETCH_HIGHLIGHTS',
      pageUrl: window.location.href
    }, (response) => {
      // console.log(`[content.js] message response: CT_FETCH_HIGHLIGHTS, data: ${JSON.stringify(response)}`);
      if (response.success) {
        response.highlights.forEach(highlightData => {
          const highlightSpan = HighlightSpan.restore(highlightData, Options.highlightColor, Options.highlightBgColor);
          // console.log(`highlight restored: ${highlightSpan}, comment : ${highlightData.comment}`);
          if (highlightSpan && highlightData.comment && highlightData.comment !== "") {
            CommentSpan.create(highlightData.comment, highlightSpan);
          }
        });
      }
    });
  } else {
    // load from local storage.
    console.log(`[content.js] load glows from local storage.`);
    loadGlowsFromLocal();
  }
}

function getCurrentUrlHash() {
  const url = window.location.href.split('?')[0];
  return StrUtils.getUrlHash(url);
}

function setUrlEnabled(isEnabled) {
  const urlHash = getCurrentUrlHash();
  localStorage.setItem('glowify-enabled-' + urlHash, isEnabled);
}

function getUrlEnabled() {
  const urlHash = getCurrentUrlHash();
  if (localStorage.getItem('glowify-enabled-' + urlHash) === 'true') {
    return true;
  }

  const url = window.location.href.split('?')[0];
  // console.log(`[content.js] enabled urls: ${JSON.stringify(Options.enabledUrls)}, testing url: ${url}`);
  return Options.enabledUrls.some(urlPattern => {
    
    const regex = new RegExp(urlPattern);
    const result = regex.test(url);
    // console.log(`testing url: ${url}, pattern: ${urlPattern}, result: ${result}`);
    return result;
  });
}

function setBadgeStatus(isEnabled) {
  chrome.runtime.sendMessage({
    action: 'BG_UPDATE_BADGE',
    enabled: isEnabled
  });
}

function delayLoadGlows() {

  setTimeout(() => {
    loadGlows();
  }, 3000);
}

const App = {
  isEnabled: () => getUrlEnabled(),
  enable: (isEnabled) => {
    console.log(`[content.js] enable glowify: ${isEnabled}`);
    if (isEnabled == getUrlEnabled()) {
      return;
    }
    setUrlEnabled(isEnabled);
    setBadgeStatus(isEnabled);

    if (isEnabled) {
      delayLoadGlows();
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  },
  toggleEnable: () => App.enable(!App.isEnabled()),
  init: () => {
    // Create toolbar with all action buttons
    Toolbar.create([
      {id: 'explainBtn', icon: 'question', onClick: onExplain, title: 'Explain' },
      {id: 'translateBtn', icon: 'globe', onClick: onTranslate, title: 'Translate' },
      {id: 'highlightBtn', icon: 'highlighter', onClick: onHighlight, title: 'Highlight' },
      {id: 'commentBtn', icon: 'comment', onClick: onComment, title: 'Comment' },
      {id: 'deleteBtn', icon: 'trash-alt', onClick: onDelete, title: 'Delete' },
      {id: 'copyBtn', icon: 'copy', onClick: onCopy, title: 'Copy' }
    ]);

    document.addEventListener('mouseup', onMouseUp);

    Options.load(() => {
      if (App.isEnabled()) {

        setBadgeStatus(true);
        delayLoadGlows();
      } else {
        setBadgeStatus(false);
      }
    });
  }
};

App.init();

// console.log('Content script loaded successfully');
