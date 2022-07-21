import { useState } from "react"
import { useContext } from "react";
import { OverlayContext } from "../Providers/overlayContext";

export const useOverlayContext = ()=>{
    return useContext(OverlayContext);
}

export const useOverlay = ()=>{
    const [overlay,setOverlay] = useState('');
    const [showOverlay,setShowOverlay] = useState(false); 
    const [customChatProps, setCustomChatProps] = useState({});
    const [customAddProductProps, setCustomAddProductProps] = useState({});
    const [customCreatePostPopupProps, setCustomCreatePostPopupProps] = useState({});

    return {
        overlay,
        setOverlay,
        showOverlay,
        setShowOverlay,
        customChatProps,
        setCustomChatProps,
        customAddProductProps,
        setCustomAddProductProps,
        customCreatePostPopupProps,
        setCustomCreatePostPopupProps
    }
}