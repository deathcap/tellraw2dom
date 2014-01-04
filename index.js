
function parseRaw(element, parentState) {
  if (typeof element === 'string') {
    return document.createTextNode(element);
  } else {
    // TODO
    return document.createTextNode('TODO');
  }
}

module.exports = function(raw) {
  try {
    var json = JSON.parse(raw);
  } catch (error) {
    console.log(raw);
    return document.createTextNode('Invalid JSON: ' + error);
  }

  return parseRaw(json);

  // references:
  // http://ezekielelin.com/minecraft/tellraw/
  // https://github.com/deathcap/node-minecraft-protocol/blob/986cf0af918768e98ec6b95a9dfcab46f5204e5e/examples/client_chat.js#L116
}
