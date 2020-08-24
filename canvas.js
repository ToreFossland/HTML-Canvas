var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
c.fillStyle = "green";
c.fillRect(100, 100, 100, 100);
console.log(canvas);

//Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "blue";
c.stroke();


// Arc/Circle
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI*2, false);
c.strokeStyle = "red";
c.stroke();


