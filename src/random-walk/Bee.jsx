import { useEffect, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { gsap } from "gsap";

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function Bee(props){
  const { position, scale } = props
  const beeRef = useRef();
  const objectRef = useRef();

  var x = 0;
  var y = 100;
  var z = 100;

  var inc = 10

  const [move, setMove] = useState(0);

  var frameCount = 0
  useFrame(() => {
    frameCount++
    if (frameCount%60 > 30){
    setMove((value) => value + 1)
    }
  })

  useEffect(() => {
    var r = randomInt(6);

    switch (r){
      case 0:
        x = x + inc
        break;
      case 1:
        x = x - inc
        break;
      case 2:
        y = y + inc
        break;
      case 3:
        y = y - inc
        break;
      case 4:
        z = z + inc
        break;
      case 5:
        z = z - inc
        break;
    }

    // console.log(beeRef.current.position)

    gsap.to(beeRef.current.position, {
      x: x,
      y: y,
      z: z,
    });
  }, [move]);

  useEffect(() => {
    gsap.to(objectRef.current.rotation, {
    y: Math.PI * 2,
    duration: 10,
    repeat: -1,
    ease: 'none'
  });
}, [objectRef]);


  return (
    <>
    <object3D ref={objectRef}>
    <mesh ref={beeRef} position={position ? position : [0, 100, 100]} scale={scale ? scale : 5} onUpdate={() => setMove((value) => value + 1)}>
      <sphereGeometry />
      <meshBasicMaterial color = "yellow" />
    </mesh>
    </object3D>

    </>
  );
}

export default Bee;