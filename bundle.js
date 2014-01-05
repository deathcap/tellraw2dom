;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var tellraw2dom = require('./');

var inputNode = document.getElementById('input');
var outputNode = document.getElementById('output');
var hoverNode = document.getElementById('hover');

var opts = {
  click: function(element, action, ev) {
            alert('Click action: ' + JSON.stringify(action));
         },
  hover: function(element, action, ev) {
           hoverNode.textContent = JSON.stringify(action);
           console.log(ev);
           hoverNode.style.left = ev.x + 'px';
           hoverNode.style.top = ev.y + 'px';
           hoverNode.style.visibility = '';
         },
  hoverOut: function(element, action, ev) {
           hoverNode.style.visibility = 'hidden';
        }
};

var update = function(ev) {
  var inputText = inputNode.value;

  while(outputNode.firstChild)
    outputNode.removeChild(outputNode.firstChild);

  var output = tellraw2dom(inputText, opts);

  if (output)
    outputNode.appendChild(output);
};

document.body.addEventListener('keyup', update);

update();


},{"./":2}],2:[function(require,module,exports){
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

  var parseObject = function(element, state) {
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



},{}]},{},[1])
;