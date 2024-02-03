import { useEffect, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { Vector3 } from "three";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Bee(props){
  const { position, scale } = props
  const beeRef = useRef();
  const objectRef = useRef();

  const pos = new Vector3(0, 100, 100);
  const prev = new Vector3();

  // const [move, setMove] = useState(0);

  // var frameCount = 0
  useFrame(() => {
    // frameCount++
    // if (frameCount%60 > 30){
    // setMove((value) => value + 1)

    prev.copy(pos)

    const step = new Vector3();
    step.randomDirection()
    // step.multiplyScalar(20)

    const r = Math.random()*100
    if (r < 100){
      step.multiplyScalar(randomInt(2, 10));
    } else {
      step.setLength(2)
    }

    pos.add(step)

  //not seeing too much of a difference
    // beeRef.current.position.set(pos.x, pos.y, pos.z)
    // beeRef.current.position.lerp(pos, 1)
    beeRef.current.position.lerpVectors(prev, pos, 0.5)

    console.log(step)


        // }
  })


//   useEffect(() => {
//     gsap.to(objectRef.current.rotation, {
//     y: Math.PI * 2,
//     duration: 10,
//     repeat: -1,
//     ease: 'none'
//   });
// }, [objectRef]);


  return (
    <>
    <object3D ref={objectRef}>
    <mesh ref={beeRef} position={position ? position : [0, 100, 100]} scale={scale ? scale : 5} >
      <sphereGeometry />
      <meshBasicMaterial color = "yellow" />
    </mesh>
    </object3D>

    </>
  );
}

export default Bee;