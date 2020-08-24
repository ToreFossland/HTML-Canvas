var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// c.fillStyle = "green";
// c.fillRect(100, 100, 100, 100);
// console.log(canvas);

//Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();


// Arc/Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.strokeStyle = "red";
// c.stroke();

// for(let i = 0; i < 500; i++){
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI*2, false);
//     c.strokeStyle = "red";
//     c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 100;
// var minRadius = 30;

var colorArray = ['#ffaa33', '#fa2345', '#556775', '#44ff11', '#aa3445'];

window.addEventListener('mousemove', function(event){
            mouse.x = event.x;
            mouse.y = event.y;
    }
)

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
        }
)
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color =  colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function (){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }
    this.update = function (){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //Interactivity

        if(mouse.x - this.x < 50 && mouse.x -this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 3;
            }
        }else if(this.radius > this.minRadius){
            this.radius -=3;
        }

        this.draw();
    }

}

var circleArray = [];

function init(){
    circleArray = [];
    for(let i = 0; i < 800; i++){
        var radius = Math.random() * 10 + 10;
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var y = Math.random() * (innerHeight - 2 * radius) + radius;
        var dx = (Math.random() -0.5);
        var dy = (Math.random() -0.5);

        circleArray.push(new Circle(x, y ,dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, innerHeight);

    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}

init();

animate();

