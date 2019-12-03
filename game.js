var src = document.getElementById("header");
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/model.json';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
var reloj = 40;
var posiciones = [
  { key: "pajaro", value: "../images/pajaro.JPG" },
  { key: "jabali", value: "../images/jabali.JPG" },
  { key: "perro", value: "../images/perro.JPG" },
  { key: "dragon", value: "../images/dragon.JPG" },

  { key: "liebre", value: "../images/liebre.JPG" }, 
  { key: "caballo", value: "../images/caballo.JPG" },
 { key: "mono", value: "../images/mono.JPG" },
  { key: "buey", value: "../images/buey.JPG" },

  { key: "rata", value: "../images/rata.JPG" },
  { key: "serpiente", value: "../images/serpiente.JPG" },
  { key: "tigre", value: "../images/tigre.JPG" },
  { key: "carnero", value: "../images/carnero.JPG" }, 
];
var i = posiciones.length;



// Load the model first
function preload() {
  classifier = ml5.imageClassifier('model.json');
}

function setup() {
  createCanvas(320, 260);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  classifyVideo();
  posiciones.sort(function () { return 0.5 - Math.random() });
  var img = document.createElement("img");
  img.src = posiciones[i - 1].value;
  src.innerHTML = "";
  src.appendChild(img);
}

function draw() {
  background(0);
  image(flippedVideo, 0, 0);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  jugar();
}


function updateClock() {
  reloj = document.getElementById('countdown').innerHTML = reloj;
  if (reloj+1 == 0) {
      console.log('Se acabo el tiempo');
  }
  else {
      setTimeout("updateClock()", 1000);
      reloj -= 1;
  }
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}



//LOGICA JUEGO
function jugar() {
  console.log(label)
  if (reloj+1 == 0) {
      var img = document.createElement("img");
      img.src = "../images/perdiste.jpg";
      let gameStatus = document.getElementById('gameCardTitle');
      let instrucciones = document.getElementById('instrucciones');
      let counterLeft = document.getElementById('counterLeft');
      gameStatus.innerHTML = "Perdiste";
      instrucciones.innerHTML = "";
      counterLeft.innerHTML = "";
      src.innerHTML = "";
      src.appendChild(img);
      gameStart = false;
  }
  if (posiciones.length > 0) {
      if (label == posiciones[i - 1].key) {
          src.innerHTML = "";
          var img = document.createElement("img");
          img.src = posiciones[i - 2].value;
          src.appendChild(img);
          posiciones.pop();
          i--;
      }
  }
  else {
      src.innerHTML = "Ganaste eres el mas perron aqui";
      var img = document.createElement("img");
      img.src = "../images/elmasperron.jpg";
      img.size(10, AUTO);
      src.appendChild(img);
      gameStart = false;
  }
}


function start() {
  updateClock();
  gameStart = true;
  classifier.classify(gotResult);
}



function reset() {
  src.innerHTML = "";
  posiciones.sort(function () { return 0.5 - Math.random() });
  var img = document.createElement("img");
  img.src = posiciones[i - 1].value;
  src.appendChild(img);
  reloj = 40;
}