import React from 'react';
import { extend, useThree} from '@react-three/fiber';
import { OrbitControls, OrbitControlsProps } from '@react-three/drei';

extend({ OrbitControls });

function Controls(props : OrbitControlsProps) {
    const { camera, gl} = useThree();
    return <OrbitControls attach={"orbitControls"} args={[ camera, gl.domElement]} {...props} />;
}

export default Controls;