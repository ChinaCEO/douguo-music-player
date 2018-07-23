import React, { Component } from 'react';
import MusicListHeader from '../components/MusicListHeader';
import MusicItem from '../components/MusicItem';

let addedCollectionItems = [];
class CollectionList extends Component {
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
		this.handleCollectPageScroll = this.handleCollectPageScroll.bind(this);
		this.collectContentRef=React.createRef();
		this.handleItemChecked = this.handleItemChecked.bind(this);	
		this.handleAllChecked = this.handleAllChecked.bind(this);			
	}
	componentWillMount(){
		
		addedCollectionItems=addedCollectionItems.concat(this.props.addedCollectionItems);

		addedCollectionItems = this.handleArrayFilter(addedCollectionItems);
				
		for(let i in addedCollectionItems){
			setTimeout(()=>{
				this.setState({
					[`c_${i}`]:false
				});
			},0);
		}
	}

	handleDeleteItem(id){

		for(let j in addedCollectionItems){
			if(`c_${addedCollectionItems[j].Audioid}`=== id){
	
				addedCollectionItems.splice(j,1);
			}
		}
		this.props.clearAddedCollectionItemsState();
		
	}
	handleDeleteItems(e){
		let deleteItems = [];
		if(this.state.isAllChecked){
			addedCollectionItems=[];
		}else{
			for(let i in addedCollectionItems){
				if(this.state[`c_${i}`]){
					deleteItems.push(addedCollectionItems[i]);
				}			
			}

			for(let j in deleteItems){
				for(let k in addedCollectionItems){
					if(deleteItems[j].Audioid === addedCollectionItems[k].Audioid){
						addedCollectionItems.splice(k,1);
						break;
					}
										
				}
			}	
			
		}
		
		this.props.clearAddedCollectionItemsState();
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
	handleCollectPageScroll(e) {
		
		let contentHeight = this.collectContentRef.current.offsetHeight;
		let parentHeight = this.collectContentRef.current.parentNode.offsetHeight;

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
	handleItemChecked(inputName,e){
	
		this.setState({
			[inputName]:e.target.checked
		},()=>{
			for(var i in addedCollectionItems){
				if(!this.state[`c_${i}`]){					
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
	    
    	for(var i in addedCollectionItems){
			this.setState({
				[`c_${i}`]: e.target.checked
			});
		}   		
	}
	componentDidMount() {
		let contentHeight = this.collectContentRef.current.offsetHeight;
		let parentHeight = this.collectContentRef.current.parentNode.offsetHeight;
	
		if(contentHeight>parentHeight){			
			this.setState({scrollBarSTyle:{height:`${parentHeight/contentHeight*100}%`}});				
		}
			
	}
	render() {
		//console.log(this.state);
		let addedCollectionItemsArray=[];
		
		for(let i in addedCollectionItems){

			addedCollectionItemsArray.push(
				<MusicItem 
					Id={`c_${addedCollectionItems[i].Audioid}`}
					key={`c_${addedCollectionItems[i].Audioid}`}
					Audioid={addedCollectionItems[i].Audioid}
					Index={i-1+2}
					SongName={addedCollectionItems[i].SongName}
					Singer={addedCollectionItems[i].SingerName}
					AlbumName={addedCollectionItems[i].AlbumName}
					FileHash={addedCollectionItems[i].FileHash}
					AlbumID={addedCollectionItems[i].AlbumID}
					FileHash={addedCollectionItems[i].FileHash}
					inputName={`c_${i}`}
					collectButtonDisplay={'none'}
					onDeleteItem={this.handleDeleteItem}
					handleItemChecked={this.handleItemChecked}
					isItemChecked={this.state[`c_${i}`]}
					getItemData={this.props.getItemData}
				/>
			);
		}
		return (
			<div className="collection-list-wrap">
				<MusicListHeader />
				<div className="collection-list-body">
					<div className="scroll-bar">
						<div className="scroll-bar-track">
							<div className="scroll-bar-drag" style={this.state.scrollBarSTyle}></div>
						</div>
					</div>
					<div 
						className="scroll-content" 
						onWheel={this.handleCollectPageScroll} 
						style={this.state.styleTransform} 
						ref={this.collectContentRef}
					>
						<div className="play-list-items-wrap">
							{addedCollectionItemsArray}
						</div>
					</div>
				</div>
				<div className="collection-list-footer">
					<div className="collection-list-footer-wrap">
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
						<div className="add-to-list-btn">
							<button>添加到播放列表</button>
						</div>
					</div>
				</div>
			</div>			
		);
	}
}

export default CollectionList;