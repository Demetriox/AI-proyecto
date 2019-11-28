let mobilenet;
let anotImagen;


function modelReady(){
	console.log("Model is Ready !!!");
	mobilenet.predict(puffin, gotResults);
}


function gotResults(error, results){
	if(error){
		console.error(error);
	} else {
		console.log(results);
		let label = results[0].label;
		let prob = results[0].confidence;
		fill(0);
		textSize(64);
		text(label, 10, height-50 );
		createP(label);
		createP(prob);
	}
}

 function imageReady(){
	image( puffin, 0,0, width, height);
 }


function setup() {
	createCanvas(650, 500);
	puffin = createImg('images/kingping.jpeg', imageReady);
	puffin.hide();	
	mobilenet = ml5.imageClassifier('MobileNet',modelReady);

}







 console.log('ml5 version:', ml5.version);
