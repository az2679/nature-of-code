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


  const intPos = new Vector3(0, 100, 100);
  const vel = new Vector3(1, -1, -1);
  var pos = intPos.clone()
  pos.overwrite=true


  const [move, setMove] = useState(0);

  var frameCount = 0
  useFrame(() => {
    frameCount++
    // if (frameCount%60 > 30){
    setMove((value) => value + 1)
    // }

    // intPos.add(vel)
    // pos.set(pos.x+1, pos.y+1, pos.z+1)
    console.log(pos.add( randomInt(0,5) * randomDirection()))
  })

  useEffect(() => {
    // pos.setX (pos.x + randomInt(0,5) * randomDirection())
    pos.y = pos.y + randomInt(0,5) * randomDirection()
    pos.z = pos.z + randomInt(0,5) * randomDirection()
    // console.log(pos)


    // pos.add(vel);
    // pos.addVectors(pos,vel);


    // pos.set(intPos.add(vel).x, intPos.add(vel).y, intPos.add(vel).z)
    // pos.copy(intPos.add(vel))


    // pos.add(vel);
    // pos.set(pos.x, pos.y, pos.z);

    // intPos.clone().add(new Vector3(1, 1, 1))
    // pos.copy(intPos)

    // pos.copy(intPos.clone().add(new Vector3(1, 1, 1)))

    // pos.copy(intPos).addScalar( 0.5 )

   
    


    gsap.to(beeRef.current.position, pos);
    // gsap.to(beeRef.current.position, {
    //   x:x,
    //   y:1,
    //   z:1
    // });

      // console.log(pos)

  }, [move]);

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
    <mesh ref={beeRef} position={position ? position : [0, 100, 100]} scale={scale ? scale : 5} onUpdate={() => setMove((value) => value + 1)}>
      <sphereGeometry />
      <meshBasicMaterial color = "yellow" />
    </mesh>
    </object3D>

    </>
  );
}

export default Bee;