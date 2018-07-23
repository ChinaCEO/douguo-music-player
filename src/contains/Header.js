import React, { Component } from 'react';
import Search from '../components/Search';

class Header extends Component {
	render() {
		return (
			<header id="header">
				<div className="logo">
					<h1></h1>
				</div>
				<Search 
				searchText={this.props.searchText}
				onSearchTextChange={this.props.onSearchTextChange}
				onSearchSubmit={this.props.onSearchSubmit}
				/>
			</header>
		);
	}
}

export default Header;