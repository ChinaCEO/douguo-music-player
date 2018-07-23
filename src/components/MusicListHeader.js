import React, { Component } from 'react';

class MusicListHeader extends Component {
	render() {
		return (
			<div id="music_list_header" className="music-list-header">
				<ul className="music-list-title">
					<li>歌曲<span>(30)</span></li>
					<li>演唱者</li>
					<li>专辑</li>
				</ul>
			</div>
		);
	}
}

export default MusicListHeader;