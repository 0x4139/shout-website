/**
 * @jsx React.DOM
 */
 var PhoneNumber = require('./phoneNumber');
var handler = React.createClass({

	render: function() {
		return (
			<div>
				<div className="row animated bounceInRight">
		            <div className="col-md-4 alert alert-success col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-offset-4 text-center well well-sm">
		                Salut @{window.shout.handler}. Bun venit in Shout!
		            </div>
		        </div>
			</div>
		);
	}

});

module.exports = handler;