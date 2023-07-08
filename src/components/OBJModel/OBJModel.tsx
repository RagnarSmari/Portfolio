import { MeshProps } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { OBJLoader } from "three-stdlib";

interface OBJModelProps extends MeshProps {
    url: string;
}

export default function OBJModel( {url, ...props}: OBJModelProps){
    const model = useLoader(OBJLoader, url);

    const clonedModel = useMemo(() => model.clone(), [model]);

    return <primitive object={clonedModel} {...props} />;

}