"use client"; // This is a client component 

import { Canvas, useFrame } from '@react-three/fiber';
import css from '../styles/Home.module.css';
import Floor from '@/components/Floor/Floor';
import LightBulb from '@/components/LightBulb/LightBulb';
import Box from '@/components/Box/Box';
import { OrbitControls } from '@react-three/drei';
import Draggable from '@/components/Draggable/Draggable';
import { Suspense, useEffect, useState } from 'react';
import Stars from '@/components/Stars/Stars';
import Sidebar from '@/components/Sidebar/Sidebar';
import Starfield from '@/components/Starfield/Starfield';
// import Sidebar from '@/components/Sidebar/Sidebar';
import { useRouter } from 'next/navigation';
import OBJModel from '@/components/OBJModel/OBJModel';
import { FBXLoader } from 'three-stdlib';
import FBXModel from '@/components/FBXModel/FBXModel';

export default function Home() {
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [isExploring, setisExploring] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);

  const router = useRouter();
  useEffect(() => {
    setAspectRatio(window.innerWidth / window.innerHeight);
    if (isExploring) {
      setTextOpacity(0);
    } else {
        setTextOpacity(1);
    }
  }, [isExploring]);
  
  return (
    <body>
      <div className={css.scene}>
        <Canvas
        shadows
        className={css.canvas}
        camera={{
          fov: 60,
          aspect: aspectRatio,
          near: 1,
          far: 500,
          position: [0,0, 200]
        }}>
          {/* <ambientLight color={"white"} intensity={0.2}/> */}
          {/* <ambientLight intensity={0.5}/> */}
          {/* <LightBulb position={[0, 20, 0]} />
          <Draggable setOrbitEnabled={setOrbitEnabled}>
            <Suspense fallback={null}>
              <Box />
            </Suspense>
          </Draggable> */}
          {/* <Stars /> */}
          <Starfield isExploring = {isExploring} setIsExploring={setisExploring}/>
          {/* <SingleLine /> */}
          {/* <Sidebar /> */}
          {/* <OrbitControls enabled={orbitEnabled} /> */}
          {/* <Floor position={[0, -1, 0]}/> */}
          {/* <Suspense fallback={null}>
            <FBXModel url="models/x-wing.fbx" position={[0, 0, 0]} />
          </Suspense> */}
        </Canvas>
      </div>
      <div className={css.header}>
        <h1 className={css.text} style={{opacity: textOpacity}}>
          To boldly go where
        </h1>
        <h1 className={css.text} style={{opacity: textOpacity}} >
          no man has gone before
        </h1>
        <button className={css.button} onClick={() => setisExploring(true)} style={{opacity: textOpacity}}>Explore</button>
      </div>
    </body>

  )
}
