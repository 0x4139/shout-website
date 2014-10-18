/**
 * @jsx React.DOM
 */
var Handler = require('./handler');

window.shout={};
React.renderComponent(<Handler/>,document.getElementById('content'));

