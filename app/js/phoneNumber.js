/**
 * @jsx React.DOM
 */
var validateCode = require('./validateCode');
var handler = React.createClass({

	render: function() {
		return (
			<div>
				<div className="row animated bounceInRight">
		            <div className="col-md-4 col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-offset-4 text-center well well-sm">
		                <div className="input-group">
		                  <span className="input-group-addon">+4</span>
		                  <input onChange={this.handleChange} type="text" className="form-control" placeholder="Enter your phone number"></input>
		                </div>
		                <hr className="hrDelimiter"/>
		                <button id="submitHandler" onClick={this.submitHandler} className="btn btn-info col-md-12 col-xs-12 col-sm-12" data-loading-text="sending code via SMS..."><i className="glyphicon glyphicon-share-alt"></i> Next</button>
		            </div>
		        </div>
			</div>
		);
	},
	submitHandler:function(event){
		if(window.shout.phoneNumber.length == 12){
			$('#submitHandler').button('loading');
			$.post( "http://shoutapi.herokuapp.com/validate", {phoneNumber:window.shout.phoneNumber})
			  .done(function( data ) {
				React.renderComponent(<validateCode/>,document.getElementById('content'));
			  })
			  .fail(function(data){
				var response = $.parseJSON( data.responseText );
				alert(response.message);
			  });
		}else{
			alert('Phone number is invalid');
		}
	},
	handleChange:function(event){
		window.shout.phoneNumber='+4'+event.target.value;
	}

});

module.exports = handler;