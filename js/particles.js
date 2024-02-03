const DEF_COUNT = 20
const DEF_GRAVITY = 900
const DEF_AIR_DRAG = 0.3
const DEF_VELOCITY = [500, 2000]
const DEF_ANGULAR_VELOCITY = [-200, 200]
const DEF_FADE = 0.9
const DEF_SPREAD = 80
const DEF_SPIN = [2, 8]
const DEF_SATURATION = 0.9
const DEF_LIGHTNESS = 0.7


function addBlood(opt = {}) { 
	const sample = (s) => typeof s === "function" ? s() : s
	for (let i = 0; i < (opt.count ?? DEF_COUNT); i++) {
		let clr;
		if (opt.colour=='red'){clr=rgb(138,23,24);}
		else if (opt.colour=='green'){clr=rgb(0,249,173)}
		else if (opt.colour=='blue'){clr=rgb(0,255,247)}
		else if (opt.colour=='slate'){clr=rgb(36,52,88)}
		else{clr=rgb(0,0,0)}
		const p = add([
			pos(sample(opt.pos ?? vec2(0, 0))),
			choose([
				circle(rand(3, 4)),
				circle(rand(3, 7)),
			]),
			color(clr),
			opacity(1),
			lifespan(4),
			scale(1),
			anchor("center"),
			rotate(rand(0, 360)),
		])
		const spin = rand(DEF_SPIN[0], DEF_SPIN[1])
		const gravity = opt.gravity ?? DEF_GRAVITY
		const airDrag = opt.airDrag ?? DEF_AIR_DRAG
		const heading = sample(opt.heading ?? 0) - 90
		const spread = opt.spread ?? DEF_SPREAD
		const head = heading + rand(-spread / 2, spread / 2)
		const fade = opt.fade ?? DEF_FADE
		const vel = sample(opt.velocity ?? rand(DEF_VELOCITY[0], DEF_VELOCITY[1]))
		let velX = Math.cos(deg2rad(head)) * vel
		let velY = Math.sin(deg2rad(head)) * vel
		const velA = sample(opt.angularVelocity ?? rand(DEF_ANGULAR_VELOCITY[0], DEF_ANGULAR_VELOCITY[1]))
		p.onUpdate(() => {
			velY += gravity * dt()
			p.pos.x += velX * dt()
			p.pos.y += velY * dt()
			p.angle += velA * dt()
			p.opacity -= fade * dt()
			velX *= airDrag
			velY *= airDrag
			p.scale.x = wave(-1, 1, time() * spin)
		})
	}
}

// onKeyPress("space", () => addBlood({ pos: mousePos() }))
// onMousePress(() => addBlood({ pos: mousePos() }))
