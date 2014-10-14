/**
 * @jsx React.DOM
 */
 var HelloWorld = React.createClass({
 	render: function() {
 		return (
 			<div>HelloWorld</div>
 		);
 	}
 });

 React.renderComponent(<HelloWorld/>,document.getElementById('content'));