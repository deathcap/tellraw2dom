
var colormc2html = {
  'white': 'white'
};

var parseRaw = function(element, state) {
  if (typeof element === 'string') {
    return document.createTextNode(element);
  }

  var node = document.createElement('span');

  if ('color' in element) {
    node.style.color = colormc2html[element.color];
  }

  if ('text' in element) {
    node.textContent = element.text;
  }

  if ('extra' in element) {
    element.extra.forEach(function(x) {
      node.appendChild(parseRaw(x));
    });
  }

  return node;
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
