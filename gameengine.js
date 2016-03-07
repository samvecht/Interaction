window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 100);
            };
})();


function GameEngine(size, numColors, interval, topleft,
		above, topright, left, right, bottomleft, bottom, bottomright, minNeighbors) {
    this.ctx = null;
	this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
	this.deleted = null;
	this.paused = false;
	this.size = size;
	this.cells = [];
	this.interval = interval;
	this.newCells = [];
	this.colors = ["#FF0000", "#FF8000", "#FFFF00", "#80FF00", "#00FF00", "#00FF80", "#00FFFF", "#0080FF", "#0000FF", "#8000FF", "#FF00FF", "#FF0080", "#848484", "#D8D8D8", "#000000"];
	this.numColors = numColors;
	this.generation = 0;
	this.topleft = topleft;
	this.above = above;
	this.topright = topright;
	this.left = left;
	this.right = right;
	this.bottomleft = bottomleft;
	this.bottom = bottom;
	this.bottomright = bottomright;
	this.minNeighbors = minNeighbors;
	console.log(this.topleft + " " + this.above + " " + this.topright + " " + this.left + " " + this.right + " " + this.bottomleft + " " + this.bottom + " " + this.bottomright);
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    //console.log('game initialized');
}

GameEngine.prototype.start = function () {
    //console.log("starting game");
	for(var i = 0; i < this.size * this.size; i++) {
		var color = Math.floor(Math.random() * this.numColors);
		//console.log(color);
		this.cells[i] = color;
		this.newCells[i] = color;
	}
    var that = this;
	var j = 0;
	function animation_loop() {
		if(!that.deleted) {
		that.loop();
		setTimeout(function() { j++; if (j > 0) { animation_loop(); }}, that.interval);
		}
	};
	animation_loop();
}


GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
	var multiplier = 400 / this.size;
	for(var x = 0; x < this.size; x++) {
		for(var y = 0; y < this.size; y++) {
			this.ctx.fillStyle = this.colors[this.cells[x + y * this.size]];
			this.ctx.fillRect(multiplier*x, multiplier*y, multiplier, multiplier);
		}
	}	
	document.getElementById("generation").innerHTML = "Generation " + this.generation;
	this.ctx.restore();
    //console.log("rendered");
}

GameEngine.prototype.update = function () {
    //console.log("update");
	this.generation++;
	for(var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {
			this.newCells[x + y * this.size] = this.cells[x + y * this.size];
			var numNeighbors = 0;
			var oldColor = this.cells[x + this.size * y];
			
			/*//above
			if(y >= 1 && this.above) {	
				
				var above = this.cells[x + this.size * (y - 1)];
				if(above == 0 && oldColor == this.numColors - 1
				|| above == oldColor + 1) {
					console.log("above swapping: " + above + " into " + oldColor);
					//this.newCells[x + this.size * y] = this.cells[x + this.size * (y - 1)];
					numNeighbors++;
				}
			}
			*/
			
			//above
			if(y >= 1 && this.above) {
				//console.log("above");				
				var above = this.cells[x + this.size * (y - 1)];
				if(above == 0 && oldColor == this.numColors - 1
				|| above == oldColor + 1) {
					//console.log("below swapping: " + below + " into " + oldColor);
					//this.newCells[x + this.size * y] = this.cells[x + this.size * (y + 1)];
					numNeighbors++;
				}
			}
			
			//below
			if(y < this.size - 1 && this.bottom) {
				//console.log("below");				
				var below = this.cells[x + this.size * (y + 1)];
				if(below == 0 && oldColor == this.numColors - 1
				|| below == oldColor + 1) {
					//console.log("below swapping: " + below + " into " + oldColor);
					//this.newCells[x + this.size * y] = this.cells[x + this.size * (y + 1)];
					numNeighbors++;
				}
			}
			
			//left
			if(x > 0 && this.left) {				
				var left = this.cells[x - 1 + this.size * y];
				if(left == 0 && oldColor == this.numColors - 1
				|| left == oldColor + 1) {
					//console.log("left swapping: " + left + " into " + oldColor);
					//this.newCells[x + this.size * y] = this.cells[x - 1 + this.size * y];
					numNeighbors++;
				}
			}
			
			//right
			if(x < this.size - 1 && this.right) {				
				var right = this.cells[x + 1 + this.size * y];
				if(right == 0 && oldColor == this.numColors - 1
				|| right == oldColor + 1) {
					//console.log("right swapping: " + right + " into " + oldColor);
					//this.newCells[x + this.size * y] = this.cells[x + 1 + this.size * y];
					numNeighbors++;
				}
			}
			
			//topleft
			if(x > 0 && y >= 1 && this.topleft) {				
				var topleft = this.cells[x - 1 + this.size * (y - 1)];
				if(topleft == 0 && oldColor == this.numColors - 1
				|| topleft == oldColor + 1) {
					//console.log("topleft swapping: " + (x - 1) + ", " + (y - 1)+ " into " + x + ", " + y);
					//this.newCells[x + this.size * y] = this.cells[x - 1 + this.size * (y - 1)];
					numNeighbors++;
				}
			}
			
			//topright
			if(x < this.size - 1 && y >= 1 && this.topright) {				
				var topright = this.cells[x + 1 + this.size * (y - 1)];
				if(topright == 0 && oldColor == this.numColors - 1
				|| topright == oldColor + 1) {
					//console.log("topright swapping: " + (x + 1) + ", " + (y - 1)+ " into " + x + ", " + y);
					//this.newCells[x + this.size * y] = this.cells[x + 1 + this.size * (y - 1)];
					numNeighbors++;
				}
			}
			
			//bottomleft
			if(x > 0 && y < this.size - 1 && this.bottomleft) {				
				var bottomleft = this.cells[x - 1 + this.size * (y + 1)];
				if(bottomleft == 0 && oldColor == this.numColors - 1
				|| bottomleft == oldColor + 1) {
					//console.log("bottomleft swapping: " + (x - 1) + ", " + (y + 1)+ " into " + x + ", " + y);
					//this.newCells[x + this.size * y] = this.cells[x - 1 + this.size * (y + 1)];
					numNeighbors++;
				}
			}
			
			//bottomright
			if(x < this.size - 1 && y < this.size - 1 && this.bottomright) {				
				var bottomright = this.cells[x + 1 + this.size * (y + 1)];
				if(bottomright == 0 && oldColor == this.numColors - 1
				|| bottomright == oldColor + 1) {
					//console.log("bottomright swapping: " + (x + 1) + ", " + (y + 1)+ " into " + x + ", " + y);
					//this.newCells[x + this.size * y] = this.cells[x + 1 + this.size * (y + 1)];
					numNeighbors++;
				}
			}
			if(numNeighbors >= this.minNeighbors) {
				this.newCells[x + this.size * y] = (oldColor + 1) % this.numColors;
			}
		}
	}
	for(var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {
			this.cells[x + y * this.size] = this.newCells[x + y * this.size];
		}
	}
}

GameEngine.prototype.loop = function () {
	if(!this.paused) {
		this.update();
		this.draw();
		this.space = null;
	}
}
