import { useState } from "react"
import { useContext } from "react";
import { OverlayContext } from "../CONTEXT API/OVERLAY_CONTEXT";

export const useOverlayContext = ()=>{
    return useContext(OverlayContext);
}

export const useOverlay = ()=>{
    const [overlay,setOverlay] = useState('');
    const [showOverlay,setShowOverlay] = useState(false); 
    const [customOverlayProps, setCustomOverlayProps] = useState({});


    return {
        overlay,
        setOverlay,
        showOverlay,
        setShowOverlay,
        customOverlayProps,
        setCustomOverlayProps

    }
}