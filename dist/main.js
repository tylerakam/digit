import './style.css'
import javascriptLogo from '../javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from '../counter.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from "three/addons/loaders/FontLoader.js";
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector('#counter'))
// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const geometry = new THREE.BoxGeometry(10, 10, 10);

//set the color of the basic material in the object parameters `{}`

const material = new THREE.MeshBasicMaterial( { color: 0xFF6347 } );

const cube = new THREE.Mesh( geometry, material );



// new object

const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x2c778f });
const icoMesh = new THREE.Mesh(ico, icoMaterial);



// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -400);

scene.add(pointLight);
scene.add(ambientLight);

scene.add(icoMesh);

icoMesh.position.z= -15;
icoMesh.position.x= 15;
// add cube
scene.add( cube );

cube.position.z = -15;
cube.position.x = -15;

cube.rotation.x = 2;
cube.rotation.y = .5;

animate();
function animate() {
    requestAnimationFrame( animate );
    // slowly rotate the cube:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // rotate the icosahedron a little faster in the opposite direction:
    icoMesh.rotation.z += -0.03
    icoMesh.rotation.y += -0.03
    // ALLOWS YOUR ORBIT CONTROLS TO UPDATE LIVE IN REAL-TIME:
    // controls.update()
// rotate the smiley sphere on the Y axis:
//     smileMesh.rotation.y += 0.05

    renderer.render( scene, camera );
}
renderer.render(scene, camera);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);

scene.add(lightHelper)

const gridHelper = new THREE.GridHelper(200,50);

scene.add(gridHelper)

// Orbit Control

const controls = new OrbitControls(camera, renderer.domElement)

// Background

const spaceTexture = new THREE.TextureLoader().load('images/carpet.png')

scene.background = spaceTexture;


// Object texture mapping

const smileTexture = new THREE.TextureLoader().load('images/face.png')

const sphereGeometry = new THREE.SphereGeometry( 10, 22, 10 );

const smileMaterial = new THREE.MeshBasicMaterial({map: smileTexture})

const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);

scene.add(smileMesh);

// trying to make text appear
const loader = new FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

    const geometry = new TextGeometry( 'Welcome to the Arcade!', {
        font: font,
        size: 300,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    } );
} );

scene.add(TextGeometry);
    TextGeometry.position.x = 10
    TextGeometry.position.y = 10
    TextGeometry.position.z =10