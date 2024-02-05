import { useEffect, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { Object3D, Vector3 } from "three";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Bee(props){
  const { position, scale } = props
  const beeRef = useRef();
  const trailRef = useRef();

  const pos = new Vector3(-50, 0, 50);

  const flower = new Vector3();
  const vel = new Vector3();
  const acc = new Vector3();

  const prev = new Vector3();
  const step = new Vector3();

  vel.randomDirection();
  vel.setLength(5)

  var frameCount = 0

  useFrame(() => {
    frameCount++

  /// random walk w levy flight

  // if (frameCount%3 == 0){
    prev.copy(pos)
    step.randomDirection()

    const r = Math.random()*100
    if (r < 10){
      step.multiplyScalar(randomInt(2, 10));
      // step.stepLength(randomInt(10, 20));
    } else {
      step.setLength(1)
    }

    pos.add(step)
  // }

    // beeRef.current.position.set(pos.x, pos.y, pos.z)
    // beeRef.current.position.lerpVectors(prev, pos, 0.5)

  /// vel acc
    // if (frameCount%60 > 20){
    flower.set(beeRef.current.parent.position.x, beeRef.current.parent.position.y, beeRef.current.parent.position.z)

    acc.subVectors(flower, pos);
    acc.setLength(0.05);

    vel.add(acc);
    vel.clampLength(0, 2);

    pos.add(vel);
    // } 

    beeRef.current.position.set(pos.x, pos.y, pos.z);

  });


  return (
    <>
    <object3D>
    <mesh ref={beeRef} position={position ? position : [0, 0, 0]} scale={scale ? scale : 5} >
      <sphereGeometry />
      <meshBasicMaterial color = "yellow" />
    </mesh>
    </object3D>
    </>
  );
}

export default Bee;