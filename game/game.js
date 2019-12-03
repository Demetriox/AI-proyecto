var src = document.getElementById("header");
let mobilenet;
let classifier;
let video;
let label = 'loading model';
var reloj = 40;
var gameStart = false;
let modelURL = 'https://storage.googleapis.com/tm-models/YadBJmj5/';

function preload() {
  classifier = ml5.imageClassifier('model.json');
}


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

function setup() {
    createCanvas(320, 270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    /* mobilenet = ml5.featureExtractor('MobileNet', console.log("ML5 Loaded"));
    classifier = mobilenet.classification(video); */ 
    classifyVideo();
    // classifier.load('../model.json', console.log("Model is ready."));
    posiciones.sort(function () { return 0.5 - Math.random() });
    var img = document.createElement("img");
    img.src = posiciones[i - 1].value;
    src.appendChild(img);
}

function draw() {
    background(0);
    image(video, 0, 0, 320, 240);
    fill(255);
    textSize(16);
    text(label[0].label, 10, height - 10);
    if (gameStart == true) {
        jugar();
    }
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

function jugar() {
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
        if (label[0].label == posiciones[i - 1].key) {
            src.innerHTML = "";
            var img = document.createElement("img");
            img.src = posiciones[i - 1].value;
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
/*
function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        label = result;
        classifier.classify(gotResults);
    }
}
*/

function start() {
    updateClock();
    gameStart = true;
    classifier.classify(gotResults);
}

function reset() {
    src.innerHTML = "";
    posiciones.sort(function () { return 0.5 - Math.random() });
    var img = document.createElement("img");
    img.src = posiciones[i - 1].value;
    src.appendChild(img);
    reloj = 40;
}



// P5 EXAMPLE OF PRELOADED MODEL
function classifyVideo() {
    classifier.classify(video, gotResults);
  }


// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  console.log(label);
  label = results[0].label;
  classifyVideo();
}
