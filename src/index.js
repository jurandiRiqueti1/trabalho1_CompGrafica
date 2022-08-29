import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
);
camera.position.set(30, 30, 50);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

//gltf
const loader = new GLTFLoader();
loader.load('../glb/wraith.glb', function(glb){
    console.log(glb);
    const root = glb.scene;
    root.position.set(0,10,0);
    scene.add(root);
}, function(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + "% loaded");
}, function(error) {
    console.log("error");
})

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff,1);
light2.position.set(-2,2,-5);
scene.add(light2);


scene.background = new THREE.CubeTextureLoader()
    .setPath('../img/')
    .load([
        'posx.jpg',
        'negx.jpg',
        'posy.jpg',
        'negy.jpg',
        'posz.jpg',
        'negz.jpg'
    ]);


const texture = new THREE.TextureLoader().load('../texture/marioblockquest.png');

const material = new THREE.MeshBasicMaterial({ map: texture });


let p1, p2, p3, p4, p5, p6, p7, p8, geometry, lines;

p1 = new THREE.Vector3(-10, -10, 10);
p2 = new THREE.Vector3(-10, 10, 10);
p3 = new THREE.Vector3(10, 10, 10);
p4 = new THREE.Vector3(10, -10, 10);
p5 = new THREE.Vector3(-10, -10, -10);
p6 = new THREE.Vector3(-10, 10, -10);
p7 = new THREE.Vector3(10, 10, -10);
p8 = new THREE.Vector3(10, -10, -10);

draw([p1, p2, p3, p4], geometry, lines, scene);
draw([p5, p6, p7, p8], geometry, lines, scene);
draw([p1, p5], geometry, lines, scene);
draw([p2, p6], geometry, lines, scene);
draw([p3, p7], geometry, lines, scene);
draw([p4, p8], geometry, lines, scene);

function draw(points, geometry, lines, scene) {
    geometry = new THREE.BufferGeometry().setFromPoints(points);
    lines = new THREE.LineLoop(geometry, material);
    scene.add(lines);
}

const controls = new OrbitControls(camera, renderer.domElement);

animate();
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();


function animate() {

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);

}



