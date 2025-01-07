import * as THREE from 'three';
import React, { useRef, useMemo} from 'react'
import { useFrame } from '@react-three/fiber'





function Starfield( { ...props} : {isExploring : boolean, setIsExploring : (isExploring : boolean) => void, setHasExplored : (hasExplored : boolean) => void}){
    const meshRef = useRef<THREE.LineSegments>(null);
    const hasStoppedExploring = useRef(false);
    let LINE_COUNT = 5000;
    let SPEED = 3;
    let geom = useMemo(() => {
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(LINE_COUNT * 2 * 3), 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(new Float32Array(LINE_COUNT * 2 * 3), 3));
        let pos = geometry.getAttribute('position');
        let vel = geometry.getAttribute('velocity');
        let dir = new THREE.Vector3(0, 0, 1) 
        dir.normalize();
        dir.multiplyScalar(SPEED); 

        for(let i = 0; i < LINE_COUNT; i++){
            var y = Math.random() * 300 - 100;
            var x = Math.random() * 400 - 200;

            var z1 = Math.random() * -900; // Start from a random positive z
            var z2 = z1 + 50; // End at a small distance in positice z direction

            pos.setXYZ(i * 2, x, y, z1);
            pos.setXYZ(i * 2 + 1, x ,y ,z2);

            vel.setXYZ(i * 2, dir.x, dir.y, dir.z);
            vel.setXYZ(i * 2 + 1, dir.x, dir.y, dir.z);
        }
        return geometry;
    }, [LINE_COUNT, SPEED]);


    const mat = useMemo(() => new THREE.LineBasicMaterial({ color: 'white' }), []);

    useFrame((_, delta) => {
        if (meshRef.current) {
            const pos = geom.getAttribute('position');
            const vel = geom.getAttribute('velocity');
            const ACCELERATION_DURATION = 2;
            let starsInRange = 0;
            
            // Initialize if not initialized
            if (!meshRef.current.userData.elapsedTime) meshRef.current.userData.elapsedTime = 0;

            if (props.isExploring) {
                const elapsedTime = (meshRef.current.userData.elapsedTime += delta);
                
                if(elapsedTime < ACCELERATION_DURATION){
                    // Phase 1
                    // Increase velocity to make the stars rush toward the user's face.
                    for (let i = 0; i < LINE_COUNT; i++) {

                        let position1 = new THREE.Vector3().fromBufferAttribute(pos, i * 2);
                        let position2 = new THREE.Vector3().fromBufferAttribute(pos, i * 2 + 1);
                        let velocity = new THREE.Vector3().fromBufferAttribute(vel, i * 2);

                        velocity.multiplyScalar(1.01); // Add velocity


                        position1.add(velocity);
                        position2.add(velocity);

                        if (position1.z > 0 && position1.z < 10) starsInRange+=1;

                        if (position1.z > 10) { // Pass threshold near the camera
                            let z1 = Math.random() * -900; // Reset far back
                            let x = Math.random() * 400 - 200;
                            let y = Math.random() * 300 - 100;

                            position1.set(x, y, z1);
                            position2.set(x, y, z1 + 50); 
                        }

                        pos.setXYZ(i * 2, position1.x, position1.y, position1.z);
                        pos.setXYZ(i * 2 + 1, position2.x, position2.y, position2.z);

                        vel.setXYZ(i * 2, velocity.x, velocity.y, velocity.z);
                        vel.setXYZ(i * 2 + 1, velocity.x, velocity.y, velocity.z);
                    }
                } else {
                    // Phase 2 -- slow down to get that SW feeling
                    meshRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), -0.03);

                    mat.color.lerp(new THREE.Color('black'), 0.01);

                    if (meshRef.current.scale.length() < 0.01) {
                        props.setIsExploring(false);
                    }
                }

            } else {
                // if not exploring, in state init
                for (let i = 0; i < LINE_COUNT; i++) {
                    let position1 = new THREE.Vector3().fromBufferAttribute(pos, i * 2);
                    let position2 = new THREE.Vector3().fromBufferAttribute(pos, i * 2 + 1);

                    let velocity = new THREE.Vector3().fromBufferAttribute(vel, i * 2);

                    position1.add(velocity); // Continue velocity motion
                    position2.add(velocity);

                    // Reset positions for stars that go long
                    if (position1.z > 200) {
                        let z1 = Math.random() * -900;
                        position1.z = z1;
                        position2.z = z1 + 50;
                    }

                    pos.setXYZ(i * 2, position1.x, position1.y, position1.z);
                    pos.setXYZ(i * 2 + 1, position2.x, position2.y, position2.z);
                }
            }

            pos.needsUpdate = true; // Trigger updates 
        }
    });

    return (
        <lineSegments ref={meshRef} geometry={geom} material={mat}/>
    )
    
      


}

export default Starfield;






