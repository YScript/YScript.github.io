var ctx = $("#clock-canvas")[0].getContext('2d');

var width = ctx.canvas.width-20;
var height = ctx.canvas.height-20;
var rem = width/200;
var r = width/2

function drawBackground() {
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth = 10*rem;
	// ctx.arc(0, 0, r- ctx.lineWidth/2, 0, 2*Math.PI, false);
	// ctx.stroke();

	var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 12*rem +'px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumber.forEach(function(number,i) {
		
		var rad = 2* Math.PI /12 * i;
		var x = Math.cos(rad)*(r-30*rem);
		var y = Math.sin(rad)*(r-30*rem);
		ctx.fillText(number,x,y);
	});
	
	for (var i = 0; i < 60; i++) {
		var rad = 2 * Math.PI /60 *i;
		var x = Math.cos(rad)*(r-18*rem);
		var y = Math.sin(rad)*(r-18*rem);
		ctx.beginPath();
		if (i%5 ===0) {
			ctx.fillStyle = '#000';
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);	
		}else{
			ctx.fillStyle = '#bbb';
			ctx.arc(x,y,rem,0,2*Math.PI,false);
		}
		ctx.fill();
	}
	ctx.restore();
}
function drawBackgroundOfHeart() {
	ctx.save();
	ctx.translate(0,0);
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 2*rem;
	var radiusOfHeart = 5*rem;
	var Radian;
	var intervalId;
	var num = 360;
	var timeSpacing = 10;
	var	startRadian = Math.PI;
	Radian = startRadian;
	var RadianDecement = 2*Math.PI/num;
	ctx.moveTo(getXCoor(Radian),getYCoor(Radian));

	var i = 0;
	for (var i = 0; i <= num; i++) {
		intervalId =  setInterval(printHeart,timeSpacing);
		// ctx.restore();
		if (intervalId >=num) {
			clearInterval(intervalId);
		}
	}
	ctx.closePath();
	// ctx.stroke();

	function printHeart() {
		ctx.strokeStyle = "red";
		ctx.lineWidth = 2*rem;
		Radian += RadianDecement;
		ctx.lineTo(getXCoor(Radian),getYCoor(Radian));

		ctx.stroke();

	}
	function getXCoor(t) {
		return 200 + radiusOfHeart * (16 * Math.pow(Math.sin(t), 3));  
	}
	function getYCoor(t) {
		return 200 -radiusOfHeart*(13*Math.cos(t) -5*Math.cos(2*t) -2*Math.cos(3*t) -Math.cos(4*t)); 
	}

	ctx.translate(r,r);
	var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 12*rem +'px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumber.forEach(function(number,i) {
		
		var rad = 2* Math.PI /12 * i;
		var x = Math.cos(rad)*(r-30*rem);
		var y = Math.sin(rad)*(r-30*rem);
		ctx.fillText(number,x,y);
	});
	
	for (var i = 0; i < 60; i++) {
		var rad = 2 * Math.PI /60 *i;
		var x = Math.cos(rad)*(r-18*rem);
		var y = Math.sin(rad)*(r-18*rem);
		ctx.beginPath();
		if (i%5 ===0) {
			ctx.fillStyle = '#000';
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);	
		}else{
			ctx.fillStyle = '#ccc';
			ctx.arc(x,y,rem,0,2*Math.PI,false);
		}
		ctx.fill();
	}

	ctx.restore();
}
function drawHour(hour,minute) {
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.strokeStyle = "black"
	var rad = 2*Math.PI/12 * hour;
	var mrad = 2 *Math.PI /12/60 * minute;
	ctx.rotate(rad + mrad);
	ctx.lineWidth = 6*rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0,10*rem);
	ctx.lineTo(0, -r /2);
	ctx.stroke();
	ctx.restore();
}
function drawMinutes(minute,second) {
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.strokeStyle = "black" 
	var rad = 2*Math.PI/60 * minute;
	var srad = 2*Math.PI/3600 *second;
	ctx.rotate(rad + srad);
	ctx.lineWidth = 3*rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0,10*rem);
	ctx.lineTo(0, -r + 30*rem);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function drawSecond(second) {
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	var rad = 2*Math.PI/60 * second;
	ctx.fillStyle = '#c14534';
	ctx.rotate(rad);
	ctx.moveTo(-2*rem,20*rem);
	ctx.lineTo(2*rem,20*rem);
	ctx.lineTo(1*rem, -r + 18*rem);
	ctx.lineTo(-1*rem, -r + 18*rem);
	ctx.fill();	
	ctx.closePath();
	ctx.restore();
}

function drawDot() {
	ctx.save();
	ctx.translate(r,r)
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0,0,2*rem,0,2*Math.PI,false);
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

function draw() {
	ctx.clearRect(0,0,width,height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	// drawBackgroundOfHeart();
	// drawBackground();
	ctx.beginPath();
	drawHour(hour,minute);
	drawMinutes(minute,second);
	drawSecond(second);
	drawDot();
	ctx.restore();
}
draw();
setInterval(draw,1000)