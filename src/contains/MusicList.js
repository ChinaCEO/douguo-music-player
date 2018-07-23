import React, { Component } from 'react';
import { BrowserRouter ,Router, Route} from "react-router-dom";
import PlayingList from './PlayingList';
import SearchList from './SearchList';
import CollectionList from './CollectionList';


class MusicList extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}
	render() {
		const routes = [
		  {
		    path: "/playing-list",
		    exact: true,
		    main: () => <PlayingList />
		  },
		  {
		    path: "/search-list",	  
		    main: () => <SearchList />
		  },
		  {
		    path: "/collection",
		    main: () => <CollectionList />
		  }
		];
		
		return (
			<BrowserRouter>
				<div id="main_body" className="main-body">
					{routes.map((route, index) => (
			          <Route
			            key={index}
			            path={route.path}
			            exact={route.exact}
			            component={route.main}
			          />
			        ))}			
				</div>
			</BrowserRouter>
			
		);
	}
}

export default MusicList;