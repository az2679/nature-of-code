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
        <fogExp2 attach="fog" args={["#72D5F8", 0.001]} />

        <axesHelper args={[50]} />
        <Stats />


        {/* Environment map */}
        {/* <Environment preset="night" /> */}


        {/* Camera 🎥 */}
        {/* <PerspectiveCamera position={[0, 2.5, 10]} makeDefault /> */}
        <PerspectiveCamera position={[200, 100, 400]} args={[60, window.innerWidth / window.innerHeight, 0.1, 3000]} makeDefault />
        {/* <OrthographicCamera position={[200, 100, 400]} args={[window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0, 3000]} makeDefault /> */}


        {/* Controls */}
        <OrbitControls />
        {/* <MapControls enableDamping={true} dampingFactor={0.05} screenSpacePanning={false} enableRotate={true} rotateSpeed={0.3} enableZoom={true} zoomSpeed={0.5} minDistance={10} maxDistance={1000} /> */}
        {/* <FirstPersonControls movementSpeed={100} lookSpeed={0.02} /> */}


        {/* Lights 💡 */}
        <ambientLight color="#ffffff" intensity={0.8} />
        <directionalLight color="#cddafd" position={[0, 50, 100]} intensity={0.8} />
        {/* <pointLight color="green" position={[1, 1, 1]} intensity={3} />
        <pointLight color="yellow" position={[-2, 3, 1]} intensity={3} />
        <pointLight color="blue" position={[2, 3, 1]} intensity={3} />
        <pointLight color="white" position={[0, 1, 2.5]} intensity={3} /> */}


        {/* ground and sphere */}
        <mesh rotation={[-Math.PI*0.5, 0, 0]}>
          <planeGeometry args={[10000, 10000]} />
          <meshStandardMaterial color="#DEF872" roughness={0.8} metalness={0.2} side={THREE.DoubleSide} />
        </mesh>

        <mesh position={[0, 100, 0]} scale={1} >
          <torusKnotGeometry args={[10, 6, 64, 8, 1, 5]} />
          <meshPhongMaterial color="#F8729B" />
        </mesh>

        <Bee />

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
