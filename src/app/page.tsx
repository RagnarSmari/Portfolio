"use client"; // This is a client component 

import { Canvas, useFrame } from '@react-three/fiber';
import css from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Starfield from '@/components/Starfield/Starfield';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [isExploring, setisExploring] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [hasExplored, setHasExplored] = useState(false);

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
      <>
        {hasExplored ? (
            <div className="bg-white">HELLOASD ASD ASD ASD ASD </div>
        ) : (
            <div>
              <div className={css.scene}>
                <Canvas
                    shadows
                    className={css.canvas}
                    camera={{
                      fov: 60,
                      aspect: aspectRatio,
                      near: 1,
                      far: 500,
                      position: [0, 0, 200],
                    }}
                >
                  <Starfield isExploring={isExploring} setIsExploring={setisExploring} setHasExplored={setHasExplored}/>
                </Canvas>
              </div>
              <div className={css.header}>
                <h1 className="star-wars-front-text" style={{ opacity: textOpacity }}>
                  To boldly go where
                </h1>
                <h1 className="star-wars-front-text" style={{ opacity: textOpacity }}>
                  no man has gone before
                </h1>
                <button
                    className="explore-button"
                    onClick={() => setisExploring(true)}
                    style={{ opacity: textOpacity }}
                >
                  Explore
                </button>
              </div>
            </div>
        )}
      </>
  );}
