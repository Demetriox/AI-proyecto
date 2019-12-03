var posiciones = [
    { key: "pajaro", value: "images/pajaro.JPG" },
    { key: "jabali", value: "images/jabali.JPG" },
    { key: "perro", value: "images/perro.JPG" },
    { key: "dragon", value: "images/dragon.JPG" },

    { key: "liebre", value: "images/liebre.JPG" },
    { key: "caballo", value: "images/caballo.JPG" },
    { key: "mono", value: "images/mono.JPG" },
    { key: "buey", value: "images/buey.JPG" },

    { key: "rata", value: "images/rata.JPG" },
    { key: "serpiente", value: "images/serpiente.JPG" },
    { key: "tigre", value: "images/tigre.JPG" },
    { key: "carnero", value: "images/carnero.JPG" },
];
var src = document.getElementById("header");
let i = posiciones.len
let mobilenet;
let classifier;
let video;
let label = 'loading model';
let trainButton;
var labeleado;
var contador = 0;

function setup() {
    createCanvas(320, 270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet');
    classifier = mobilenet.classification(video);
    classifier.load('model.json', console.log("Model is ready."));
    classifier.classify(gotResults);
    var random = [];
    for (var i; i < 5; i++) {
        random.push(posiciones[(Math.round(Math.random() * 12))]);
    }
    posiciones.filter(random.key);
    var img = document.createElement("img");
    img.src = posiciones[i - 1].value;
    src.appendChild(img);
    // posiciones.sort(function(){return 0.5 - Math.random()});
}

function draw() {
    background(0);
    image(video, 0, 0, 320, 240);
    fill(255);
    textSize(16);
    text(label[0].label, 10, height - 10);
    if (label[0].label == posiciones[i - 1].key) {
        src.innerHTML = "";
        var img = document.createElement("img");
        img.src = posiciones[i - 1].value;
        src.appendChild(img);
        posiciones.pop();
        i--;
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
