# tellraw2dom

Convert Minecraft's raw chat format to HTML DOM nodes for display in a web browser.

*[Interactive demo](http://deathcap.github.io/tellraw2dom)*

## Usage

    var tellraw2dom = require('tellraw2dom');

    var node = tellraw2dom('{"text": "hello ", "color": "aqua", "extra": [{"text": "world!", "bold": "true"}]}');
    document.body.appendChild(node);

DOM nodes will be created appropriately to display 'hello **world!**' colored aqua. 

You can pass either a string to be parsed as JSON, or an object which has already been parsed.
`tellraw2dom` optionally accepts a second argument to specify `click`, `hover`, and `hoverOut`
callbacks to support the `clickEvent` and `hoverEvent` properties.

Run `npm start` for a more sophisticated example or visit [http://deathcap.github.io/tellraw2dom](http://deathcap.github.io/tellraw2dom).


Minecraft is property of Mojang Specifications

## See also

* [Tellraw Generator for Minecraft 1.7+](http://ezekielelin.com/minecraft/tellraw/) 
* [node-minecraft-protocol](https://github.com/superjoe30/node-minecraft-protocol)

## License

MIT

