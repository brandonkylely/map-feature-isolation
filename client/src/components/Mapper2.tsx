// references used:
// https://www.youtube.com/watch?v=1QTnMghzTyA&ab_channel=GoogleMapsPlatform
// https://github.com/leighhalliday/google-maps-threejs

// import * as dotenv from 'dotenv';
import React, { useState, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import {
  PerspectiveCamera,
  Scene,
  AmbientLight,
  WebGLRenderer,
  Matrix4,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// require('dotenv').config();
// import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
// console.log(import.meta.env)

const mapOptions = {
  mapId: import.meta.env.VITE_MAPID,
  center: { lat: 43.661036, lng: -79.391277 },
  zoom: 17,
  disableDefaultUI: true,
  heading: 25,
  tilt: 25,
};

  // @ts-ignore
export default function Mapper(props) {
  // useEffect(() => {
  //   console.log('use effect mapper function')
  //   fetch("/api/test")
  //     .then((r) => r.json())
  //     .then((d) => console.log(d));
  // }, []);
  return (
    <Wrapper apiKey={import.meta.env.VITE_APIKEY}>
      <MyMap />
    </Wrapper>
  );
}

function MyMap() {
  const overlayRef = useRef();
  const [map, setMap] = useState();
  // const [scene, setScene] = useState<Scene>(new Scene());
  // const [camera, setCamera] = useState<PerspectiveCamera>(
  //   new PerspectiveCamera()
  // );
  // const [renderer, setRenderer] = useState<WebGLRenderer>(new WebGLRenderer());
  const ref = useRef();

  useEffect(() => {
    console.log('use effect myMap')
    // useEffect gets called twice, use this to say if map exists, only call once
    if (!overlayRef.current) {
      // @ts-ignore
      const instance = new window.google.maps.Map(ref.current, mapOptions);
        // @ts-ignore
      setMap(instance);
        // @ts-ignore
      overlayRef.current = createOverlay(instance);
    }
  }, []);

  // @ts-ignore
  return <div ref={ref} id="map" />;
}

function createOverlay(
    // @ts-ignore
  map,
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  setRenderer: any
) {
  const overlay = new google.maps.WebGLOverlayView();
  let loader;
  // happens once when the overlay is created
  // threejs scene setting
  overlay.onAdd = () => {
    const light = new AmbientLight(0xffffff, 0.9);
    scene.add(light);

    loader = new GLTFLoader();
    loader.loadAsync("./scooter/scene.gltf").then((object) => {
      // group => group of lines polygons, may see different terminology
      const group = object.scene;
      group.scale.setScalar(25);
      // without repositioning, scooter is on its side and floating in the air
      group.rotation.set(Math.PI / 2, 0, 0);
      group.position.setZ(-120);
      scene.add(group);
    });
  };

  //happens only once when we have access to the webgl context
  // gl variable provided by WebGLOverlayView
  overlay.onContextRestored = ({ gl }: { gl: unknown }) => {
      // @ts-ignore
      renderer = new WebGLRenderer({
        canvas: gl.canvas,
        context: gl,
        ...gl.getContextAttributes(),
      });
    // gives us control of setting renderer before next scene
    renderer.autoClear = false;
    
// when scene is rendered, 
    // loader.manager.onLoad = () => {
    //   renderer.setAnimationLoop(() => {
    //     map.moveCamera({
    //       tilt: mapOptions.tilt,
    //       heading: mapOptions.heading,
    //       zoom: mapOptions.zoom,
    //     });

    //     if (mapOptions.tilt < 60) {
    //       mapOptions.tilt += 0.5;
    //     } else if (mapOptions.zoom < 20) {
    //       mapOptions.zoom += 0.05;
    //     } else if (mapOptions.heading < 125) {
    //       mapOptions.heading += 0.5;
    //     } else {
    //       renderer.setAnimationLoop(null);
    //     }
    //   });
    // };
  };

  // happens many times
  // transformer converts lat and lng to its location in a 3d space
  overlay.onDraw = ({ transformer }) => {
    const matrix = transformer.fromLatLngAltitude({
      lat: mapOptions.center.lat,
      lng: mapOptions.center.lng,
      altitude: 120,
    });
    camera.projectionMatrix = new Matrix4().fromArray(matrix);
    // constantly redraw whats in the camera view
    overlay.requestRedraw();
    // points the camera at the scene
    renderer.render(scene, camera);
    // good practice, not explained
    renderer.resetState();
  };
  // tells overlay which map to use
  overlay.setMap(map);

  return overlay;
}