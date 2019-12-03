let mobilenet;
let classifier;
let video;
let rataButton, serpienteButton, jabaliButton, dragonButton, monoButton, bueyButton, caballoButton, ovejaButton;
let tigreButton, pajaroButton, perroButton, conejoButton;
let label = 'loading model';
let trainButton;
var labeleado;
var src = document.getElementById("header");

function modelReady() {
  console.log('Model is ready!!!');
}


function videoReady() {
  console.log('Video is ready!!!');
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
  rataButton = createButton('rata');
  rataButton.mousePressed(function () {
    classifier.addImage('rata');
  });
  serpienteButton = createButton('serpiente');
  serpienteButton.mousePressed(function () {
    classifier.addImage('serpiente');
  });
  bueyButton = createButton('buey');
  bueyButton.mousePressed(function () {
    classifier.addImage('buey');
  });
  jabaliButton = createButton('jabali');
  jabaliButton.mousePressed(function () {
    classifier.addImage('jabali');
  });
  dragonButton = createButton('dragon');
  dragonButton.mousePressed(function () {
    classifier.addImage('dragon');
  });
  conejoButton = createButton('conejo');
  conejoButton.mousePressed(function () {
    classifier.addImage('conejo');
  });
  pajaroButton = createButton('pajaro');
  pajaroButton.mousePressed(function () {
    classifier.addImage('pajaro');
  });
  caballoButton = createButton('caballo');
  caballoButton.mousePressed(function () {
    classifier.addImage('caballo');
  });
  tigreButton = createButton('tigre');
  tigreButton.mousePressed(function () {
    classifier.addImage('tigre');
  });
  ovejaButton = createButton('oveja');
  ovejaButton.mousePressed(function () {
    classifier.addImage('ovejea');
  });
  liebreButton = createButton('liebre');
  liebreButton.mousePressed(function () {
    classifier.addImage('liebre');
  });

  monoButton = createButton('mono');
  monoButton.mousePressed(function () {
    classifier.addImage('mono');
  });

  perroButton = createButton('perro');
  perroButton.mousePressed(function () {
    classifier.addImage('perro');
  });


  trex = createButton('nnn');
  
  
  trex = createButton('nnn');

  trex = createButton('nnn');

  trex = createButton('nnn');
  trex = createButton('nnn');

  trex = createButton('nnn');

  trex = createButton('nnn');



  trainButton = createButton('train');
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
  });

  saveButton = createButton('save');
  saveButton.mousePressed(function () {
    classifier.save();
  });
}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label[0].label, 10, height - 10);
  labeleado = label[0].label;
  
  if(labeleado == "rata"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/rata.JPG";
    src.appendChild(img);
  } else if (labeleado == "buey"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/buey.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "caballo"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/caballo.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "dragon"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/dragon.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "jabali"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/jabali.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "liebre"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/liebre.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "mono"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/mono.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "oveja"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/oveja.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "pajaro"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/pajaro.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "perro"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/perro.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "serpiente"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/serpiente.JPG";
    src.appendChild(img);
  }
  else if (labeleado == "tigre"){
    src.innerHTML = "";
    var img = document.createElement("img");
    img.src = "images/tigre.JPG";
    src.appendChild(img);
  }

 
  }


function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
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
