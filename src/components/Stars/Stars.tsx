import { useRef, useMemo } from "react";
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
    let group = useRef(new THREE.Group());
    let theta = 0;

    useThree(() => {
        if(group.current) {
            const r = 5 * Math.sin(THREE.MathUtils.degToRad((theta += 0.01)));
            const s = Math.cos(THREE.MathUtils.degToRad(theta * 2));
            group.current.rotation.set(r, r, r);
            group.current.scale.set(s, s, s);
        }
    });

    const [geo, mat, coords] = useMemo(() => {
        const geo = new THREE.SphereGeometry(1, 5, 5);
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color("lightpink")
        });
        const coords = new Array(1000)
            .fill(undefined)
            .map(i => [
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            ]);
        return [geo, mat, coords];
      }, []);

    return (
        <group ref={group}>
            {coords.map(([p1, p2, p3], i) => (
                <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]}/>
            ))}
            
        </group>
    ) 
}

export default Stars;