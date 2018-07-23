import React, { Component } from 'react';
import MusicListHeader from '../components/MusicListHeader';
import MusicItem from '../components/MusicItem';

let addToPlayinglistItems = [];
class PlayingList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			styleTransform:{transform:'translateY(0)'},
			ScrollY:0,
			scrollBarSTyle:{height:'0',transform:'translateY(0)'},
			scrollBarScrollY:0,
			isAllChecked:false
		}

		this.handleDeleteItem=this.handleDeleteItem.bind(this);
		this.handleDeleteItems=this.handleDeleteItems.bind(this);	
		this.handleArrayFilter=this.handleArrayFilter.bind(this);
		this.handlePlayingPageScroll = this.handlePlayingPageScroll.bind(this);
		this.playingContentRef=React.createRef();
		this.handleItemChecked = this.handleItemChecked.bind(this);	
		this.handleAllChecked = this.handleAllChecked.bind(this);
		this.onHandleCollect = this.onHandleCollect.bind(this);	
		this.onHandleItemCollect =this.onHandleItemCollect.bind(this);		
	}
	componentWillMount(){
		
		addToPlayinglistItems=addToPlayinglistItems.concat(this.props.addToPlayinglistItems);

		addToPlayinglistItems = this.handleArrayFilter(addToPlayinglistItems);
				
		for(let i in addToPlayinglistItems){
			setTimeout(()=>{
				this.setState({
					[`p_${i}`]:false
				});
			},0);
		}
	}
	handleArrayFilter(arr){
		let result = [], hash = {};
		for (var i = 0, elem; (elem = arr[i]) != null; i++){
			if (!hash[elem.Audioid]) {
		      result.push(elem);
		      hash[elem.Audioid] = true;
		    }else{
		    	//alert(`${elem.SongName}已经被收藏了`);
		    }
		}
		return result;
	}
	handleDeleteItem(id){
		for(let j in addToPlayinglistItems){
			if(`p_${addToPlayinglistItems[j].Audioid}`=== id){
	
				addToPlayinglistItems.splice(j,1);
			}
		}
		this.props.clearAddedPlayingItemsState();
	}
	handleDeleteItems(e){
		let deleteItems = [];
		if(this.state.isAllChecked){
			addToPlayinglistItems=[];
		}else{
			for(let i in addToPlayinglistItems){
				if(this.state[`p_${i}`]){
					deleteItems.push(addToPlayinglistItems[i]);
				}			
			}

			for(let j in deleteItems){
				for(let k in addToPlayinglistItems){
					if(deleteItems[j].Audioid === addToPlayinglistItems[k].Audioid){
						addToPlayinglistItems.splice(k,1);
						break;
					}
										
				}
			}	
			
		}
		
		this.props.clearAddedPlayingItemsState();
	}
	handleItemChecked(inputName,e){
	
		this.setState({
			[inputName]:e.target.checked
		},()=>{
			for(var i in addToPlayinglistItems){
				if(!this.state[`p_${i}`]){					
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
	handleAllChecked(e) {
		this.setState({
	      isAllChecked:e.target.checked
	    });
	    
    	for(var i in addToPlayinglistItems){
			this.setState({
				[`p_${i}`]: e.target.checked
			});
		}   		
	}
	onHandleCollect() {
		let collectionItems = [];
		for(let i in addToPlayinglistItems){
			if(this.state[`p_${i}`]){
				collectionItems.push({
					SongName:addToPlayinglistItems[i].SongName,
					SingerName:addToPlayinglistItems[i].SingerName,
					AlbumName:addToPlayinglistItems[i].AlbumName,
					FileHash:addToPlayinglistItems[i].FileHash,
					AlbumID:addToPlayinglistItems[i].AlbumID,
					Audioid:addToPlayinglistItems[i].Audioid
					}										
				);
			}
		}
		this.props.addToCollection(collectionItems);		
	}
	onHandleItemCollect(id) {
		let collectionItems = [];
		for(let i in addToPlayinglistItems){
			if(addToPlayinglistItems[i].Audioid===id){
				collectionItems.push({
						SongName:addToPlayinglistItems[i].SongName,
						SingerName:addToPlayinglistItems[i].SingerName,
						AlbumName:addToPlayinglistItems[i].AlbumName,
						FileHash:addToPlayinglistItems[i].FileHash,
						AlbumID:addToPlayinglistItems[i].AlbumID,
						Audioid:addToPlayinglistItems[i].Audioid
					}										
				);
			}
		}
		this.props.addToCollection(collectionItems);
	}
	handlePlayingPageScroll(e){
		let contentHeight = this.playingContentRef.current.offsetHeight;
		let parentHeight = this.playingContentRef.current.parentNode.offsetHeight;

		if(contentHeight>parentHeight){
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
	}
	render() {
		let addToPlayinglistItemsArray=[];
		
		for(let i in addToPlayinglistItems){

			addToPlayinglistItemsArray.push(
				<MusicItem 
					Id={`p_${addToPlayinglistItems[i].Audioid}`}
					key={`p_${addToPlayinglistItems[i].Audioid}`}
					Audioid={addToPlayinglistItems[i].Audioid}
					Index={i-1+2}
					SongName={addToPlayinglistItems[i].SongName}
					Singer={addToPlayinglistItems[i].SingerName}
					AlbumName={addToPlayinglistItems[i].AlbumName}
					FileHash={addToPlayinglistItems[i].FileHash}
					AlbumID={addToPlayinglistItems[i].AlbumID}
					FileHash={addToPlayinglistItems[i].FileHash}
					inputName={`p_${i}`}
					onDeleteItem={this.handleDeleteItem}
					handleItemChecked={this.handleItemChecked}
					onHandleCollect={this.onHandleItemCollect}
					isItemChecked={this.state[`p_${i}`]}
					getItemData={this.props.getItemData}
				/>
			);
		}
		return (
			<div className="playing-list-wrap">
				<MusicListHeader />
				<div className="playing-list-body">
					<div className="scroll-bar">
						<div className="scroll-bar-track">
							<div className="scroll-bar-drag" style={this.state.scrollBarSTyle}></div>
						</div>
					</div>
					<div 
						className="scroll-content" 
						onWheel={this.handlePlayingPageScroll} 
						style={this.state.styleTransform} 
						ref={this.playingContentRef}
					>
						<div className="play-list-items-wrap">
							{addToPlayinglistItemsArray}
						</div>
					</div>
				</div>
				<div className="playing-list-footer">
					<div className="playing-list-footer-wrap">
						<div className="all-checkbox">
							<input 
								type="checkbox" 
								onChange={this.handleAllChecked} 
								checked={this.state.isAllChecked}
							/>
						</div>
						<div className="delete-btn">
							<button onClick={this.handleDeleteItems}>删除</button>
						</div>
						<div className="collction-btn">
							<button onClick={this.onHandleCollect}>收藏</button>
						</div>
					</div>
				</div>
			</div>			
		);
	}
}

export default PlayingList;