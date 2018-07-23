import React, { Component } from 'react';
import $ from 'jquery';
import 'jplayer';
import PlayNext from '../components/playNext';
import PlayPrev from '../components/playPrev.js';


class MusicPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mp3Url: '',
			currentTime: ''
		};			
	}
	
	playMusic(url,title){
		$("#jplayer").jPlayer('setMedia',{
			title: title,
			mp3:url
		}).jPlayer('play');
	}
	componentDidMount(){
		//let getCurrentTime=this.props.getCurrentTime;
		$("#jplayer").jPlayer({

			supplied: "mp3",
			volume : .4,
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true
		});
		
	}
	componentWillReceiveProps(){
		setTimeout(()=>{
			this.playMusic(this.props.itemUrl,this.props.itemTitle);
		},0);		
	}

	render() {
		
		return (
			<div>
				<div id="jplayer" className="jp-jplayer"></div>
				<div id="jp_container_1" className="jp-audio" role="application" aria-label="media player">
					<div className="jp-type-single">
						<div className="jp-gui jp-interface">
							<div className="jp-progress">
								<div className="jp-seek-bar">
									<div className="jp-play-bar"></div>
								</div>
							</div>
							<div className="jp-time-holder">
								<div className="jp-current-time" role="timer" aria-label="time">&nbsp;</div>
								<div className="jp-duration" role="timer" aria-label="duration">&nbsp;</div>
								<div className="jp-toggles">
									<button className="jp-repeat" role="button" tabIndex="0"></button>
								</div>
							</div>
							<div className="jp-controls">
								<PlayPrev />
								<button className="jp-play" role="button" tabIndex="0"></button>
								<PlayNext />
							</div>
							
							<div className="jp-volume-controls">
								<button className="jp-mute" role="button" tabIndex="0"></button>
								{/*<button className="jp-volume-max" role="button" tabindex="0">max volume</button>*/}
								<div className="jp-volume-bar">
									<div className="jp-volume-bar-value"></div>
								</div>
							</div>
							
						</div>
						<div className="jp-details">
							<div className="jp-title" aria-label="title">&nbsp;</div>
						</div>
					</div>
				</div>
			</div>	
		)
			
	}
}

export default MusicPlayer;
