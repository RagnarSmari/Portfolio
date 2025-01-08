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

    const STAR_COUNT = 40000; // Number of stars in the background

    // Generate the geometry for stars
    const starGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = [];

        for (let i = 0; i < STAR_COUNT; i++) {
            // Randomly distribute stars in a cubic volume
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
            size: 1, // Pixel size of each star
            sizeAttenuation: true, // Size responds to perspective
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending, // Make stars "blend" into space
        });
    }, []);

    // Add a rotation animation
    useFrame((_, delta) => {
        if (fadeIn && starMaterial.opacity < 1) {
            opacityRef.current = Math.min(opacityRef.current + delta * 0.5, 1); 
            starMaterial.opacity = opacityRef.current;
        }
        if (backgroundRef.current) {
            backgroundRef.current.rotation.y += 0.0005; // Slowly rotate the starfield
        }
    });

    return (
        <points ref={backgroundRef} geometry={starGeometry} material={starMaterial} />
    );
}