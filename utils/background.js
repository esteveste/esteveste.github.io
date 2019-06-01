'use strict';
var canvas = document.querySelector("canvas");
var width = canvas.clientWidth;
var height = canvas.clientHeight;

var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10000);
var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10000, 10000 );

var renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setClearColor(0x000000);

//for css variables
var bodyStyles = window.getComputedStyle(document.body);

var g1 = new THREE.BoxGeometry(64, 64, 64);
var g3 = new THREE.BoxGeometry(32, 32, 32);
var g2 = new THREE.SphereGeometry(32, 8, 8);


var m1 = new THREE.MeshBasicMaterial({ 
  color: 0x00c9fa, 
  wireframe: false,
});
var m2 = new THREE.MeshBasicMaterial({ 
  color: 0x00e5b7, 
  wireframe: false,
});
var m3 = new THREE.MeshBasicMaterial({ 
  color: 0x00c9fa, 
  wireframe: true,
});
var m4 = new THREE.MeshBasicMaterial({ 
  color: 0x00e5b7, 
  wireframe: true,
});
// var cube = new THREE.Mesh(geometry, material);
// // cube.position.set(0,0,0);
// scene.add(cube);


var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.enableRotate=false;

camera.position.z = 1000;

var particleCount=Math.round((1/60)*(width+height));
// var particleCount=100;
console.log("Particle count:",particleCount)
var particles = [];

var geometries=[g1,g3]
var materials=[m1,m2,m3,m4]

for (let i = 0; i < particleCount; i++) {
  let geometry = geometries[Math.floor(Math.random() * geometries.length)];
  let material = materials[Math.floor(Math.random() * materials.length)];

  particles[i]= new THREE.Mesh(geometry,material);

  //randomize positions
  particles[i].position.x = Math.random() * window.innerWidth * 2 - window.innerWidth;;
  particles[i].position.y = Math.random() * window.innerHeight * 2 - window.innerHeight;
  particles[i].position.z = Math.random() * window.innerWidth * 2 - window.innerWidth;

  particles[i].direction = {
    x: Math.random(),
    y: Math.random()
  }
  scene.add(particles[i]);

}
// 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, 
// frustumSize / 2, frustumSize / - 2, 150, 1000




// function resize() {
//   var width = canvas.clientWidth;
//   var height = canvas.clientHeight;
//   if (width != canvas.width || height != canvas.height) {
//     renderer.setSize(width, height, false);
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
//   }
// }


//ortho camera
function resize() {
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;

  renderer.setSize(width, height, false);

  camera.left = - width /2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = - height / 2;
  camera.updateProjectionMatrix();
}


// function onMouseMove(event) {
//   let mouseX = event.clientX - window.innerWidth / 2;
//   let mouseY = event.clientY - window.innerHeight / 2;
//   camera.position.x += (mouseX - camera.position.x) * 0.05;
//   camera.position.y += (mouseY - camera.position.y) * 0.05;
//   //set up camera position
//   // camera.lookAt(scene.position);
// };

// document.addEventListener('mousemove', onMouseMove, false);



const cardMove = ()=>getSliderWidth()/(projectsList.length-1);//from MainCard.js

const rotateConst = width<750?1:0.5;

function render(time) {
    // time *= 0.001;
    resize();
    // cube.rotation.x = time;
    // cube.rotation.y = time * 0.31;
    let sliderDist=-parseInt($(".cards-container").css("left"));
    sliderDist?controls.setRotateLeft(rotateConst*sliderDist/cardMove()):controls.setRotateLeft(0);
    controls.update();
    // console.log(sliderDist)

    for (var i = 0; i < particleCount; i++) {
      particles[i].position.x += particles[i].direction.x ;
      particles[i].position.y += particles[i].direction.y ;

      // if edge is reached, bounce back
      if (particles[i].position.x < -window.innerWidth ||
      particles[i].position.x > window.innerWidth) {
        particles[i].direction.x = -particles[i].direction.x;
      }
      if (particles[i].position.y < -window.innerHeight ||
      particles[i].position.y > window.innerHeight) {
        particles[i].direction.y = -particles[i].direction.y;
      }
    }


	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
render();