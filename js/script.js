// select the canvas from DOM and we get context
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const canvas__width = canvas.width = 1500;
const canvas__height = canvas.height = 507;

// select the images from DOM  
const layer1 = document.getElementById('layer1');
const layer2 = document.getElementById('layer2');
const layer3 = document.getElementById('layer3');
const layer4 = document.getElementById('layer4');

// Initial the variable
let x = 0;
let x2 = 1500;

// it creates the speed for layers
const movespeed = 5;

// now this represents each layer
class Layer {
    constructor(image, movespeed, y_Position) {
        this.x = 0;
        this.y = y_Position;
        this.width = 1500;
        this.height = 507;
        this.x2 = this.width;
        this.image = image;
        this.speedmodifier = movespeed;
    }
    // this will draw the layer
    draw() {
        ctx.drawImage(this.image, this.x, this.y);
        ctx.drawImage(this.image, this.x2, this.y);
    }
    // this will update the layer
    update() {
        if (this.x < -1500) {
            this.x = 1500 - this.speedmodifier + this.x2;
        }
        else {
            this.x -= this.speedmodifier;
        }
        if (this.x2 < -1500) {
            this.x2 = 1500 - this.speedmodifier + this.x;
        }
        else {
            this.x2 -= this.speedmodifier;
        }
    }

}

// it creates the speed difference btw each layer
const frontlayer = new Layer(layer1, 2.3, 0);
const midlayer = new Layer(layer2, 1.5, 0);
const lastlayer = new Layer(layer3, 1, 0);
const blurlayer = new Layer(layer4, 0.5, 0);

// store it in array
gameobjects = [blurlayer, lastlayer, midlayer, frontlayer];

// and finally animation function
function animate() {
    ctx.clearRect(0, 0, canvas__width, canvas__height);
    // use the array in loop one by one
    gameobjects.forEach(object => {
        object.update(); 
        object.draw(); 
    });
    requestAnimationFrame(animate);
}

animate();
