// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Ennemy image
var ennemy1Ready= false;
var ennemy1Image = new Image();
ennemy1Image.onload = function () {
	ennemy1Ready = true;
};
EnnemyImage.src = "images/ennemy.png";

// Ennemy image
var ennemy2Ready= false;
var ennemy2Image = new Image();
ennemy2Image.onload = function () {
	ennemy2Ready = true;
};
Ennemy2Image.src = "images/ennemy.png";

// Boss image
var bossReady= false;
var bossImage = new Image();
bossImage.onload = function () {
	bossReady = true;
};
bossImage.src = "images/boss.png";


// Ally image
var AllyReady= false;
var AllyImage= new Image();
AllyImage.onload = function () {
	monsterReady = true;
};
AllyImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var ennemy1= {
	speed: 256 // movement in pixels per second
};
var ennemy2= {
	speed: 256 // movement in pixels per second
};
var boss= {
	speed: 256 // movement in pixels per second
};
var ally = {
	speed: 256 // movement in pixels per second
};
var bomb = {
	// time before the bomb explose
	var start=funtion(timer){
		if(timer==0){
		explosed();
		}
	};
};
var score=0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) { //action onclick of the keayboard
	keysDown[e.keyCode] = true;
    console.log(keysDown);
}, false);

addEventListener("keyup", function (e) { //action when stop to click on keyboard
	delete keysDown[e.keyCode];
}, false);

var begin = function () {
	// the hero begin on the top left
	hero.x = 32;
	hero.y = 32; 

	// put down the ennemy on the map top right
	ennemy1.x= canvas.width - 32
	ennemy1.y= 32

	// put down the ennemy on the map bottom left
	ennemy2.x= 32
	ennemy2.y= canvas.height - 32

	// put down the boss on the map bottom right
	boss.x= canvas.width - 32
	boss.y= canvas.height - 32

	// put down the ally on the map center horizontal and vertical
	ally.x = canvas.width / 2;
	ally.y = canvas.height / 2;

};
var explosed = function () {
	if(hero.x==bomb.x && hero.y==bom.y || hero.x+32==bomb.x && hero.y==bomb.y ||hero.x-32==bomb.x && hero.y==bomb.y ||hero.x==bomb.x && hero.y+32==bomb.y ||hero.x==bomb.x && hero.y-32==bomb.y){
	begin(); //restart the game and it s the game over
	}
	if(ennemy1.x==bomb.x && ennemy1.y==bom.y ||ennemy1.x+32==bomb.x && ennemy1.y==bomb.y ||ennemy1.x-32==bomb.x && ennemy1.y==bomb.y ||ennemy1.x==bomb.x && ennemy1.y+32==bomb.y ||ennemy1.x==bomb.x && ennemy1.y-32==bomb.y){
	score+=1000
	}
	if(ennemy2.x==bomb.x && ennemy2.y==bom.y ||ennemy2.x+32==bomb.x && ennemy2.y==bomb.y ||ennemy2.x-32==bomb.x && ennemy2.y==bomb.y ||ennemy2.x==bomb.x && ennemy2.y+32==bomb.y ||ennemy2.x==bomb.x && ennemy2.y-32==bomb.y){
	score+=2000
	}
	if(boss.x==bomb.x && boss.y==bom.y ||boss.x+32==bomb.x && boss.y==bomb.y ||boss.x-32==bomb.x && boss.y==bomb.y ||boss.x==bomb.x && boss.y+32==bomb.y ||boss.x==bomb.x && boss.y-32==bomb.y){
	score+=10000
	}
	if(ally.x==bomb.x && ally.y==bom.y ||ally.x+32==bomb.x && ally.y==bomb.y ||ally.x-32==bomb.x && ally.y==bomb.y ||ally.x==bomb.x && ally.y+32==bomb.y ||ally.x==bomb.x && ally.y-32==bomb.y){
	score-=5000
	}
};
var update = function (modifier) {
	if (38 in keysDown) { // Player move up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player move down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player move left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player move right
		hero.x += hero.speed * modifier;
	}
	if (32 in keysDown) { // Player put a bomb
		bomb.x=hero.x;
		bomb.y=hero.y;
		bomb.start(4);// time before the bomb explosed
	}

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (ennemy1Ready) {
		ctx.drawImage(ennemy1Image, ennemy1.x, ennemy1.y);
	}
	if (ennemy2Ready) {
		ctx.drawImage(ennemy2Image, ennemy2.x, ennemy2.y);
	}
	if (bossReady) {
		ctx.drawImage(bossImage, boss.x, boss.y);
	}
	if (allyReady) {
		ctx.drawImage(allyImage, ally.x, ally.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + score, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
    //console.log(delta);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

