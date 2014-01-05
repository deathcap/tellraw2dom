# tellraw2dom

Convert Minecraft's raw chat format to HTML DOM nodes for display in a web browser.

## Usage

    var tellraw2dom = require('tellraw2dom');

    var node = tellraw2dom('{"text": "hello ", "color": "aqua", "extra": [{"text": "world!", "bold": "true"}]}');
    document.body.appendChild(node);

DOM nodes will be created appropriately to display 'hello *world!*' colored aqua. 


Minecraft is property of Mojang Specifications

## See also

* [Tellraw Generator for Minecraft 1.7+](http://ezekielelin.com/minecraft/tellraw/) 
* [node-minecraft-protocol](https://github.com/superjoe30/node-minecraft-protocol)

## License

MIT

