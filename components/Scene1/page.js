"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextureLoader } from "three";
function Scene1({ texture, widthValue, heightValue }) {
  let setup;
  const textureLoader = new TextureLoader();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  //   const controls = new OrbitControls(camera, renderer.domElement);
  //   controls.enableDamping = true;
  //   controls.dampingFactor = 0.05;

  //   const axis = new THREE.AxesHelper(20);
  //   scene.add(axis);

  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  //   const grid = new THREE.GridHelper();
  //   scene.add(grid);

  const pointLight = new THREE.PointLight("white");
  pointLight.power = 3500;
  scene.add(pointLight);
  pointLight.position.set(3, 10, 0);
  const pointLightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(pointLightHelper);

  //   const pointLight2 = new THREE.PointLight("white");
  //   pointLight2.power = 1500;
  //   scene.add(pointLight2);
  //   pointLight2.position.set(-6, 5, 0);
  //   const pointLightHelper2 = new THREE.PointLightHelper(pointLight2);
  //   scene.add(pointLightHelper2);

  // useEffect(() => {
  //   document.getElementById("canvas").appendChild(renderer.domElement);
  // }, []);

  const loader = new GLTFLoader();

  loader.load("/final_room.glb", (gltf) => {
    const model = gltf.scene;
    setup = model;
    // console.log("pp",setup)
    scene.add(setup);
    setup.position.set(0, 1, 0);
    // setup.scale.set(0.1, 0.1, 0.1);
    // setup.children[9].material.map = textureLoader.load("/404.webp");
    setup.children[9].material.map = textureLoader.load({texture});
    // setup.children[10].children[0].children[0].children[0].material.map =
    //   textureLoader.load(texture);
  });

  function animate() {
    // if(setup){
    //   setup.rotation.y+=.01
    // }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  camera.position.set(9, 5, 5);
  camera.lookAt(0, 0, 0); // Look at the center of the scene

  //   const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth/2, window.innerHeight/2);
  // renderer.setRenderTarget(renderTarget);
  // renderer.render(scene, camera);
  // const dataURL = renderer.toDataURL();

  // const imgElement = document.createElement('img');
  // imgElement.src = dataURL;
  // document.body.appendChild(imgElement);
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(1); // Update the state to trigger re-render
  };
  setTimeout(() => {
    // console.log("pop")
    handleClick();
  }, 2000);
  const [src, setSrc] = useState("");
  setTimeout(() => {
    const imgData = renderer.domElement.toDataURL("image/png", 1);
    if (count == 1) {
      // console.log("hbhf",imgData)
      setSrc(imgData);
    }
  }, 2000);
  

  return (
    <div>
      {/* <input
        onChange={handleSliderChange}
        type="range"
        value={val}
      /> */}
      <img id="" src={src} alt="ffff" />

      {/* <div id="canvas"></div> */}
    </div>
  );
}

export default Scene1;
