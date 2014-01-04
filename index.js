'use strict';

var ever = require('ever');

var colormc2html = {
  black: 'black',
  dark_blue: '#0000b2',
  dark_green: '#14ab00',
  dark_aqua: '#13aaab',
  dark_red: '#a90400',
  dark_purple: '#a900b2',
  gold: '#feac00',
  gray: 'gray',
  dark_gray: '#555555',
  blue: '#544cff',
  green: '#5cff00',
  aqua: '#5bffff',
  red: '#fd5650',
  light_purple: '#fd4dff',
  yellow: 'yellow',
  white: 'white'
};

var isTrue = function(x) {
  if (x === undefined) return false;
  if (x === 'false') return false;
  return true;
};

var parseRaw = function(element, state) {
  if (typeof element === 'string') {
    return document.createTextNode(element);
  }

  var node = document.createElement('span');

  if ('color' in element) node.style.color = colormc2html[element.color];
  if ('text' in element) node.textContent = element.text;
  if (isTrue(element.bold)) node.style.fontWeight = 'bold';
  if (isTrue(element.italic)) node.style.fontStyle = 'italic';
  if (isTrue(element.underlined) || isTrue(element.strikethrough))
    node.style.textDecoration = 
      (isTrue(element.underlined) ? 'underline ' : '') + 
      (isTrue(element.strikethrough) ? 'line-through' : '');

  if ('clickEvent' in element) {
    ever(node).on('click', function(ev) {
      window.alert('Click event: ' + JSON.stringify(element.clickEvent));
    });
  }

  if ('hoverEvent' in element) {
    ever(node).on('mouseover', function(ev) {
      // TODO
    });
  }

  if ('extra' in element) {
    element.extra.forEach(function(x) {
      node.appendChild(parseRaw(x));
    });
  }

  return node;
};

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
