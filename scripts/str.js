function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16); // Convert to hexadecimal
}

function genUniqueId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const length = 8;
  let result = '';
  
  // Ensure the first character is a letter
  result += characters.charAt(Math.floor(Math.random() * characters.length));
  
  for (let i = 1; i < length; i++) {
    const allCharacters = characters + digits;
    result += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
  }
  
  return result;
}

function getUrlHash(url) {
    const hashIndex = url.indexOf('#');
    if (hashIndex !== -1) {
      url = url.substring(0, hashIndex);
    }
    console.log(`[content.js] url: ${url}, hash: ${simpleHash(url)}`);
    // Use a simple hash function instead of MD5
    return simpleHash(url);
  }

  function getCurrentTs() {
    return new Date().toISOString().replace('T', ' ').slice(0, 19);
  }

const StrUtils = {
    getUrlHash: getUrlHash,
    getCurrentTs: getCurrentTs,
    genUniqueId: genUniqueId
}