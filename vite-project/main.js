import * as THREE from 'three';
import "./style.css"
import gsap from "gsap";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

//scene
const scene = new THREE.Scene();

// create our ball (sphere)
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: "#FE8B9D",
    roughness: 0.5,
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes of the viewport
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}


// light
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(0, 10, 10);
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20
scene.add(camera);


// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5


// resize - add event listener for windows
window.addEventListener('resize', () => {
    // update sizes
    //console.log(window.innerWidth, window.innerHeight);
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

// keep the sphere not squishy when moving the browser size
const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()

// timeline magicccc
const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity: 0}, {opacity: 1})


// mouse animation colourrrr
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', (e) => (mouseDown = true))
window.addEventListener('mouseup', (e) => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150
        ];
        // let's animate
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(mesh.material.color, {
            r: newColor.r,
            g: newColor.g,
            b: newColor.b
        })
    }
})