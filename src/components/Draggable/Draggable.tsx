import React, { useRef, useEffect } from 'react';
import { extend, useThree } from '@react-three/fiber';
import { Group } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

extend({ DragControls });

function Draggable(props: any) {
  const { camera, gl } = useThree();
  const groupRef = useRef<Group | null>(null);
  const controlsRef = useRef<DragControls>();

  useEffect(() => {
    if (groupRef.current) {
      controlsRef.current = new DragControls(groupRef.current.children, camera, gl.domElement);
      controlsRef.current.addEventListener("hoveron", () => {
        props.setOrbitEnabled(false);
      });
      controlsRef.current.addEventListener("hoveroff", () => {
        props.setOrbitEnabled(true);
      });
    }

    return () => {
      controlsRef.current?.dispose();
    };
  }, [camera, gl.domElement, props]);

  return (
    <group ref={groupRef}>
      {props.children}
    </group>
  )
}

export default Draggable;
