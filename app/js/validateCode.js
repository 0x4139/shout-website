/**
 * @jsx React.DOM
 */
var Congrats = require('./congrats');
var handler = React.createClass({

	render: function() {
		return (
			<div>
				<div className="row animated bounceInRight">
		            <div className="col-md-4 col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-offset-4 text-center well well-sm">
		                <div className="input-group">
		                  <span className="input-group-addon">SMS code</span>
		                  <input onChange={this.handleChange} type="text" className="form-control" placeholder="Enter received code"></input>
		                </div>
		                <hr className="hrDelimiter"/>
		                <button id="submitHandler" onClick={this.submitHandler} className="btn btn-info col-md-12 col-xs-12 col-sm-12" data-loading-text="finishing up ..."><i className="glyphicon glyphicon-share-alt"></i> Finish</button>
		            </div>
		        </div>
			</div>
		);
	},
	submitHandler:function(event){
		$('#submitHandler').button('loading');
		$.post( "http://shoutapi.herokuapp.com/create", window.shout)
		  .done(function( data ) {
			React.renderComponent(<Congrats/>,document.getElementById('content'));
		  })
		  .fail(function(data) {
		    alert(data);
		  });
	},
	handleChange:function(event){
		window.shout.code=event.target.value;
	}

});

module.exports = handler;