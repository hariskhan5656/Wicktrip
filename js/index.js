kaboom({
    background: [0, 0, 0, 0]
})

// --CONSTANTS--

setGravity(1600)
const SPEED = 300;
const BULLET_SPEED = 700;
const ENEMY_SPEED = 200;

// --This will run every FRAME--

onUpdate(() => {
    // Enemy1.move(Player.pos.x, 0)
    onCollide("MyBullet", "obstacle", (mb) => { destroy(mb) })
    onCollide("Bullet", "obstacle", (en) => { destroy(en) })
})

// --loading sprites--

loadSprite("menuBG", "assets/BG-menu.png")
loadSprite("logo", "assets/logo-menu.png")
loadSprite("btn", "assets/button.png")
loadSprite("btn2", "assets/button2.png")
loadSprite("credit", "assets/credit.png")
loadSprite("player", "assets/characters/player.png")
loadSprite("enemy1", "assets/characters/enemy1.png")
loadSprite("enemy2", "assets/characters/enemy2.png")
loadSprite("enemy3", "assets/characters/enemy1.png")
loadSprite("enemy_fly", "assets/characters/enemy-fly.png")
loadSprite("bullet", "assets/bullet.png")
loadSprite("bullet2", "assets/bullet-2.png")
loadSprite("plat1", "assets/level1/level1-1.png")
loadSprite("ship", "assets/level1/ship.png")
loadSprite("candle", "assets/candle.png")
loadSprite("portal", "assets/portal.png")
loadSprite("end", "assets/end.png")
loadSprite("dialog", "assets/dialog.png")

loadSound("click", "assets/sounds/click.mp3")
loadSound("hit_body", "assets/sounds/hit_body.mp3")
loadSound("hit_metal", "assets/sounds/hit_metal.mp3")
loadSound("hit_blade", "assets/sounds/hit-blade.mp3")
loadSound("die", "assets/sounds/die.mp3")
loadSound("portal", "assets/sounds/portal.mp3")
loadSound("BG", "assets/sounds/BG.mp3")
loadSound("win", "assets/sounds/win.mp3")




// Gameover
scene("gameover", () => {
    add([
        sprite("menuBG"),
        anchor("center"),
        pos(width()/2, height()/2),
    ])
    const logo = add([
        sprite("logo"),
        anchor("center"),
        pos(width()/2, 200),
    ])
    const button = add([
        sprite("btn2"),
        area(),
        anchor("center"),
        pos(width()/2, logo.pos.y+170)
    ])
    button.onClick(l)
    add([
        sprite("credit"),
        anchor("center"),
        pos(width()/2, height()-50)
    ])
    onKeyPress("enter", () => {
        go("level1")
    });
})      
function l(){go("level1");play("click", {volume: 0.5})}
