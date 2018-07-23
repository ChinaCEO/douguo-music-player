import React, { Component } from 'react';
import $ from 'jquery';
import 'jplayer';

let lrcCurrentLine = 0;
let ScrollY = 0;
let styleTransform = {transform:'translateY(0)'};
let scrollFlag = false;
class MusicLrc extends Component {
	constructor(props) {
		super(props);
		this.state={
			// styleTransform:{transform:'translateY(0)'},
			// ScrollY:0,
			scrollBarSTyle:{height:'0',transform:'translateY(0)'},
			currentTime:0
		}	
		this.splitLrc = this.splitLrc.bind(this);
		this.handleLrcAutoScroll = this.handleLrcAutoScroll.bind(this);
		this.handleLrcTime = this.handleLrcTime.bind(this);
		this.lrcRef = React.createRef();
	}
	splitLrc(lrc){
		let lyricsArr=[];
		let lrcArr = lrc.split('\r\n');		
		
		for(let i in lrcArr){
			lyricsArr.push(<li id={`l_${i}`} key={`l_${i}`}>{lrcArr[i].replace(/\[\d{2}:\d{2}\.\d{2}\]/,'')}</li>);
		}
		
		return lyricsArr;
	}
	handleLrcTime(lrc){
		let lyricsArr=[];
		let lrcArr = lrc.split('\r\n');

		let timeArr = [];
		
		for(let i in lrcArr){
			lyricsArr.push(lrcArr[i].match(/\d{2}:\d{2}\.\d{2}/));			
		}
		
		for(let j in lyricsArr){
			if(lyricsArr[j]){				
				timeArr.push(parseInt(lyricsArr[j][0].match(/\d{2}/)[0])*60+parseFloat(lyricsArr[j][0].match(/\d{2}\.\d{2}/)[0]));
			}						
		}

		this.setState({
			lrcTimeArr: timeArr
		});
		
	}
	handleLrcAutoScroll(){
		let lrcTimeArr = this.state.lrcTimeArr;
		let lrcAllHeight = 0;
		if(lrcTimeArr){
			//console.log(lrcTimeArr.length);
			//console.log(this.lrcRef.current.offsetHeight);
			lrcAllHeight = lrcTimeArr.length * 28;
			if(lrcCurrentLine*28 >= Math.round(this.lrcRef.current.offsetHeight/2)){
				// this.setState((prevState)=>{
				// 	return {
				// 		ScrollY: prevState.ScrollY-28,
				// 		styleTransform: {transform:`translateY(${this.state.ScrollY}px)`}
				// 	}					
				// });
				if(scrollFlag){
					ScrollY -= 28;
				}				
				styleTransform = {transform:`translateY(${ScrollY}px)`};
				console.log(styleTransform);
			}
			
		}		
	}
	handleGetCurrentTime(lrc){
		$("#jplayer").bind($.jPlayer.event.timeupdate,(e)=>{
			let currentTime = e.jPlayer.status.currentTime;
			this.setState({
				currentTime:currentTime
			});			
		});
	}
	handleLrcScroll(lrc){
		//style={this.handleLrcScroll}		
	}
	componentWillReceiveProps(){
		setTimeout(()=>{
			this.handleLrcTime(this.props.lyrics);			
		},0);	
		
	}
	componentDidMount(){		
		this.handleGetCurrentTime(this.props.lyrics);
	}
	render() {
		//this.handleLrcAutoScroll(this.state.currentTime,this.state.lrcTimeArr);
		let i = 0;
		setInterval(()=>{
			if(this.state.lrcTimeArr){
				if(this.state.currentTime >= this.state.lrcTimeArr[i] && this.state.currentTime <= this.state.lrcTimeArr[i+1]){
					$(`#l_${i}`).addClass('lrc-current');
					lrcCurrentLine = i;
				}else{
					$(`#l_${i}`).removeClass('lrc-current');
					i++;
					scrollFlag = true;
				}
			}
		},10);
		this.handleLrcAutoScroll();
		return (
			<div id="music_lrc" className="music-lrc" ref={this.lrcRef}>
				<div className="lrc-view">
					<div className="lrc-scroll-bar">
						<div className="scroll-bar">
							<div className="scroll-bar-track">
								<div className="scroll-bar-drag"></div>
							</div>
						</div>
						<div className="lrc-scroll-content" style={styleTransform}>
							<div className="lrc-wrap">
								<ul>
									{this.splitLrc(this.props.lyrics)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>			
		);
	}
}

export default MusicLrc;