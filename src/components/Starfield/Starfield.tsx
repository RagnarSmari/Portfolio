import * as THREE from 'three';
import React, { useRef, useMemo} from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'



function Starfield( { ...props} : {isExploring : boolean, setIsExploring : (isExploring : boolean) => void}){
    const meshRef = useRef<THREE.LineSegments>(null);
    let LINE_COUNT = 10000;
    let SPEED = 2.5;
    let geom = useMemo(() => {
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(LINE_COUNT * 2 * 3), 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(new Float32Array(LINE_COUNT * 2 * 3), 3));
        let pos = geometry.getAttribute('position');
        let vel = geometry.getAttribute('velocity');
        let dir = new THREE.Vector3(0, 0, 1) // Moving towards positive z direction
        dir.normalize();
        dir.multiplyScalar(SPEED); // Apply speed



        for(let i = 0; i < LINE_COUNT; i++){
            var y = Math.random() * 300 - 100;
            var x = Math.random() * 400 - 200;

            var z1 = Math.random() * -900; // Start from a random positive z
            var z2 = z1 + 50; // End at a small distance in positice z direction

            pos.setXYZ(i * 2, x, y, z1);
            pos.setXYZ(i * 2 + 1, x ,y ,z2);;

            vel.setXYZ(i * 2, dir.x, dir.y, dir.z);
            vel.setXYZ(i * 2 + 1, dir.x, dir.y, dir.z);
        }
        return geometry;
    }, [LINE_COUNT, SPEED]);
    


    useFrame(() => {
        if (meshRef.current) {
            let pos = geom.getAttribute('position');
            let vel = geom.getAttribute('velocity');
            if (props.isExploring) {
                // Gradually decrease scale of LineSegments
                meshRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), -0.05);
          
                // Gradually change color to black
                mat.color.lerp(new THREE.Color('black'), 0.01);
          
                // If scale is small enough, stop exploring
                if (meshRef.current.scale.length() < 0.01) {
                  props.setIsExploring(false);
                }
              } else {
                // Your existing animation logic here...
                for (let i = 0; i < LINE_COUNT; i++) {
                    let velocity = new THREE.Vector3().fromBufferAttribute(vel, i * 2);
                    let position1 = new THREE.Vector3().fromBufferAttribute(pos, i * 2);
                    let position2 = new THREE.Vector3().fromBufferAttribute(pos, i * 2 + 1);
    
                    position1.add(velocity);
                    position2.add(velocity);
    
                    if (position1.z > 200) { // reset position when star gets too far
                        let z1 = Math.random() * -900;
                        position1.z = z1;
                        position2.z = z1 + 50;
                    }
    
                    pos.setXYZ(i * 2, position1.x, position1.y, position1.z);
                    pos.setXYZ(i * 2 + 1, position2.x, position2.y, position2.z);
                }
              }

            pos.needsUpdate = true;  // tell three.js to update the GPU with the new positions
        }
    });


    let mat = new THREE.LineBasicMaterial({color: 'white'});

    return (
        <lineSegments ref={meshRef} geometry={geom} material={mat}/>
    )
    
      


}

export default Starfield;





