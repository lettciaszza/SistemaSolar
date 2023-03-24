//Cria a cena principal adicionando os elementos lua, terra e sol

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var terra;
var transformacionTerra;
var step=0;
var steplua=0;
var mvlua=true;
var sol;

main();

function renderScene() {

	step+=0.01;
	if(mvlua) steplua+=0.015;
	else steplua-=0.01;
	terra.animar(step,steplua);
	requestAnimationFrame(renderScene);
	renderer.render(scene, camera);
}
function switchLua(){
	mvlua=!mvlua;
}
function main() {

	renderer.setClearColor(0x000000,1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = false; //no shadow casting
	renderer.setSize(window.innerWidth, window.innerHeight);

//Adiciona o sol
	sol = new Sun(6,'img/sun.jpg');
	sol.draw(scene);


//Adiciona planeta
	terra= new Planeta(4,'img/earth.jpg',25);
	sol.addPlaneta(terra);


//Adiciona a lua
	lua= new Satelite(2,'img/moon.gif',10);
	terra.addSatelite(lua);

	//Iluminação
var pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set( 0,0,0 );
pointLight.castShadow=true;
scene.add( pointLight );



// Cria a camera da cena
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);


$("#canvas").append(renderer.domElement);

renderScene();
}
