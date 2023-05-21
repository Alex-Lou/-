document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header'); 
    const backgrounds = ['#556B2F', '#4B0082', '#FCBC65', '#FA7B50'];
    const largeNums = [30, 35, 40, 50]; 
    const smallNums = [3, 4, 5, 6];
    
    const coordinates = {
        x: undefined, 
        y: undefined 
    }

    const generateNumber = () => { 
        return Math.floor(Math.random() * 4);
    }

    const createRandomNumbers = () => {
        const width = generateNumber(); 
        const height = generateNumber(); 
        const color = generateNumber(); 
        return [width, height, color]; 
    }

    const configureWideElement = (newEle) => {
        const [width, height, color] = createRandomNumbers(); 
        newEle.style.width = largeNums[width] + 'px'; 
        newEle.style.height = smallNums[height] + 'px'; 
        newEle.style.backgroundColor = backgrounds[color];
        newEle.classList.add('line', 'line-wide');
        
    }

    const configureTallElement = (newEle) => {
        const [width, height, color] = createRandomNumbers(); 
        newEle.style.width = smallNums[width] + 'px'; 
        newEle.style.height = largeNums[height] + 'px'; 
        newEle.style.backgroundColor = backgrounds[color];
        newEle.classList.add('line', 'line-high');

    }

    const addElement = () => {
        const newEle = document.createElement('div');
        const typeNum = Math.round(Math.random()); //returns 0 or 1;  

        if(typeNum === 0) { 
            configureWideElement(newEle);
        } else {
            configureTallElement(newEle); 
        }

        console.log(newEle); 

        newEle.style.left = coordinates.x + 'px'; 
        newEle.style.top = coordinates.y + 'px'; 
        header.appendChild(newEle); 

    }

    const updateCoordinates = e => { 
        if(coordinates.x === undefined || coordinates.y === undefined){
            coordinates.x = e.x; 
            coordinates.y = e.y;
            addElement(); 
        }

        if(Math.abs(coordinates.x - e.x) > 50 || Math.abs(coordinates.y - e.y) > 50) {
            coordinates.x = e.x; 
            coordinates.y = e.y;
            addElement(); 
        } 
    }

    header.addEventListener('mousemove', e => {
        updateCoordinates(e); 
    });
}); 

//**************************************************************** */



var canvas = document.querySelector("#scene"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = {x:0,y:0},
  radius = 1;

var colors = ["#a8323c","#210f4a", "#FFB03B","#B64926", "#8E2800"];

var copy = document.querySelector("#copy");

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

function Particle(x,y){
  this.x =  Math.random()*ww;
  this.y =  Math.random()*wh;
  this.dest = {
    x : x,
    y: y
  };
  this.r =  Math.random()*5 + 2;
  this.vx = (Math.random()-1.5)*10;
  this.vy = (Math.random()-0.5)*20;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random()*0.05 + 0.94;

  this.color = colors[Math.floor(Math.random()*8)];
}

Particle.prototype.render = function() {


  this.accX = (this.dest.x - this.x)/1000;
  this.accY = (this.dest.y - this.y)/1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y +=  this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt( a*a + b*b );
  if(distance<(radius*30)){ // Changer taille du black circle de shock***********
    this.accX = (this.x - mouse.x)/10;
    this.accY = (this.y - mouse.y)/100;
    this.vx += this.accX;
    this.vy += this.accY;
  }

}

function onMouseMove(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e){
  if(e.touches.length > 0 ){
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e){
mouse.x = -9999;
mouse.y = -9999;
}

function initScene(){
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold "+(ww/10)+"px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(copy.value, ww/2, wh/2);

  var data  = ctx.getImageData(0, 0, ww, wh).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  //nb particules ********

  
  particles = [];
  for(var i=0;i<ww;i+=Math.round(ww/200)){
    for(var j=0;j<wh;j+=Math.round(ww/150)){
      if(data[ ((i + j*ww)*4) + 3] > 150){
        particles.push(new Particle(i,j));
      }
    }
  }
  amount = particles.length;

}

function onMouseClick(){
  radius++;
  if(radius ===5){
    radius = 0;
  }
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
};

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);
