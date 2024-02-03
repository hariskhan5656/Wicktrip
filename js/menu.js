scene("menu", () => {
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
        sprite("btn"),
        area(),
        anchor("center"),
        pos(width()/2, logo.pos.y+170)
    ])
    button.onClick(f)
    add([
        sprite("credit"),
        anchor("center"),
        pos(width()/2, height()-50)
    ])
    onKeyPress("enter", () => {
        go("level1")
    });
})

function f(){go("level2");play("BG", {volume: 0.07,loop: true});play("click", {volume: 0.5})}

// Go to scene
go("menu")
