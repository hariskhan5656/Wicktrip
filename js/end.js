scene("end", () => {
    add([
        sprite("menuBG"),
        anchor("center"),
        pos(width()/2, height()/2),
    ])
    const logo = add([
        sprite("logo"),
        anchor("center"),
        pos(width()/2, 170),
    ])
    const end = add([
        sprite("end"),
        anchor("center"),
        pos(width()/2, logo.pos.y+180),
    ])
    const button = add([
        sprite("btn"),
        area(),
        anchor("center"),
        pos(width()/2, logo.pos.y+300)
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
