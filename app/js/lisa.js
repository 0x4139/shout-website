/**
 * @jsx React.DOM
 */
var Home = require('./home');
var Contact = require('./contact');
var AmpersandRouter = require('ampersand-router');
Router = AmpersandRouter.extend({
    routes: {
        '': 'home',
        'contact':'contact'
    },

    home: function () {
      React.renderComponent(<Home/>,document.getElementById('content'));
    },
    contact:function  () {
      React.renderComponent(<Contact/>,document.getElementById('content'));
    }
});
var router = new Router();
router.history.start({ pushState: true})