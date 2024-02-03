import { useEffect, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { gsap } from "gsap";
import { Vector3 } from "three";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

function Bee(props){
  const { position, scale } = props
  const beeRef = useRef();
  const objectRef = useRef();

  const pos = new Vector3(0, 100, 100);
  const vel = new Vector3();

  const [move, setMove] = useState(0);

  var frameCount = 0
  useFrame(() => {
    frameCount++
    if (frameCount%60 > 30){
    setMove((value) => value + 1)
    }


  })

  useEffect(() => {
    const step = new Vector3();
    step.randomDirection()
    step.multiplyScalar(10)

    pos.add(step)

    // beeRef.current.position.set(pos.x, pos.y, pos.z)
    beeRef.current.position.lerp(pos, 1)

    // console.log(beeRef.current.position)
  }, [move])

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