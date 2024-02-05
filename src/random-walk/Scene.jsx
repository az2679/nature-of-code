import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { Stats, OrbitControls, MapControls, FirstPersonControls } from '@react-three/drei'

import Bee from './bee';

function Scene() {
  return (
    <div id="canvas_wrapper">
      <Canvas shadows={true}>
        {/* <color args={["grey"]} attach="background" /> */}
        <color args={["#62CDFF"]} attach="background" />
        <fogExp2 attach="fog" args={["#3fb6f2", 0.0005]} />

        <axesHelper args={[50]} />
        <Stats />

        {/* Camera 🎥 */}
        <PerspectiveCamera position={[200, 100, 400]} args={[60, window.innerWidth / window.innerHeight, 0.1, 3000]} makeDefault />

        {/* Controls */}
        <OrbitControls />

        {/* Lights 💡 */}
        <ambientLight color="#ffffff" intensity={0.8} />
        <directionalLight color="#cddafd" position={[0, 50, 100]} intensity={0.8} />

        <mesh rotation={[-Math.PI*0.5, 0, 0]}>
          <planeGeometry args={[10000, 10000]} />
          <meshStandardMaterial color="#00a30b" roughness={0.9}/>
          {/* <meshBasicMaterial color="#00a30b" /> */}
        </mesh>

        <mesh position={[0, 100, 0]} scale={1} >
          <torusKnotGeometry args={[10, 6, 64, 8, 1, 5]} />
          <meshPhongMaterial color="#F8729B" />
          <Bee />
        </mesh>



      {/* sphere inside box */}
        {/* <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[5, 5, 5]} />
          <meshPhysicalMaterial side={THREE.BackSide} />
        </mesh>

        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry />
          <meshPhysicalMaterial roughness={0.3} metalness={0.6} />
        </mesh> */}


        {/* Objects 📦 */}
        <Suspense fallback={null}>
        </Suspense>

      </Canvas>
    </div>
  );
}

export default Scene;
