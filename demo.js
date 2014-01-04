var tellraw2dom = require('./');
var ever = require('ever');

var inputNode = document.getElementById('input');
var outputNode = document.getElementById('output');
var hoverNode = document.getElementById('hover');

var opts = {
  click: function(element, action, ev) {
            alert('Click action: ' + JSON.stringify(action));
         },
  hover: function(element, action, ev) {
           hoverNode.textContent = JSON.stringify(action);
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

ever(document.body).on('keydown', update);

update();

