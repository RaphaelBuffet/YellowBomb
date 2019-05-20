// context
var ctx = null;
// hero's image
const heroImage = new Image();
heroImage.src = "ressources/images/gameImages/Punk_jaune.png";
// unbreakable block image
const buildingImage = new Image();
buildingImage.src = "ressources/images/gameImages/building.png";
// breakable block image
const barrierImage = new Image();
barrierImage.src = "ressources/images/gameImages/box.png";

const EnnemyImage = new Image();
EnnemyImage.src = "ressources/images/gameImages/CRS.png";

const AllyImage = new Image();
AllyImage.src = "ressources/images/gameImages/ally.png";

var playerName;
//var playerNameSelection = prompt("Please, choose a player name", "",);

const bombImage = [new Image(), new Image(), new Image() ];
const explosionImage = [new Image(), new Image(), new Image()];
bombImage[0].src = "ressources/images/gameImages/bomb0.png";
bombImage[1].src = "ressources/images/gameImages/bomb1.png";
bombImage[2].src = "ressources/images/gameImages/bomb2.png";
//bombImage[3].src = "ressources/images/gameImages/bomb3.png"; il était trop noir
explosionImage[0].src = "ressources/images/gameImages/explosion0.png";
explosionImage[1].src = "ressources/images/gameImages/explosion1.png";
explosionImage[2].src = "ressources/images/gameImages/explosion2.png";

const SPRITE = {
	delimitation:0,
	emptyGround:1,
	breakableWall:2,
	unbreakableWall:3,
	bomb0:4,
	bomb1:5,
	bomb2:6,
	explosion0:8,
	explosion1:9,
	explosion2:10
};
/*
Maps:
0. Contour de la map
1. Chemin parcourable
2. Murs cassables
3. Murs incassables
 */
// Structure Map 1
const gameMap1 = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,
	0, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1,0,
	0, 1, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 1, 1,0,
	0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,0,
	0, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 1,0,
	0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,0,
	0, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 1,0,
	0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,0,
	0, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 2,0,
	0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,0,
	0, 1, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 1, 2,0,
	0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,
];

const gameMap2 = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0,
	0, 1, 3, 2, 3, 2, 2, 3, 2, 2, 3, 3, 2, 3, 2, 3, 1, 1, 1, 0,
	0, 1, 2, 1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 1, 1, 0,
	0, 2, 3, 3, 2, 3, 2, 3, 3, 2, 2, 3, 2, 3, 3, 2, 3, 2, 1, 0,
	0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0,
	0, 2, 3, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2, 1, 0,
	0, 2, 2, 3, 2, 3, 2, 2, 2, 2, 3, 2, 2, 3, 2, 3, 2, 2, 1, 0,
	0, 2, 2, 2, 2, 3, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3, 3, 2, 1, 0,
	0, 1, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 3, 1, 1, 0,
	0, 1, 2, 2, 3, 3, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 1, 1, 0,
	0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 1, 1, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const gameMap3 = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0,
	0, 1, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 2, 3, 3, 3, 1, 0,
	0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0,
	0, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 2, 3, 3, 1, 0,
	0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0,
	0, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 2, 3, 1, 0,
	0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0,
	0, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 2, 1, 0,
	0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0,
	0, 1, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 1, 1, 0,
	0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// choose of the map
var gameMap = gameMap1;

var tileW = 62, tileH = 62; // cases dimensions
var mapW = 20, mapH = 13; // map dimensions

// calcul of the FPS (calculable)
var currentSecond= 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

// controls
var keysDown = {
	32 : false, // espace
	37 : false,
	38 : false,
	39 : false,
	40 : false
};

var player = new Character();
var ennemy = new Ennemy();
var ally = new Ally();

playerNameSelection();

function Character()
{
	this.tileFrom	= [1,1];
	this.tileTo		= [1,1];
	this.timeMoved	= 0;
	this.dimensions	= [tileW-20,tileH-20];
	this.position	= [tileW+10,tileH+10];
	this.delayMove	= 200;
	this.bomb = {power:5, number:0, maxNumber:5}; //defini l'explosion , nbr base , nbr max
	this.score = 0;
}
function Ennemy()
{
	this.tileFrom	= [1,1];
	this.tileTo		= [1,1];
	this.timeMoved	= 0;
	this.dimensions	= [tileW-20,tileH-20];
	this.position	= [tileW+20,tileH+10];
	this.delayMove	= 200;
}

function Ally()
{
	this.tileFrom	= [1,1];
	this.tileTo		= [1,1];
	this.timeMoved	= 0;
	this.dimensions	= [tileW-20,tileH-20];
	this.position	= [tileW+20,tileH+10];
}

// Placement of the character
Character.prototype.placeAt = function(x, y)
{
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [  ((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};
Ennemy.prototype.placeAt = function(x, y)
{
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [  ((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};

// Movement method (takes in parameter the current frameTime) --> where we are allowed to go
Character.prototype.processMovement = function(t)
{
	// if we don't move
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

	// if the current FrameTime is superior or equals of this delaysMove
	if((t-this.timeMoved)>=this.delayMove)
	{
		this.placeAt(this.tileTo[0], this.tileTo[1]);
	}
	else
	{
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / this.delayMove) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / this.delayMove) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
};


// Methode de selection du nom du joueur (Sam)
function playerNameSelection()
{
	playerName = prompt('Veuillez choisir un nom de joueur'); //le prompt nous demande de choisir un nom
	if (playerName != null) { // s'il n'est pas null
		// on affiche le nom du joueur sur la page
		document.getElementById("playerName").innerHTML = "Joueur: " + playerName;
		document.getElementById("playerName").style.color = "#7bff00";
		document.getElementById("playerName").style.background = "#302020";
	}
}

//prépare l'explosion (loan)
function startExplosion(x,y) {
	let boom = false;
	let timeExplosion = 3000; // temps d'explosion en ms (ex 2000 = 2 s) (loan)
	let minChange = 100; // delay min d'un changement d'image pour la bombe

	setTimeout(function ()
	{
		boom = true;
	}, timeExplosion);

	/*
	// d'une manière plus claire mais moins optimisée:
		setTimeout(boomer, timeExplosion); appelle la fonction boomer , lorsuqe time out
		function boomer()
		{
			boom = true;
		}
	*/

	countdown(0, x, y);

	//boucle tant qu'il a pas d'explosion (loan)
	function countdown(cnt, x, y) {
		if (!boom) {
			//modifie le tableau , on posution la bomb
			if(cnt < bombImage.length) {
				gameMap[((y * mapW) + x)] = cnt + SPRITE.bomb0;
				let time = timeExplosion / (bombImage.length);
				setTimeout(() => {
					countdown(cnt + 1, x, y)
				}, time < minChange ? minChange : time);
			}
		} else {
			explosion(x, y);
		}
	}

	//Gestion de l'explosion (loan)
	function explosion(x, y) {
		let stop = {left: false, right: false, top: false, bottom: false};
		let explosionPosition = [];
		let bombPosition = ((y * mapW) + x);
		gameMap[bombPosition] = SPRITE.explosion0; // on remplace le sprite de la bombe par l'explosion
		explosionPosition.push(bombPosition); //dit qu'on a modif le terrain
		checkPlayer(bombPosition);  //si il y a un joueur il meurt
		checkEnnemy(bombPosition);
		checkAlly(bombPosition);
		let pos = {};

		for (let i = 1; i <= this.player.bomb.power; i++) {
			pos = { // reste a gerer la sortie du tableau
				top: (((y - i) * mapW) + x),
				bottom: (((y + i) * mapW) + x),
				left: ((y * mapW) + x + i),
				right: ((y * mapW) + x - i)
			};
			let sprite = SPRITE.explosion1;
			let isLastSprite = i === this.player.bomb.power;
			if (isLastSprite) {
				sprite = SPRITE.explosion2;
			}
			extracted('top', sprite, isLastSprite);
			extracted('bottom', sprite, isLastSprite);
			extracted('left', sprite, isLastSprite);
			extracted('right', sprite, isLastSprite);
		}
		setTimeout(function () {
			this.player.bomb.number--;
			for (let i = 0; i < explosionPosition.length; i++) {
				gameMap[explosionPosition[i]] = SPRITE.emptyGround; //remplace ou on a enflamé par du sol
			}
		}, 1000);

		function checkPlayer(number) {
			if(this.player.tileFrom[1]*mapW + this.player.tileFrom[0] === number)
			{
				// Ici partie terminée, tu dois prendre le player.score et l'enregistrer et proposer une nouvelle partie
				console.log("Player Dead");
			}
		}

		function checkEnnemy(number) {
			if(this.ennemy.tileFrom[1]*mapW + this.player.tileFrom[0] === number)
			{
				player.score+=1000;
			}
		}

		function checkAlly(number) {
			if(this.ally.tileFrom[1]*mapW + this.player.tileFrom[0] === number)
			{
				player.score-=1500;
			}
		}

		//Suivant ce que touche l'explosion (loan)
		function extracted(direction, sprite, isLastSprite)
		{
			if(gameMap[pos[direction]] === SPRITE.delimitation || gameMap[pos[direction]] === SPRITE.unbreakableWall)
			{
				stop[direction] = true;
			}
			else if(!stop[direction])
			{
				if(gameMap[pos[direction]] === SPRITE.breakableWall)
				{
					player.score+= 73;
					doExplosion(pos[direction], SPRITE.explosion2);
					checkPlayer(pos[direction]);
					stop[direction] = true;
				}
				else if ((gameMap[pos[direction]] === SPRITE.emptyGround ))
				{
					if(isLastSprite)
					{
						doExplosion(pos[direction], SPRITE.explosion2);
						checkPlayer(pos[direction]);
						stop[direction] = true;
					}
					else
					{
						doExplosion(pos[direction], sprite);
						checkPlayer(pos[direction]);
					}
				}
			}
		}

		function doExplosion(position, sprt)
		{
			console.log("position" + position + "sprt " + sprt);
			gameMap[position] = sprt;
			explosionPosition.push(position);
		}
	}
}
//crée la bombe sur la case du joueur. (loan)
Character.prototype.dropBomb = function(x,y){
	if(this.bomb.number < this.bomb.maxNumber) //verifier si le nbr de bombe (car peux en avoir plus)
	{
		gameMap[((y*mapW)+x)] = 4; //met la bombe sur la place
		this.bomb.number++;
		startExplosion(x,y); //est on commence a l'exploser
	}
};

function toIndex(x, y)
{
	return((y * mapW) + x);
}

window.onload = function()
{
	ctx = document.getElementById('game').getContext("2d");
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";

	window.addEventListener("keydown", function(e) {
		// gauche, haut , bas , droite         espace ( de loan )
		if((e.keyCode>=37 && e.keyCode<=40) || e.keyCode===32) { keysDown[e.keyCode] = true; }

		// stopper la propagation
		if( e.preventDefault){
			e.preventDefault();
			e.stopPropagation();
		}
		else{
			e.returnValue = false;
			e.cancelBubble = true;
		}
	});
	window.addEventListener("keyup", function(e) {
		// gauche, haut , bas , droite         espace ( de loan )
		if((e.keyCode>=37 && e.keyCode<=40) || e.keyCode===32) { keysDown[e.keyCode] = false; }
		// stopper la propagation
		if( e.preventDefault){
			e.preventDefault();
			e.stopPropagation();
		}
		else{
			e.returnValue = false;
			e.cancelBubble = true;
		}
	});


};

function drawGame()
{
	if(ctx==null) { return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

	// Movement controls --> based on processMovement
	if(!player.processMovement(currentFrameTime))
	{
		if(keysDown[38] &&
			 player.tileFrom[1]>0 &&
			 gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]-1)]===1) {
			player.tileTo[1]-= 1;
			ennemy.tileTo[1]+=1;
		}
		else if(keysDown[40] &&
						player.tileFrom[1]<(mapH-1) &&
						gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]+1)]===1) {
			player.tileTo[1]+= 1;
			ennemy.tileTo[1]-=1;
		}
		else if(keysDown[37] &&
						player.tileFrom[0]>0 &&
						gameMap[toIndex(player.tileFrom[0]-1, player.tileFrom[1])]===1) {
			player.tileTo[0]-= 1;
		}
		else if(keysDown[39] &&
						player.tileFrom[0]<(mapW-1) &&
						gameMap[toIndex(player.tileFrom[0]+1, player.tileFrom[1])]===1) {
			player.tileTo[0]+= 1;
		}
		//Si l'espace est appuier (loan)
		else if(keysDown[32]){
		player.dropBomb(player.tileFrom[0], player.tileFrom[1]);
		keysDown[32] = false;
	}

		if(player.tileFrom[0]!==player.tileTo[0] || player.tileFrom[1]!==player.tileTo[1])
		{ player.timeMoved = currentFrameTime; }

	}

	// Define the colors/sprites of the blocks

	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			let number = gameMap[((y*mapW)+x)];
			switch(number)
			{
				case 0:
					ctx.fillStyle = "#302020"; // brun foncé (tour de la map)
					break;
				case 1:
					ctx.fillStyle = "#6c6d70"; // gris (chemin parcourable)
					break;
				case 2:
					//ctx.fillStyle = "#9C7B43"; // brun clair (mur cassable)
					ctx.fillStyle = "rgba(255, 255, 255, 0)"; // gris foncé (murs incassables)
					ctx.drawImage(barrierImage, x*tileW, y*tileH, tileW, tileH);
					ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
					break;
				case 3:
					ctx.fillStyle = "rgba(255, 255, 255, 0)"; // gris foncé (murs incassables)
					ctx.drawImage(buildingImage, x*tileW, y*tileH, tileW, tileH);
					ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
					break;
				/*BOMB*/
				default:
					if(number > 3 && number <= 10){
						let img;
						if(number < 8)
						{
							img = bombImage;
							number-=4;
						}
						else {
							img = explosionImage;
							number -=8;
						}
						ctx.fillStyle = "rgba(255, 255, 255, 0)";
						ctx.drawImage(img[number], x*tileW, y*tileH, tileW, tileH);
						ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
					}
			}

			ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
		}
	}
	ctx.fillStyle = "rgba(255, 255, 255, 0)";

	// Draw the sprite of the hero
	ctx.drawImage(heroImage, player.position[0], player.position[1], player.dimensions[0], player.dimensions[1]);
	ctx.fillRect(player.position[0], player.position[1],
							 player.dimensions[0], player.dimensions[1]);

	ctx.drawImage(EnnemyImage, ennemy.position[0], ennemy.position[1], ennemy.dimensions[0], ennemy.dimensions[1]);
	ctx.fillRect(ennemy.position[0], ennemy.position[1],
		ennemy.dimensions[0], ennemy.dimensions[1]);

	ctx.drawImage(AllyImage, ally.position[0], ally.position[1], ally.dimensions[0], ally.dimensions[1]);
	ctx.fillRect(ally.position[0], ally.position[1],
		ally.dimensions[0], ally.dimensions[1]);


	ctx.font = "20px Comic Sans MS";
	ctx.textAlign = "right";
	ctx.fillStyle = "red";
	ctx.fillText(player.score, (this.tileW*this.mapW)-(tileW/2), 20);

	// Background by default : red

	/*ctx.fillStyle = "#00ff24";
	ctx.font = "25px arial";
	ctx.fillText("Joueur: " + playerName, 10, 20);*/

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}
