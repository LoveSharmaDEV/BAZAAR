import { createContext } from "react"
import { useOverlay } from "../Hooks/overlay";

const initialState = {
    setOverlay : ()=>{},
    setShowOverlay: ()=>{},
    overlay: '',
    showOverlay:false,
    customChatProps:{},
    customAddProductProps:{},
    customCreatePostPopupProps:{},
    setCustomChatProps:()=>{},
    setCustomAddProductProps:()=>{},
    setCustomCreatePostPopupProps:()=>{}
}



export const OverlayContext = createContext(initialState);

export const OverlayProvider = ({children})=>{
    const overlay = useOverlay();
    return <OverlayContext.Provider value={overlay}>{children}</OverlayContext.Provider>
}