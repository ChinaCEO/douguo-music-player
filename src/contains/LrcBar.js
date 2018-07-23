import React, { Component } from 'react';
import MusicLrc from '../components/MusicLrc';

class LrcBar extends Component {

	render() {
		return (
			<div id="lrc_bar" className="lrc-bar">
				<div className="music-img-wrap">
					<div className="music-img">
						<a href="javascript:;">
							<img src={this.props.musicImg}/>
						</a>
					</div>
					<MusicLrc lyrics={this.props.lyrics}/>
				</div>
			</div>
		);
	}
}

export default LrcBar;