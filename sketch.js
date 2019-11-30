let mobilenet;
let predictor;
let video;
let value = 0;
let slider;
let addButton;
let trainButton;
var images = [];

//INPUT IMAGES
(function () {
	var fileCatcher = document.getElementById('file-catcher');
  var fileInput = document.getElementById('file-input');
  var fileListDisplay = document.getElementById('file-list-display');
  
  var fileList = [];
  var renderFileList, sendFile;
  
  fileCatcher.addEventListener('submit', function (evnt) {
  	evnt.preventDefault();
    fileList.forEach(function (file) {
      console.log(file);
      predictor.addExample(file, slider.value());
    });
  });
  
  fileInput.addEventListener('change', function (evnt) {
 		fileList = [];
  	for (var i = 0; i < fileInput.files.length; i++) {
    	fileList.push(fileInput.files[i]);
    }
    renderFileList();
  });
  

})();

//END INPUT IMG

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}


// Entrenar el modelo
function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    predictor.predict(gotResults);
  } else {
    console.log(loss);
  }
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    value = result;
    predictor.predict(gotResults);
  }
}



//BOTTONES PARA ENTRENAR MODELO
function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  predictor = mobilenet.regression(video, videoReady);
  //addOtherImg = ml5.featureExtractor.addImage(input, label, imageAdded);

  slider = createSlider(0, 1, 0.5, 0.01);
  addButton = createButton('add example image');
  addButton.mousePressed(function() {
    predictor.addImage(slider.value());
  });
  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });
  saveButton = createButton('save');
  saveButton.mousePressed(function () {
    predictor.save();
  });

}


// DIBUJAR CANVAS Y RECTANGULO DE VALORES.
function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  rectMode(CENTER);
  fill(255, 0, 200);
  console.log(value);
  rect(value.value * width, height / 2, 50, 50);
  fill(255);
  textSize(16);
  text(value.value , 10, height - 10);
}
