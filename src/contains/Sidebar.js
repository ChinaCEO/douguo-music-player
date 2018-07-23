import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import MusicList from './MusicList'
import PlayingList from './PlayingList';
import SearchList from './SearchList';
import CollectionList from './CollectionList';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state={
			addedCollectionItems:[],
			addToPlayinglistItems:[]
		}
		this.handleCollect = this.handleCollect.bind(this);
		this.handleClearAddedCollectionItemsState = this.handleClearAddedCollectionItemsState.bind(this);
		this.handleClearAddedPlayingItemsState = this.handleClearAddedPlayingItemsState.bind(this);
		this.handleAddToPlayinglist=this.handleAddToPlayinglist.bind(this);
	}
	handleCollect(collectionItems){
		let currentCollectionState = this.state.addedCollectionItems;
		
		this.setState((prevState)=>{
			return {addedCollectionItems:prevState.addedCollectionItems.concat(collectionItems)}
		});
	}
	
	handleClearAddedCollectionItemsState(){						
		this.setState({addedCollectionItems:[]});
	}
	handleClearAddedPlayingItemsState(){
		this.setState({addToPlayinglistItems:[]});
	}	
	handleAddToPlayinglist(items){
		let currentPlayingItemsState = this.state.addToPlayinglistItems;
		this.setState((prevState)=>{
			return {addToPlayinglistItems:prevState.addToPlayinglistItems.concat(items)}
		});
	}
	
	render() {
		//console.log(this.state);
		const routes = [
		  {
		    path: "/",
		    exact: true,
		    main: () => <PlayingList addToPlayinglistItems={this.state.addToPlayinglistItems} clearAddedPlayingItemsState={this.handleClearAddedPlayingItemsState} addToCollection={this.handleCollect} getItemData={this.props.getItemData}/>
		  },
		  {
		    path: "/search-list",	  
		    main: () => <SearchList searchData={this.props.searchData} itemData={this.props.itemData} getItemData={this.props.getItemData} addToCollection={this.handleCollect} addToPlayinglist={this.handleAddToPlayinglist}/>
		  },
		  {
		    path: "/collection",
		    main: () => <CollectionList addedCollectionItems={this.state.addedCollectionItems} clearAddedCollectionItemsState={this.handleClearAddedCollectionItemsState} getItemData={this.props.getItemData}/>
		  }
		];
		return (
			<BrowserRouter>
				<div className="right-wrap">
					<div id="sidebar">
						<div className="menu-tab">
							<ul className="side-menu">
								<li id="playing-list">
									<Link to="/">播放列表</Link>
								</li>
								<li id="search-list">
									<Link to="/search-list">搜索列表</Link>
								</li>
								<li id="collection">
									<Link to="/collection">我的收藏</Link>
								</li>
							</ul>												
						</div>
					</div>
					<div id="main_body" className="main-body">
						<Switch>							
							{routes.map((route, index) => (
					          <Route
					            key={index}
					            path={route.path}
					            exact={route.exact}
					            component={route.main}
					          />
					        ))}	
						</Switch>						
					</div>
				</div>
			</BrowserRouter>
			
		);
	}
	
}

export default Sidebar;
