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

