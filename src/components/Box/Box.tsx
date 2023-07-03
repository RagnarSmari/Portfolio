import React from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function Box(props : MeshProps) {
    const texture = useLoader(TextureLoader, "/texture.jpeg")
    return (
        <mesh {...props} receiveShadow castShadow>
        <boxBufferGeometry />
        <meshPhysicalMaterial color={"white"} map={texture}/>
    </mesh>
    )
}

export default Box;