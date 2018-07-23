import React, { Component } from 'react';

class Background extends Component {
	constructor(props) {
		super(props);
		this.initCanvas1 = this.initCanvas1.bind(this);
		this.initCanvas2 = this.initCanvas2.bind(this);
		this.getWindowSize = this.getWindowSize.bind(this);
		this.rColor = this.rColor.bind(this);
	}
	getWindowSize() {
		//let WWidth , WHeight = 0;
		return ({WWidth:window.innerWidth , WHeight:window.innerHeight});
	}
	rColor() {
		//let rColor = Math.floor(Math.random()*255);
		let r = Math.floor(Math.random()*255);
		let g = Math.floor(Math.random()*255);
		let b = Math.floor(Math.random()*255);
		let a = Math.floor(Math.random()*10)/10;
		a = a < 0.5 ? 0.5 : a;

		
		let rgba = `rgba(${r},${g},${b},${a})`;

		return rgba;

	}
	rX() {

	}
	initCanvas1() {
		
		let WW = this.getWindowSize().WWidth;
		let WH = this.getWindowSize().WHeight;
		let canvas = document.getElementById('backgroud-c1');
		let ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = "#333234";
		ctx.fillRect(0,0,WW,WH);
	}
	initCanvas2() {

		let WW = this.getWindowSize().WWidth;
		let WH = this.getWindowSize().WHeight;

		let canvas = document.getElementById('backgroud-c2');
		let ctx = canvas.getContext('2d');
		

		let xT1 = 150;
		let xT2 = WW*0.4;
		let xT3 = WW*0.9;
		let yT1 = 150;
		let yT2 = WH*0.8;
		let yT3 = WH*0.2;

		let fillColor = this.rColor();
		let c = 0;

		var timer1 = null; 
		// var Xr = Math.floor(Math.random()*60);
		// Xr = Xr < 20 ? 20 : Xr;
		var Xr = 35;
		timer1 = setInterval(()=>{	
			
			if(xT1 <= 180 && xT1 >=120 && c===0) {
				xT1 += 1;
				yT1 += 1;
				if(xT1>=180) {
					c=1;
				}						
			}
			if(xT1 <= 180 && xT1 >= 120 && c===1) {
				xT1 -= 1;
				yT1 -= 1;
				if(xT1<=120){
					c=0;
				}
			}									
			
			ctx.clearRect(0,0,WW,WH);
			ctx.beginPath();
			ctx.arc(xT1, yT1, 200, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fillStyle = fillColor;
			ctx.fill();	
					
		},Xr);
			
		var timer2 = null;	
		
		
		let xT2Max = xT2+30;
		let xT2Min = xT2-30;

		timer2 = setInterval(()=>{

			if(xT2 <= xT2Max && xT2 >=xT2Min && c===0) {
				xT2 += 1;
				
				if(xT2>=xT2Max) {
					c=1;
				}						
			}
			if(xT2 <= xT2Max && xT2 >= xT2Min && c===1) {
				xT2 -= 1;
				
				if(xT2<=xT2Min){
					c=0;
				}
			}	
			
			ctx.beginPath();
			ctx.arc(xT2, yT2, 200, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fillStyle = fillColor;
			ctx.fill();
		},Xr);

		let xT3Max = xT3+30;
		let xT3Min = xT3-30;
		let timer3 = setInterval(()=>{
			if(xT3 <= xT3Max && xT3 >=xT3Min && c===0) {
				xT3 += 1;
				
				if(xT3>=xT3Max) {
					c=1;
				}						
			}
			if(xT3 <= xT3Max && xT3 >= xT3Min && c===1) {
				xT3 -= 1;
				
				if(xT3<=xT2Min){
					c=0;
				}
			}	

			ctx.beginPath();
			ctx.arc(xT3	, yT3, 200, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fillStyle = fillColor;
			ctx.fill();
		},Xr);
	}
	componentDidMount() {
		this.initCanvas1();
		this.initCanvas2();
	}
	render() {
		let width = this.getWindowSize().WWidth;
		let	height = this.getWindowSize().WHeight;
		//console.log(window.innerHeight);
		return (
			<div id="backgroud">
				<canvas id="backgroud-c1" width={width} height={height}></canvas>
				<canvas id="backgroud-c2" width={width} height={height}></canvas>
			</div>
		);
	}
}

export default Background;