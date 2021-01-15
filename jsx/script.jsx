require('../css/main.scss');

const React = require('react');
const ReactDOM = require('react-dom');
const Text = require('./text.jsx');

ReactDOM.render(
	<Text data-url="real-data.json"/>,
	document.getElementById('tooltip')
)
