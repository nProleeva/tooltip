require('../css/main.scss');

const React = require('react');
const ReactDOM = require('react-dom');
const Text = require('./text.jsx');

ReactDOM.render(
	<Text data-url="real-user-data.json"/>,
	document.getElementById('tooltip')
)