'use strict';

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

var translations = {
  'chat.type.text': '<%s> %s',
  'chat.type.emote': '* %s %s',
  'chat.type.announcement': '[%s] %s',
  'chat.type.admin': '[%s: %s]',
  'chat.stream.text': '(%s) <%s> %s',
  'chat.stream.emote': '(%s) * %s %s'
};

var isTrue = function(x) {
  if (x === undefined) return false;
  if (x === 'false') return false;
  return true;
};

var parseRaw = function(raw, opts) {
  var json;

  opts = opts || {};

  if (typeof raw === 'string') {
    try {
      json = JSON.parse(raw);
    } catch (error) {
      console.log(raw);
      return document.createTextNode('Invalid JSON: ' + error);
    }
  } else {
    json = raw;
  }

  var parseObject = function(element) {
    if (typeof element === 'string') {
      return document.createTextNode(element);
    }

    var node = document.createElement('span');

    if ('color' in element) node.style.color = colormc2html[element.color];
    if (isTrue(element.bold)) node.style.fontWeight = 'bold';
    if (isTrue(element.italic)) node.style.fontStyle = 'italic';
    if (isTrue(element.underlined) || isTrue(element.strikethrough))
      node.style.textDecoration = 
        (isTrue(element.underlined) ? 'underline ' : '') + 
        (isTrue(element.strikethrough) ? 'line-through' : '');

    if ('clickEvent' in element) {
      if (opts.click) {
        node.addEventListener('click', function(ev) {
          opts.click(element, element.clickEvent, ev);
        });
      }
    }

    if ('hoverEvent' in element) {
      if (opts.hover) {
        node.addEventListener('mouseover', function(ev) {
          opts.hover(element, element.hoverEvent, ev);
        });
      }

      if (opts.hoverOut) {
        node.addEventListener('mouseout', function(ev) {
          opts.hoverOut(element, element.hoverEvent, ev);
        });
      }
    }

    if ('text' in element) node.textContent = element.text;
    if ('translate' in element) {
      var translate = translations[element.translate] || element.translate;
      var translateTexts = translate.split('%s');

      (element['with'] || []).forEach(function(x, i) {
        node.appendChild(document.createTextNode(translateTexts[i] || ' '));
        node.appendChild(parseObject(x));
      });

      if (!/%s$/.test(translateTexts))
        node.appendChild(document.createTextNode(translateTexts.splice(-1)[0]));
    }

    if ('extra' in element) {
      element.extra.forEach(function(x) {
        node.appendChild(parseObject(x));
      });
    }

    return node;
  };

  return parseObject(json);

  // references:
  // http://ezekielelin.com/minecraft/tellraw/
  // https://github.com/deathcap/node-minecraft-protocol/blob/986cf0af918768e98ec6b95a9dfcab46f5204e5e/examples/client_chat.js#L116
}
module.exports = parseRaw;


