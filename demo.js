var tellraw2dom = require('./');
var ever = require('ever');

var inputNode = document.createElement('textarea');
inputNode.setAttribute('cols', '100');
inputNode.setAttribute('rows', '20');

var outputNode = document.createElement('div');

ever(document.body).on('keydown', function(ev) {
  var inputText = inputNode.value;

  while(outputNode.firstChild)
    outputNode.removeChild(outputNode.firstChild);

  outputNode.appendChild(tellraw2dom(inputText));
});


document.body.appendChild(inputNode);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(outputNode);

ever(document.body).on('load', function() { // TODO
  inputNode.focus();
});
