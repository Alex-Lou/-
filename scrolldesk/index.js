const moon = document.getElementById('moon');
const moutains = document.getElementById('moutains');
const sky = document.getElementById('sky');
const roadi = document.getElementById('roadi');
const paysage = document.getElementById('paysage');

document.addEventListener('scroll', () => {
    let {scrollY} = window;

    roadi.style.top = 0.5 * scrollY + 'px';
    moutains.style.top = 0.05 * scrollY + 'px';
    moon.style.left = 1.1 * scrollY + 'px';
    sky.style.top = -1.2 * scrollY + 'px';
    paysage.style.top = (120 + -1.5 * scrollY) + 'px';

});


const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    {text: "My passion", color: "#ffc160"},
    {text: "for", color: "#B8860B"},
    {text: "your projects", color: "#f2a053"},
    {text: "is", color: "#8B0000"},
    {text: "limitless", color: "#DAA520"},
    {text: "Alexeev Ilya", color: "#A52A2A"}
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length].text;
elts.text1.style.color = texts[textIndex % texts.length].color;
elts.text2.textContent = texts[(textIndex + 1) % texts.length].text;
elts.text2.style.color = texts[(textIndex + 1) % texts.length].color;

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.1) * 100}%`;
    elts.text2.style.color = texts[(textIndex + 1) % texts.length].color;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.2) * 100}%`;
    elts.text1.style.color = texts[textIndex % texts.length].color;

    elts.text1.textContent = texts[textIndex % texts.length].text;
    elts.text2.textContent = texts[(textIndex + 1) % texts.length].text;
}

function doCooldown() {
    morph = 0;
  
    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";
    elts.text2.style.color = texts[(textIndex + 1) % texts.length].color;
  
    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
    elts.text1.style.color = texts[textIndex % texts.length].color;
  
    // Reset the text position to the initial state
    elts.text1.style.transform = 'translateY(0)';
    elts.text2.style.transform = 'translateY(0)';
  }
  
  function animate() {
    requestAnimationFrame(animate);
  
    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 2500;
    time = newTime;
  
    cooldown -= dt;
  
    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }
  
      doMorph();
    } else {
      doCooldown();
    }
  
    // Start the animation after 6 seconds
    if (scrollY > 0 && scrollY < 300 && newTime - time > 6000) {
      elts.text1.style.transform = 'translateY(-100px)';
      elts.text2.style.transform = 'translateY(-100px)';
    }
  }
  
  animate();
  

  // function([string1, string2],target id,[color1,color2])    
consoleText(['Atos, ', 'Siemens, ', 'Deutsche Bank, '], 'text',['tomato','rebeccapurple','lightblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

