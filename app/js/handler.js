/**
 * @jsx React.DOM
 */
 var PhoneNumber = require('./phoneNumber');
var handler = React.createClass({

	render: function() {
		return (
			<div>
				<div className="row animated bounceInRight">
		            <div className="col-md-4 col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-offset-4 text-center well well-sm">
		                <div className="input-group">
		                  <span className="input-group-addon">@</span>
		                  <input onChange={this.handleChange} type="text" minLength="4" maxLength="8" className="form-control" placeholder="Handler"></input>
		                </div>
		                <hr className="hrDelimiter"/>
		                <button id="submitHandler" onClick={this.submitHandler} className="btn btn-info col-md-12 col-xs-12 col-sm-12" data-loading-text="please wait..."><i className="glyphicon glyphicon-share-alt"></i> Next</button>
		            </div>
		        </div>
			</div>
		);
	},
	submitHandler:function(event){
		$('#submitHandler').button('loading');
		React.renderComponent(<PhoneNumber/>,document.getElementById('content'));
	},
	handleChange:function(event){
		window.shout.handler=event.target.value;
	}

});

module.exports = handler;