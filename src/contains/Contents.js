import React, { Component } from 'react';
import Sidebar from './Sidebar';
//import MusicList from './MusicList';
import LrcBar from './LrcBar';


class Contents extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="contents">
				<div className="contents-wrap">
					<Sidebar 
						searchData={this.props.searchData}
						getItemData={this.props.getItemData}
						itemData={this.props.itemData}
					/>
					<LrcBar 
						musicImg={this.props.musicImg}
						lyrics={this.props.lyrics}
					/>
				</div>
			</div>
		);
	}
}

export default Contents;