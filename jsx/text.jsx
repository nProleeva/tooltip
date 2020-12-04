const React = require('react');
const ReactDOM = require('react-dom');

const Tooltip = (props)=>{
	return <span className="tooltip" tooltip={props.tooltip} onMouseEnter={props.mouse} onMouseOut={props.mouse} onClick={props.click}>{props.children}</span>
}
class Text extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			text: [],
			content: "",
			top: 0,
			left: 0,
			bottom: -1,
			right: -1,
			click: false,
			moise: false
		}
		this.mouse = this.mouse.bind(this);
		this.click = this.click.bind(this);
	}
	updateState(state,event) {
		if (state.mouse || state.click) {
			state.content = event.target.getAttribute('tooltip');
			let top = event.target.offsetTop,
			    left = event.target.offsetLeft;
			if ((top - event.target.closest('html').scrollTop + 20 + 35) >= window.innerHeight) {
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
		this.setState((state) =>{
			if(!state.mouse)
				state.mouse = true;
			else 
				state.mouse = false;
			return this.updateState(state,event);
		})
	}
	click(event) {
		this.setState((state) =>{
			if(!state.click)
				state.click = true;
			else
				state.click = false;
			return this.updateState(state,event);
		})
	}
	componentDidMount() {
		fetch(this.props['data-url'])
		.then((response)=>response.json())
		.then((text)=>{
			let mapText = [],
				newText = text.text.replace(/([^\s\(\)]*)\s?\(([^\(\)]*)\)/g, function(n1,n2,n3) {
					return '<Tooltip tooltip="' + n3+ '">' + n2 + '</Tooltip>';
				}),
				index = 0;

			mapText = newText.split(new RegExp('<\\/?Tooltip>?')).map((el) =>{
				if (/^\s(tooltip\=)/.test(el)){
					let text = el.match(/\>([^\<]*)/)[1],
						tooltip = el.match(/tooltip\=\"([^\"]*)\"/)[1];
					index++;
					return <Tooltip tooltip={tooltip} mouse={this.mouse} click={this.click} key={index}>{text}</Tooltip>;
				}
				return el;
			})
			this.setState({text: mapText});
		})
	}
	render() {
		const style={
			'display': (this.state.click || this.state.mouse)? 'block': 'none',
			'top': this.state.top < 0? 'auto':this.state.top,
			'bottom': this.state.bottom < 0? 'auto':this.state.bottom,
			'left': this.state.left < 0? 'auto':this.state.left,
			'right': this.state.right < 0? 'auto':this.state.right
		}
		return <div>
			<p>{this.state.text}</p>
			<div className="contentTooltip" style={style}>{this.state.content}</div>
		</div>
	}
}

module.exports = Text;