var tellraw2dom = require('./');
var ever = require('ever');

var inputNode = document.createElement('textarea');
inputNode.setAttribute('cols', '100');
inputNode.setAttribute('rows', '20');
// based on a good example from http://www.minecraftforum.net/topic/1980545-snapshot-website-to-generate-tellraw-commands/page__st__20#entry25630884
inputNode.appendChild(document.createTextNode(JSON.stringify(
{
    "text": "Hey... ",
    "color": "white",
    "extra": [
        {
            "text": "CLICK HERE",
            "color": "red",
            "bold": "true",
            "italic": "false",
            "underlined": "true",
            "strikethrough": "false",
            "obfuscated": "false",
            "clickEvent": {
                "action": "run_command",
                "value": "/tellraw @p {text:\"Thanks :3\",color:green}"
            }
        },
        {
            "text": " IF YOU DARE",
            "color": "red",
            "bold": "true",
            "italic": "false",
            "underlined": "false",
            "strikethrough": "false",
            "obfuscated": "false"
        },
        {
            "text": ". then try hovering here",
            "color": "yellow",
            "italic": true,
            "hoverEvent": {
              "action": "show_item",
              "value": "{id:322}"
            }
        }
    ]
})));

var outputNode = document.createElement('div');
outputNode.setAttribute('style', 'background: black;');

var hoverNode = document.createElement('span');
hoverNode.style.visibility = 'hidden';

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

document.body.appendChild(inputNode);
document.body.appendChild(hoverNode);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(outputNode);

update();

