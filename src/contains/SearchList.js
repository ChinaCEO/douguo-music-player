import React, { Component } from 'react';

import MusicListHeader from '../components/MusicListHeader';
import MusicItem from '../components/MusicItem';


class SearchList extends Component {
	constructor(props) {
			super(props);

			this.state = {styleTransform:{transform:'translateY(0)'},
							ScrollY:0,
							scrollBarSTyle:{height:'0',transform:'translateY(0)'},
							scrollBarScrollY:0,
							isAllChecked:false
						};
			this.searchContentRef = React.createRef();	
			this.handleSearchPageScroll = this.handleSearchPageScroll.bind(this);
			this.handleAllChecked = this.handleAllChecked.bind(this);
			this.handleItemChecked = this.handleItemChecked.bind(this);	
			this.onHandleCollect = this.onHandleCollect.bind(this);	
			this.onHandleItemCollect =this.onHandleItemCollect.bind(this);
			this.onHandleAddToPlayinglist = this.onHandleAddToPlayinglist.bind(this);	
	}
	componentWillMount(){
		for(var i in this.props.searchData){
			this.setState({
				[`m_${i}`]:false
			});
		}
				
	}
	componentWillReceiveProps(){
		for(var i in this.props.searchData){
			if(this.state[`m_${i}`]){
				this.setState({
			      isAllChecked:false
			    });
			}
		}
	}
	handleSearchPageScroll(e) {
		
		let contentHeight = this.searchContentRef.current.offsetHeight;
		let parentHeight = this.searchContentRef.current.parentNode.offsetHeight;

				// console.log(this.state.scrollBarSTyle.height);
		if(e.deltaY > 0) {
			if(Math.abs(this.state.ScrollY) < contentHeight - parentHeight-172){
				this.setState({ScrollY:this.state.ScrollY-=172});
				this.setState({styleTransform : {transform:`translateY(${this.state.ScrollY}px)`}});
				this.setState({scrollBarScrollY:this.state.scrollBarScrollY+=parentHeight/contentHeight*172});	
				this.setState({scrollBarSTyle:{height:`${parentHeight/contentHeight*100}%`,transform:`translateY(${this.state.scrollBarScrollY}px)`}});	
				// console.log((contentHeight - parentHeight)/contentHeight);	
			}else {
				this.setState({styleTransform : {transform:`translateY(-${contentHeight - parentHeight}px)`}});
				this.setState({scrollBarSTyle:{height:`${parentHeight/contentHeight*100}%`,transform:`translateY(${(contentHeight - parentHeight)*(parentHeight/contentHeight)}px)`}});								
			}
		}else if(e.deltaY < 0 && this.state.ScrollY<0){
			this.setState({ScrollY:this.state.ScrollY+=172});
			this.setState({styleTransform : {transform:`translateY(${this.state.ScrollY}px)`}});				
			this.setState({scrollBarScrollY:this.state.scrollBarScrollY-=parentHeight/contentHeight*172});	
			this.setState({scrollBarSTyle:{height:`${parentHeight/contentHeight*100}%`,transform:`translateY(${this.state.scrollBarScrollY}px)`}});
		}				
	}
	handleAllChecked(e) {
		this.setState({
	      isAllChecked:e.target.checked
	    });
	    
    	for(var i in this.props.searchData){
			this.setState({
				[`m_${i}`]: e.target.checked
			});
		}   		
	}
	handleItemChecked(inputName,e){
	
		this.setState({
			[inputName]:e.target.checked
		},()=>{
			for(var i in this.props.searchData){
				if(!this.state[`m_${i}`]){					
					this.setState({
				      isAllChecked:false
				    });
				    return;
				}else{
					this.setState({
				      isAllChecked:true
				    });
				}
			}
		});
	}
	onHandleCollect() {
		let collectionItems = [];
		const searchList = this.props.searchData;
		for(let i in searchList){
			if(this.state[`m_${i}`]){
				collectionItems.push({
						SongName:searchList[i].SongName,
						SingerName:searchList[i].SingerName,
						AlbumName:searchList[i].AlbumName,
						FileHash:searchList[i].FileHash,
						AlbumID:searchList[i].AlbumID,
						Audioid:searchList[i].Audioid
					}										
				);
			}
		}
		this.props.addToCollection(collectionItems);		
	}
	onHandleItemCollect(id) {
		let collectionItems = [];
		const searchList = this.props.searchData;
		for(let i in searchList){
			if(searchList[i].Audioid===id){
				collectionItems.push({
						SongName:searchList[i].SongName,
						SingerName:searchList[i].SingerName,
						AlbumName:searchList[i].AlbumName,
						FileHash:searchList[i].FileHash,
						AlbumID:searchList[i].AlbumID,
						Audioid:searchList[i].Audioid
					}										
				);
			}
		}
		this.props.addToCollection(collectionItems);
	}
	onHandleAddToPlayinglist(e){
		let addToPlayinglistItems = [];
		const searchList = this.props.searchData;
		for(let i in searchList){
			if(this.state[`m_${i}`]){
				addToPlayinglistItems.push({
						SongName:searchList[i].SongName,
						SingerName:searchList[i].SingerName,
						AlbumName:searchList[i].AlbumName,
						FileHash:searchList[i].FileHash,
						AlbumID:searchList[i].AlbumID,
						Audioid:searchList[i].Audioid
					}										
				);
			}
		}
		this.props.addToPlayinglist(addToPlayinglistItems);
	}
	componentDidMount() {
		let contentHeight = this.searchContentRef.current.offsetHeight;
		let parentHeight = this.searchContentRef.current.parentNode.offsetHeight;
		
		if(contentHeight>parentHeight){
			// this.setState({scrollBarSTyle:{height:`${parentHeight/contentHeight*100}%`,transform:`translateY(${this.state.scrollBarScrollY}px)`}});
			this.setState({scrollBarSTyle:{height:`${parentHeight/contentHeight*100}%`}});
			// this.setState({scrollBarSTyle.height`${parentHeight/contentHeight*100}%`});		
		}	
	}
	render() {
		
		let MusicItems = [];	
		const searchList = this.props.searchData;
		const isItemChecked = [];		
		
		if(typeof(searchList) === 'object'){
			for(var i in searchList) {
				MusicItems.push(
					<MusicItem 
						Id={`s_${i}`}
						key={`s_${i}`}
						Index={i-1+2}
						SongName={searchList[i].SongName}
						Singer={searchList[i].SingerName}
						AlbumName={searchList[i].AlbumName}
						FileHash={searchList[i].FileHash}
						AlbumID={searchList[i].AlbumID}
						Audioid={searchList[i].Audioid}
						getItemData={this.props.getItemData}
						itemData={this.props.itemData}
						inputName={`m_${i}`}
						isItemChecked={this.state[`m_${i}`]}
						handleItemChecked={this.handleItemChecked}
						onHandleCollect={this.onHandleItemCollect}
						onDeleteItem={this.onDeleteItem}
						deleteButtonDisplay={'none'}							
					/>
				);
			}
		}
		//const store = createStore(combineReducers({ jPlayers }));
		return (
			//<Provider store={store}>
			<div className="search-list-wrap">
				<MusicListHeader />
				<div className="search-list-body">
					<div className="scroll-bar">
						<div className="scroll-bar-track">
							<div className="scroll-bar-drag" style={this.state.scrollBarSTyle}></div>
						</div>
					</div>
					<div id="search_content" className="scroll-content" ref={this.searchContentRef} onWheel={this.handleSearchPageScroll} style={this.state.styleTransform}>
						<div className="play-list-items-wrap">
						{ MusicItems }
												
						</div>
					</div>
				</div>
				<div className="search-list-footer">
					<div className="search-list-footer-wrap">
						<div className="all-checkbox">
							<input 
								type="checkbox" 
								onChange={this.handleAllChecked} 
								checked={this.state.isAllChecked} 
								name="checkedAll"
							/>
						</div>
						<div className="collction-btn">
							<button onClick={this.onHandleCollect}>收藏</button>
						</div>
						<div className="add-to-list-btn">
							<button onClick={this.onHandleAddToPlayinglist}>添加到播放列表</button>
						</div>
					</div>
				</div>
			</div>
			//</Provider>	
		);
	}
}

export default SearchList;