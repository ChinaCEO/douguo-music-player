import React, { Component } from 'react';


class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue:''
		};
		this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleSearchTextChange(e) {
		//e.preventDefault;
		this.props.onSearchTextChange(e.target.value);
		this.setState({inputValue:e.target.value});

	}
	handleSubmit(e) {
		//e.preventDefault;		
		this.props.onSearchSubmit(this.state.inputValue);
	}
	render() {
		return (								
			<div className="search-wrap">				
				<form action="" method="get" id="search"target="the_iframe" onSubmit={this.handleSubmit}>											
					<div className="search-input">
						<input className="search-bar" 
							type="text" 
							placeholder="看心情搜音乐" 
							value={this.props.searchText}
							onChange={this.handleSearchTextChange}
						/>												
					</div>
					<input type="submit" className="search-submit" onSubmit={this.handleSubmit}/>			
				</form>	
				<iframe id="is_iframe" name="the_iframe" style={{display:'none'}}></iframe>			
			</div>
		);
	}
}

export default Search;