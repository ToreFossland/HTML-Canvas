const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

const maxRadius = 100;
//let minRadius = 30;

const colorArray = ['#ffaa33', '#fa2345', '#556775', '#44ff11', '#aa3445'];

window.addEventListener('mousemove', (mouseevent) => {mouse.x = mouseevent.x; mouse.y = mouseevent.y; })

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
        }
)

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }

    //Sto function før
    this.update = () => {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //Interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 3;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 3;
        }

        this.draw();
    }
}

let circleArray = [];

let init = () => {
    for(let i = 0; i < 800; i++){
        let radius = Math.random() * 10 + 10;
        let x = Math.random() * (innerWidth - 2 * radius) + radius;
        let y = Math.random() * (innerHeight - 2 * radius) + radius;
        let dx = (Math.random() -0.5);
        let dy = (Math.random() -0.5);

        circleArray.push(new Circle(x, y ,dx, dy, radius));
    }
    // circleArray.forEach((element) => {
    //     let radius = Math.random() * 10 + 10;
    //         let x = Math.random() * (innerWidth - 2 * radius) + radius;
    //         let y = Math.random() * (innerHeight - 2 * radius) + radius;
    //         let dx = (Math.random() -0.5);
    //         let dy = (Math.random() -0.5);
    //
    //         circleArray.push(new Circle(x, y ,dx, dy, radius));
    // })
}

let animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, innerHeight);
    circleArray.forEach((element) => element.update())
}

init();

animate();

