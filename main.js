var gameEngine = new GameEngine();

function start() {
	gameEngine.deleted = true;
	var size = document.getElementById("size").value;
	var numColors = document.getElementById("colors").value;
	var interval = document.getElementById("interval").value;
	var topleft = document.getElementById("topleft").checked;
	var above = document.getElementById("above").checked;
	var topright = document.getElementById("topright").checked;
	var left = document.getElementById("left").checked;
	var right = document.getElementById("right").checked;
	var bottomleft = document.getElementById("bottomleft").checked;
	var bottom = document.getElementById("bottom").checked;
	var bottomright = document.getElementById("bottomright").checked;
	var minNeighbors = document.getElementById("minNeighbors").value;
	gameEngine = new GameEngine(size, numColors, interval, topleft,
		above, topright, left, right, bottomleft, bottom, bottomright, minNeighbors);
	console.log(size + "" + numColors + "" + interval + "" + topleft + "" + 
	above + "" + topright + "" + left + "" + right + "" + bottomleft + "" + bottom + "" + bottomright + "" + minNeighbors);
	var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
	canvas.focus();
    gameEngine.init(ctx);
    gameEngine.start();
}
function pause() {
	gameEngine.paused = !gameEngine.paused;
	console.log("pause status: " + gameEngine.paused);
}

function preset1() {
	document.getElementById("size").value = 400;
	document.getElementById("colors").value = 15;
	document.getElementById("interval").value = 100;
	document.getElementById("topleft").checked = false;
	document.getElementById("above").checked = true;
	document.getElementById("topright").checked = false;
	document.getElementById("left").checked = true;
	document.getElementById("right").checked = true;
	document.getElementById("bottomleft").checked = false;
	document.getElementById("bottom").checked = true;
	document.getElementById("bottomright").checked = false;
	document.getElementById("minNeighbors").value = 1;
}

function preset2() {
	document.getElementById("size").value = 200;
	document.getElementById("colors").value = 15;
	document.getElementById("interval").value = 100;
	document.getElementById("topleft").checked = true;
	document.getElementById("above").checked = false;
	document.getElementById("topright").checked = true;
	document.getElementById("left").checked = false;
	document.getElementById("right").checked = false;
	document.getElementById("bottomleft").checked = true;
	document.getElementById("bottom").checked = false;
	document.getElementById("bottomright").checked = true;
	document.getElementById("minNeighbors").value = 1;
}