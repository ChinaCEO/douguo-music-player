import React, { Component } from 'react';
import $ from 'jquery';
import Background from './contains/Background';
import Header from './contains/Header';
import Contents from './contains/Contents';
import Footer from './contains/Footer';

import './css/init.css';
import './css/style.less';


class App extends Component {
	constructor(props) {
			super(props);
			this.state = {
				searchText: '',
				submitFlag: 0,
				resultData: null,
				itemData:null,
				itemUrl:'',
				itemTitle:'',
				musicImgUrl:'',
				lyrics:'',
				currentTime: ''
			}
			this.handleSearchText = this.handleSearchText.bind(this);
			
			this.getSearchData = this.getSearchData.bind(this);
			
			this.getItemData = this.getItemData.bind(this);
			//this.getCurrentTime = this.getCurrentTime.bind(this);

	}
	handleSearchText(searchText) {
		this.setState({searchText:searchText});		
	}
	
	getSearchData(searchInput) {
		let url = `http://songsearch.kugou.com/song_search_v2?callback=?&keyword=${searchInput}page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0`;
		
		$.getJSON(url, 
			(json) => {				
				this.setState({resultData:json.data.lists});				 
		});		
	}
	
	getItemData(fileHash,albumID) {
		
		let url = `http://www.kugou.com/yy/index.php?r=play/getdata&hash=${fileHash}&album_id=${albumID}&_=1497972864535&callback=?`;
		
		$.getJSON(url, 
			(json) =>{				
				this.setState({
					itemData:json.data,
					itemUrl:json.data.play_url,
					itemTitle:json.data.song_name,
					musicImgUrl:json.data.img,
					lyrics:json.data.lyrics
				});											 
		});

	}

	render() {	
		
		return ( 
			<div className="App">
		      	<Background />
		        <Header 
		        	searchText={this.state.searchText}
		        	onSearchTextChange={this.handleSearchText}
		        	onSearchSubmit={this.getSearchData}		        	
		        />
		        <Contents 
		        	searchData={this.state.resultData}
		        	getItemData={this.getItemData}
		        	itemData={this.state.itemData}
		        	musicImg={this.state.musicImgUrl}
		        	lyrics={this.state.lyrics}
		        />
		        <Footer itemUrl={this.state.itemUrl} itemTitle={this.state.itemTitle}/>
		  	</div>  	     
		);
	}
}

export default App;
