import React, { Component } from 'react';

class MusicItem extends Component {
	constructor(props) {
		super(props);
		
		this.handlePlayItem = this.handlePlayItem.bind(this);
		this.handleChecked = this.handleChecked.bind(this);
		this.checkBoxRef = React.createRef();
		this.handleCollect = this.handleCollect.bind(this);
		this.handleDelete=this.handleDelete.bind(this);
	}
	handlePlayItem() {		
		this.props.getItemData(this.props.FileHash,this.props.AlbumID);
	}	
	handleChecked(e) {

	 	this.props.handleItemChecked(this.props.inputName,e);			
	}
	handleCollect(e){
		this.props.onHandleCollect(this.props.Audioid);
	}
	handleDelete(e) {
		e.preventDefault();
		this.props.onDeleteItem(this.props.Id);
	}
	render() {
		
		return (

			<div id={this.props.Id} className="music-item" key={this.props.Id}>
				<div className="item-checkbox">
					<input 
						type="checkbox" 
						ref={this.checkBoxRef} 
						checked={this.props.isItemChecked} 
						onChange={this.handleChecked}
						name={this.props.inputName}
					/>
				</div>
				<div className="item-count" onClick={this.handlePlayItem}>
					<em>{this.props.Index}</em>
				</div>
				<div className="music-item-body">
					<div className="song-name song-detail">
						<a href="#">{this.props.SongName}</a>
					</div>
					<div className="song-singer song-detail">
						<a href="#">{this.props.Singer}</a>
					</div>
					<div className="song-album song-detail">
						<a href="#">{this.props.AlbumName}</a>
					</div>
				</div>
				<div className="music-item-control">
					<a href="#" className="music-item-collect" title="收藏" onClick={this.handleCollect} style={{display:this.props.collectButtonDisplay}}></a>
					<a href="#" className="music-item-delete" title="删除" onClick={this.handleDelete} style={{display:this.props.deleteButtonDisplay}}></a>
				</div>									
			</div>
		);
	}
}
// const MusicItem = (ownProps,dispatch) => {
// 	<div id={111} className="music-item">
// 		<div className="item-checkbox">
// 			<input type="checkbox"/>
// 		</div>
// 		<div className="item-count" onClick={() => dispatch(actions.setMedia('HappyPlayer',
// 			{
// 				sources: {
// 					mp3:'http://fs.w.kugou.com/201807082307/e36b19f42b8796b…G059/M02/17/1D/ew0DAFdr9KmAf5GnADSkTnjFCm0437.mp3'
// 				}
// 			}
// 		))}>
// 			<em>{111}</em>
// 		</div>
// 		<div className="music-item-body">
// 			<div className="song-name song-detail">
// 				<a href="#">{111}</a>
// 			</div>
// 			<div className="song-singer song-detail">
// 				<a href="#">{111}</a>
// 			</div>
// 			<div className="song-album song-detail">
// 				<a href="#">{111}</a>
// 			</div>
// 		</div>
// 		<div className="music-item-control">
// 			<a href="#" className="music-item-collect" title="收藏"></a>
// 			<a href="#" className="music-item-delete" title="删除"></a>
// 		</div>									
// 	</div>
// }
// class MusicItem extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.handlePlayItem = this.handlePlayItem.bind(this);			
// 	}
// 	handlePlayItem() {		
// 		this.props.getItemData(this.props.FileHash,this.props.AlbumID);

// 	}
// 	render() {

// 		const MusicItem = ({dispatch}) => {
// 			<div id={this.props.Id} className="music-item">
// 				<div className="item-checkbox">
// 					<input type="checkbox"/>
// 				</div>
// 				<div className="item-count" onClick={this.handlePlayItem,()=>dispatch(actions.setMedia('HappyPlayer',
// 					{
// 						sources: {
// 							mp3:'http://fs.w.kugou.com/201807082307/e36b19f42b8796b…G059/M02/17/1D/ew0DAFdr9KmAf5GnADSkTnjFCm0437.mp3'
// 						}
// 					}

// 					))}>
// 					<em>{this.props.Index}</em>
// 				</div>
// 				<div className="music-item-body">
// 					<div className="song-name song-detail">
// 						<a href="#">{this.props.SongName}</a>
// 					</div>
// 					<div className="song-singer song-detail">
// 						<a href="#">{this.props.Singer}</a>
// 					</div>
// 					<div className="song-album song-detail">
// 						<a href="#">{this.props.AlbumName}</a>
// 					</div>
// 				</div>
// 				<div className="music-item-control">
// 					<a href="#" className="music-item-collect" title="收藏"></a>
// 					<a href="#" className="music-item-delete" title="删除"></a>
// 				</div>									
// 			</div>
// 		}					
// 		return connect(this.props)(MusicItem);
// 	}
// }
export default MusicItem;