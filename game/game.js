var src = document.getElementById("header");
let mobilenet;
let classifier;
let video;
let label = 'loading model';
var reloj = 5;
var gameStart = false;
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
    mobilenet = ml5.featureExtractor('MobileNet', console.log("ML5 Loaded"));
    classifier = mobilenet.classification(video);
    classifier.load('../model.json', console.log("Model is ready."));
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
    if (reloj == 0) {
        console.log('Se acabo el tiempo');
    } else {
        reloj -= 1;
        setTimeout("updateClock()", 1000);
    }
}

function jugar() {
    if (reloj == 0) {
        var img = document.createElement("img");
        img.src = "../images/perdiste.jpg";
        src.innerHTML = "Perdiste";
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

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        label = result;
        classifier.classify(gotResults);
    }
}

function start() {
    updateClock();
    classifier.classify(gotResults);
    gameStart = true;
}

function reset() {
    src.innerHTML = " ";
    reloj = 40;
}