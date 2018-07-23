import React, { Component } from 'react';
import MusicPlayer from '../components/MusicPlayer'

class Footer extends Component {
	constructor(props) {
		super(props);
		//this.handleUrl = this.handleUrl.bind(this);			
	}
	// handleUrl(){
		
	// 	return this.props.itemUrl;
	// }
	render() {
	    return (	      	
			<footer id="footer">
				<MusicPlayer itemUrl={this.props.itemUrl} itemTitle={this.props.itemTitle} getCurrentTime={this.props.getCurrentTime}/>
			</footer>     		      
	    );
	}
}

export default Footer;