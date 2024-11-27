function createFontAwesomeLink() {
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = chrome.runtime.getURL('css/font-awesome.all.min.css') ;
    return fontAwesomeLink; 
}

function createButton(id, icon, onClick, title, style) {
    const button = document.createElement('button');
    button.id = id;
    button.innerHTML = `<i class="fas fa-${icon}"></i>`;
    button.onclick = onClick;
    button.style.cssText = style;
    button.title = title;
    return button;
}

function getXPathForElement(element) {
    if (element.nodeType === Node.TEXT_NODE) {
      return getXPathForElement(element.parentNode) + `/text()[${getTextNodeIndex(element)}]`;
    }
  
    if (element.id) {
      return `id("${element.id}")`;
    }
  
    const parts = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
      let part = element.nodeName.toLowerCase();
      if (element.id) {
        part += `[@id="${element.id}"]`;
        parts.unshift(part);
        break;
      } else if (element.className) {
        part += `[@class="${element.className}"]`;
      } else {
        const siblings = Array.from(element.parentNode.children).filter(e => e.nodeName === element.nodeName);
        if (siblings.length > 1) {
          const index = Array.prototype.indexOf.call(siblings, element) + 1;
          part += `[${index}]`;
        }
      }
      parts.unshift(part);
      element = element.parentNode;
    }
    return parts.length ? `//${parts.join('/')}` : null;
}

function getTextNodeIndex(textNode) {
    let index = 1;
    let sibling = textNode.previousSibling;
    while (sibling) {
      if (sibling.nodeType === Node.TEXT_NODE) {
        index++;
      }
      sibling = sibling.previousSibling;
    }
    return index;
}

function getElementByXPath(xpath) {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!result) {
      console.log(`No element found for XPath: ${xpath}`);
    }
    return result;
}

function copySelection(selection) {
    const range = selection.getRangeAt(0);
    const text = range.toString();
    console.log(`copy text: ${text}`);
    navigator.clipboard.writeText(text);
}



const DomUtils = {
    createFontAwesomeLink: createFontAwesomeLink,
    createButton: createButton,
    getXPathForElement: getXPathForElement,
    getTextNodeIndex: getTextNodeIndex,
    getElementByXPath: getElementByXPath,
    copySelection: copySelection,
    getTextUpToNode: function(node, offset) {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      let text = '';
      let currentNode;
      
      while ((currentNode = walker.nextNode())) {
        if (currentNode === node) {
          text += currentNode.textContent.substring(0, offset);
          break;
        }
        text += currentNode.textContent;
      }
      
      return text;
    }
}