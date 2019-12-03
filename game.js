var src = document.getElementById("header");
let mobilenet;
let classifier;
let video;
let label = 'loading model';
let trainButton;
var labeleado;
var contador = 0;
var run = true
var reloj = 2;
var gameStart = false;

var posiciones = [
    // { key: "pajaro", value: "images/pajaro.JPG" },
    // { key: "jabali", value: "images/jabali.JPG" },
    // { key: "perro", value: "images/perro.JPG" },
    // { key: "dragon", value: "images/dragon.JPG" },

    // { key: "liebre", value: "images/liebre.JPG" },
    // { key: "caballo", value: "images/caballo.JPG" },
    // { key: "mono", value: "images/mono.JPG" },
    // { key: "buey", value: "images/buey.JPG" },

    { key: "rata", value: "images/rata.JPG" },
    { key: "serpiente", value: "images/serpiente.JPG" },
    // { key: "tigre", value: "images/tigre.JPG" },
    // { key: "carnero", value: "images/carnero.JPG" },
];
var i = posiciones.length;

function setup() {
    createCanvas(320, 270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', console.log("ML5 Loaded"));
    classifier = mobilenet.classification(video);
    classifier.load('model.json', console.log("Model is ready."));
    let startGame = createButton('game');
    startGame.style('font-size', '20px');
    startGame.style('appearance', 'none');
    startGame.style('height', '50px');
    startGame.style('width','200px');
    startGame.style('display','table');
    startGame.style('font-weight','bold')
    startGame.style('box-shadow','0px 0px 5px 0px rgba(0, 0, 0, 0.55)' )
    startGame.style('border-radius', '2em');
    startGame.style('cursor', 'pointer');
    startGame.style('margin-bottom', '15px');
   
    startGame.mousePressed(function () {
        updateClock();
        classifier.classify(gotResults);
        gameStart = true;
      });

      let reset = createButton('Reset');
        reset.style('font-size', '20px');
        reset.style('appearance', 'none');
        reset.style('height', '50px');
        reset.style('width','200px');
        reset.style('display','table');
        reset.style('font-weight','bold')
        reset.style('box-shadow','0px 0px 5px 0px rgba(0, 0, 0, 0.55)' )
        reset.style('border-radius', '2em');
        reset.style('cursor', 'pointer');
      reset.mousePressed(function () {
        src.innerHTML = " ";
         reloj = 40;
        });
    posiciones.sort(function(){return 0.5 - Math.random()});
    var img = document.createElement("img");
    img.src = posiciones[i - 1].value;
    console.log(posiciones[i - 1].value, i)
    src.appendChild(img);
}

//TIMER
function updateClock() {
    reloj = 
    document.getElementById('countdown').innerHTML = reloj;
    if(reloj==0){
      console.log('Final');
    }else{
      reloj-=1;
      setTimeout("updateClock()",1000);
    }
  }


function draw() {
    background(0);
    image(video, 0, 0, 320, 240);
    fill(255);
    textSize(16);
    text(label[0].label, 10, height - 10);
   if( gameStart == true){
       jugarConJutsus();
   }
}

 function jugarConJutsus(){
    if(posiciones.length > 0) {
        if (label[0].label == posiciones[i - 1].key) {
            src.innerHTML = "";
            var img = document.createElement("img");
            img.src = posiciones[i - 1].value;
            src.appendChild(img);
            posiciones.pop();
            i--;
        }
    }
    else if (reloj == 0) {
        console.log("Perdiste!")
        src.innerHTML = "Perdiste";
        var img = document.createElement("img");
        img.src = "images/perdiste.jpg";
        src.appendChild(img);
        gameStart = false;
    }
    else {
        console.log("Ganaste!")
        var img = document.createElement("img");
        img.src = "images/elmasperron.jpg";
        src.innerHTML = "Ganaste eres el mas perrron aqui";
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
