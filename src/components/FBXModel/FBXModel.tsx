import { MeshProps } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { FBXLoader } from "three-stdlib";

interface FBXModelProps extends MeshProps {
    url: string;
}

export default function FBXModel( {url, ...props}: FBXModelProps){
    const model = useLoader(FBXLoader, url);

    const clonedModel = useMemo(() => model.clone(), [model]);

    useEffect(() => {
        console.log(model);

    }, [model]);

    return <primitive object={clonedModel} {...props} />;
}