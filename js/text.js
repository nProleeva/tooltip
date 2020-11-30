const Tooltip = props => {
	return React.createElement(
		'span',
		{ className: 'tooltip', tooltip: props.tooltip, onMouseEnter: props.mouse, onMouseOut: props.mouse, onClick: props.click, style: { 'borderBottom': '1px solid red' } },
		props.children
	);
};
class Text extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: [],
			content: "",
			top: 0,
			left: 0,
			bottom: -1,
			right: -1,
			click: false,
			moise: false
		};
		this.mouse = this.mouse.bind(this);
		this.click = this.click.bind(this);
	}
	updateState(state, event) {
		if (state.mouse || state.click) {
			state.content = event.target.getAttribute('tooltip');
			let top = event.target.offsetTop,
			    left = event.target.offsetLeft;
			if (top - event.target.closest('html').scrollTop + 20 + 35 >= window.innerHeight) {
				state.top = -1;
				state.bottom = event.target.closest('html').offsetHeight - top;
			} else {
				state.top = top + 20;
				state.bottom = -1;
			}

			if (left + 300 >= window.innerWidth) {
				state.right = 0;
				state.left = -1;
			} else {
				state.left = left > 30 ? left - 30 : 0;
				state.right = -1;
			}
		}
		return state;
	}
	mouse(event) {
		this.setState(state => {
			if (!state.mouse) state.mouse = true;else state.mouse = false;
			return this.updateState(state, event);
		});
	}
	click(event) {
		this.setState(state => {
			if (!state.click) state.click = true;else state.click = false;
			return this.updateState(state, event);
		});
	}
	componentDidMount() {
		fetch(this.props['data-url']).then(response => response.json()).then(text => {
			let mapText = [],
			    newText = text.text.replace(/([^\s\(\)]*)\s?\(([^\(\)]*)\)/g, function (n1, n2, n3) {
				return '<Tooltip tooltip="' + n3 + '">' + n2 + '</Tooltip>';
			}),
			    index = 0;

			mapText = newText.split(new RegExp('<\\/?Tooltip>?')).map(el => {
				if (/^\s(tooltip\=)/.test(el)) {
					let text = el.match(/\>([^\<]*)/)[1],
					    tooltip = el.match(/tooltip\=\"([^\"]*)\"/)[1];
					index++;
					return React.createElement(
						Tooltip,
						{ tooltip: tooltip, mouse: this.mouse, click: this.click, key: index },
						text
					);
				}
				return el;
			});
			this.setState({ text: mapText });
		});
	}
	render() {
		let display = this.state.click || this.state.mouse ? 'block' : 'none';
		const style = {
			'display': this.state.click || this.state.mouse ? 'block' : 'none',
			'position': 'absolute',
			'top': this.state.top > 0 ? this.state.top : 'auto',
			'bottom': this.state.bottom > 0 ? this.state.bottom : 'auto',
			'left': this.state.left > 0 ? this.state.left : 'auto',
			'right': this.state.right > 0 ? this.state.right : 'auto',
			'backgroundColor': '#000',
			'color': '#fff',
			'padding': '10px',
			'maxWidth': '300px',
			'fontSize': '15px'
		};
		return React.createElement(
			'div',
			null,
			React.createElement(
				'p',
				null,
				this.state.text
			),
			React.createElement(
				'div',
				{ style: style },
				this.state.content
			)
		);
	}
}