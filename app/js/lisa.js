var AmpersandRouter = require('ampersand-router');
Router = AmpersandRouter.extend({
    routes: {
        '': 'home',
        'salam':'salam'
    },
    
    home: function () {
       alert(1);
    },
    salam:function  () {
      alert(2);
    }
});
var router = new Router();
router.history.start({ pushState: true})