import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { Points, PointsMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

export interface SpaceBackgroundProps {
    fadeIn: boolean
}


export default function SpaceBackground({ fadeIn } : SpaceBackgroundProps) {
    const backgroundRef = useRef<Points>(null);
    const opacityRef = useRef(0);
    const zPosMin = -2000 / 2
    const zPosMax = 2000 / 2

    const STAR_COUNT = 100000; 

    const starGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = [];

        for (let i = 0; i < STAR_COUNT; i++) {

            const x = THREE.MathUtils.randFloatSpread(2000);
            const y = THREE.MathUtils.randFloatSpread(2000);
            const z = THREE.MathUtils.randFloatSpread(2000);

            positions.push(x, y, z);
                
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        return geometry;
    }, [STAR_COUNT]);

    // Material for the stars
    const starMaterial = useMemo(() => {
        return new THREE.PointsMaterial({
            size: 1, 
            sizeAttenuation: true, 
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending, 
        });
    }, []);

    useFrame((_, delta) => {
        if (fadeIn && starMaterial.opacity < 1) {
            opacityRef.current = Math.min(opacityRef.current + delta * 0.5, 1); 
            starMaterial.opacity = opacityRef.current;
        }
        if (backgroundRef.current) {
            backgroundRef.current.rotation.y += 0.0005; // Slowly rotate 
        }
    });

    return (
        <points ref={backgroundRef} geometry={starGeometry} material={starMaterial} />
    );
}