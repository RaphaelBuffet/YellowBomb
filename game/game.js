class Character {
	tileFrom	= [1,1];
	tileTo		= [1,1];
	timeMoved	= 0;
	dimensions	= [tileW-20,tileH-20];
	position	= [tileW+10,tileH+10];
	delayMove	= 200;
	bomb = {power:5, number:0, maxNumber:5}; //defini l'explosion , nbr base , nbr max
	score = 0;
	country = {};
	name = "";
}

// context
var ctx = null;
// hero's image
var heroImage = new Image();
heroImage.src = "game/ressources/images/Punk_jaune.png";
// unbreakable block image
const buildingImage = new Image();
buildingImage.src = "game/ressources/images/building.png";
// breakable block image
const barrierImage = new Image();
barrierImage.src = "game/ressources/images/box.png";



// choose of the map
var gameMap = maps[0];

var tileW = 62, tileH = 62; // cases dimensions
var mapW = 20, mapH = 13; // map dimensions
var player = new Character();

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

const selectionCharacter = document.getElementById("avatarZone");
selectionCharacter.addEventListener("dragover", dragover);
selectionCharacter.addEventListener("dragenter", dragenter);
selectionCharacter.addEventListener("drop", drop);

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function dragover(e) {
	e.preventDefault()
}
function dragenter(e) {
	e.preventDefault()
}
function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
	heroImage = avatarImage[SPRITE_AVATAR[data]];
	if(ev.dataTransfer.items !== null)
	{
		document.getElementById("gameZone").hidden = true;
	}
}
// Méthodes de drag and drop (Sam) -- Fin


playerNameSelection();

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((coord) =>{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			// test du statut de retour de la requête AJAX
			if (xhttp.readyState == 4 && (xhttp.status == 200 || xhttp.status == 0)) {
				// on désérialise le catalogue et on le sauvegarde dans une variable
				let country = JSON.parse(xhttp.responseText);
				player.country.name = country.countryName;
				player.country.code = country.countryCode;
			}
		};
		xhttp.open("GET", `http://api.geonames.org/countryCodeJSON?lat=${coord.coords.latitude}&lng=${coord.coords.longitude}&username=demo`, true);
		xhttp.send();
	});
}

// Placement of the character
Character.prototype.placeAt = function(x, y)
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
	this.player.name = prompt('Veuillez choisir un nom de joueur'); //le prompt nous demande de choisir un nom
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
				recordScore();
			}
		}

		function recordScore(){
			// Ici partie terminée, tu dois prendre le player.score et l'enregistrer et proposer une nouvelle partie
			let score = localStorage.getItem("score");
			if(!score)
			{
				score = [];
			}
			else
			{
				score = JSON.parse(score); //conversion le json en objet pour le local
			}
			score.push({
				name: player.name,
				score: player.score,
				date: new Date(),
				country: {
					name: player.country.name,
					code: player.country.code
				}

			});
			console.log(JSON.stringify(score));
			localStorage.setItem("score", JSON.stringify(score));
			console.log("Player Dead");
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
		}
		else if(keysDown[40] &&
						player.tileFrom[1]<(mapH-1) &&
						gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]+1)]===1) {
			player.tileTo[1]+= 1;
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
	ctx.font = "20px Comic Sans MS";
	ctx.textAlign = "right";
	ctx.fillStyle = "red";
	ctx.fillText(player.score, (this.tileW * this.mapW) - (tileW / 2), 20);
	ctx.fillStyle = "green";
	ctx.fillText("Name : " + player.name, 80 + player.name.length * 11.3, 20);


	// Background by default : red

	/*ctx.fillStyle = "#00ff24";
	ctx.font = "25px arial";
	ctx.fillText("Joueur: " + playerName, 10, 20);*/

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}
