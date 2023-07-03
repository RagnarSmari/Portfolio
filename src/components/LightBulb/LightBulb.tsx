import React from 'react';
import { MeshProps } from '@react-three/fiber';
function LightBulb(props : MeshProps) {
    return (
        <mesh {...props}>
            <pointLight castShadow />
            <sphereBufferGeometry args={[0.2, 30, 10]} />
            <meshPhongMaterial emissive={"yellow"} />
        </mesh>
    )
}

export default LightBulb;