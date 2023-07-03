import { TextureLoader, MeshBasicMaterial, Vector3, Vector2, Camera } from "three";
import { useLoader } from '@react-three/fiber';
import { Plane } from "@react-three/drei";
import * as THREE from 'three';
import './styles.css';
function Sidebar() {

    return (
        <div className="grid grid-cols-1 grid-rows-4 bg-black justify-items-end text-white text-cener pr-20">
            <button className="border-white border-2">About me</button>
            <button className="border-white border-2">Previous jobs</button>
            <button className="border-white border-2">Projects</button>
            <button className="border-white border-2">Contact me</button>
        </div>
    )
}

export default Sidebar;