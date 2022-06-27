import { useState } from "react"
import { useContext } from "react";
import { OverlayContext } from "../Providers/overlayContext";

export const useOverlayContext = ()=>{
    return useContext(OverlayContext);
}

export const useOverlay = ()=>{
    const [overlay,setOverlay] = useState('');
    const [showOverlay,setShowOverlay] = useState(false); 
    return {
        overlay,
        setOverlay,
        showOverlay,
        setShowOverlay
    }
}