// Game Scene 1
scene("level1", () => {

// add 1 platform, so it has lower z-index from ship
        add([
        // rect(350, 70),
        pos(-100, height() - 70),
        sprite("plat1"),
        area(),
        body({ isStatic: true }),
        "obstacle"
    ])

// add Spaceship to screen
const Ship = add([
    sprite("ship"),
    pos(5, height() - 100),
    area(),
    anchor("center"),
]) 
// add dialog box
const dialog = add([
    sprite("dialog"),
    pos(30, height() - 210),
    area(),
    anchor("center"),
]) 

// add Player to screen
const Player = add([
    sprite("player"),
    pos(200, height() - 160),
    area(),
    body(),
    health(5),
    anchor("center"),
    "player"
])    

// add Enemy to screen
const Enemy1 = add([
    sprite("enemy1"),
    pos(1450, height() - 350),
    area(),
    body(),
    anchor("center"),
    health(3),
    state("move", ["idle", "attack", "move"]),
    "enemy1"
])

// add Enemy to screen
const Enemy2 = add([
    sprite("enemy2"),
    pos(2000, height() - 500),
    area(),
    body(),
    anchor("center"),
    health(3),
    state("move", ["idle", "attack", "move"]),
    "enemy2"
])

// add Enemy to screen
const Enemy3 = add([
    sprite("enemy2"),
    pos(750, height() - 200),
    area(),
    body(),
    anchor("center"),
    health(3),
    state("move", ["idle", "attack", "move"]),
    "enemy3"
])

// Portal
const Portal = add([
    	sprite("portal"),
        pos(2600, height() - 400),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(139, 237, 107),
        "portal"
])


let mousepos;
// Player Shooting bullets at Enemy
onClick(() => {
    const mb = add([
        sprite("bullet"),
        pos(Player.pos.x, Player.pos.y),
        area(),
        move(toWorld(mousePos()).sub(Player.pos), BULLET_SPEED),
        // offscreen({destroy: true, distance: 400}),
        "MyBullet",
    ])
})
Enemy1.onCollide("MyBullet", (mb) => {
    Enemy1.hurt(1)
    play("hit_body", {volume: 0.1})
    addBlood({ pos: Enemy1.pos, colour: 'green'})
    destroy(mb)
})
Enemy2.onCollide("MyBullet", (mb) => {
    Enemy2.hurt(1)
    play("hit_metal", {volume: 0.1})
    addBlood({ pos: Enemy2.pos, colour: 'slate'})
    destroy(mb)
})
Enemy3.onCollide("MyBullet", (mb) => {
    Enemy3.hurt(1)
    play("hit_metal", {volume: 0.1})
    addBlood({ pos: Enemy3.pos, colour: 'slate'})
    destroy(mb)
})
Player.onCollide("enemy2", () => {
    Player.hurt(0.5)
    play("hit_blade", {volume: 0.1})
    addBlood({ pos: Player.pos, colour: 'red'})
});
Player.onCollide("enemy3", () => {
    Player.hurt(0.5)
    play("hit_blade", {volume: 0.1})
    addBlood({ pos: Player.pos, colour: 'red'})
});

// enemy throwing bullets at player
loop(1, () => {
    if (Player.exists()) {
        if (!Enemy1.exists()) return
        const en = add([
            sprite("bullet"),
            pos(Enemy1.pos.x, Enemy1.pos.y + 20),
            area(),
            move(Player.pos.angle(Enemy1.pos), BULLET_SPEED),
            offscreen({ destroy: true }),
            "Bullet",
        ])
    }
})
Player.onCollide("Bullet", (en) => {
    Player.hurt(0.5)
    addBlood({ pos: Player.pos, colour: 'red'})
    play("hit_body", {volume: 0.1})
    destroy(en)
})
Player.onCollide("portal", (Portal) => {
    play("portal", {volume: 0.2})
    go("level2")
})

// Here we move towards the player every frame if the current state is "move"
Enemy2.onStateUpdate("move", () => {
    if (!Player.exists()) return
    let distance = Player.pos.x - Enemy2.pos.x;
    if (distance < 250 && distance > -250) {
        const dir = Player.pos.sub(Enemy2.pos).unit()
        Enemy2.move(dir.scale(ENEMY_SPEED))
    }
})
Enemy3.onStateUpdate("move", () => {
    if (!Player.exists()) return
    let distance = Player.pos.x - Enemy3.pos.x;
    if (distance < 250 && distance > -250) {
        const dir = Player.pos.sub(Enemy3.pos).unit()
        Enemy3.move(dir.scale(ENEMY_SPEED))
    }
})


// add platforms

    add([
        rect(200, 160),
        pos(350, height() - 160),
        outline(),
        area(),
        body({ isStatic: true }),
        color(139, 237, 107),
        "obstacle"
    ])
    // falling gameover logic
    const fall = add([
        rect(2000000, 160),
        pos(-2000, height() - 1),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(0, 0, 0),
        "fall"
    ])
    Player.onCollide("fall", () => {
        Player.hurt(15)

    });
    add([
        rect(250, 180),
        pos(650, height() - 180),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(139, 237, 107),
        "obstacle"
    ])
    add([
        rect(200, 100),
        pos(1000, height() - 300),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(139, 237, 107),
        "obstacle"
    ])
    add([
        rect(100, 300),
        pos(1400, height() - 300),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(139, 237, 107),
        "obstacle"
    ])
    add([
        rect(500, 200),
        pos(1700, height() - 200),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(139, 237, 107),
        "obstacle"
    ])
    add([
        rect(400, 225),
        pos(2200, height() - 225),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(139, 237, 107),
        "obstacle"
    ])
    add([
        rect(700, 200),
        pos(2600, height() - 200),
        outline(2),
        area(),
        body({ isStatic: true }),
        color(139, 237, 107),
        "obstacle"
    ])



    // --The controls--

// move by SPEED px per frame
camPos(Player.pos.x, height() / 2)
onKeyDown("a", () => {
    Player.move(-SPEED, 0)
    camPos(Player.pos.x, height() / 2)
})
onKeyDown("d", () => {
    Player.move(SPEED, 0);
    camPos(Player.pos.x, height() / 2)
})

// .jump() when "space" key is pressed
onKeyPress("w", () => {
    if (Player.isGrounded()) {
        Player.jump();
    }
});
onKeyPress("space", () => {
    if (Player.isGrounded()) {
        Player.jump();
    }
});

// triggers when hp reaches 0
Player.on("death", () => {
    play("hit_body", {volume: 0.3})
    destroy(Player)
	go("gameover")
})
Enemy1.on("death", () => {
    destroy(Enemy1)
})
Enemy2.on("death", () => {
    destroy(Enemy2)
    play("die", {volume: 0.1})
})
Enemy3.on("death", () => {
    destroy(Enemy3)
    play("die", {volume: 0.1})
})

})

