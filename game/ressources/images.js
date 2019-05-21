const bombImage = [new Image(), new Image(), new Image() ];
const explosionImage = [new Image(), new Image(), new Image()];
bombImage[0].src = "game/ressources/images/bomb0.png";
bombImage[1].src = "game/ressources/images/bomb1.png";
bombImage[2].src = "game/ressources/images/bomb2.png";
//bombImage[3].src = "ressources/images/images/bomb3.png"; il était trop noir
explosionImage[0].src = "game/ressources/images/explosion0.png";
explosionImage[1].src = "game/ressources/images/explosion1.png";
explosionImage[2].src = "game/ressources/images/explosion2.png";

const avatarImage = [new Image(), new Image()];
avatarImage[0].src = "game/ressources/images/Punk_jaune.png";
avatarImage[1].src = "game/ressources/images/Punkette_jaune.png";

const SPRITE_AVATAR = {
    "avatar1" : 0,
    "avatar2" : 1
}

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