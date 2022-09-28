import { createContext } from "react"
import { useOverlay } from "../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK";

const initialState = {
    setOverlay : ()=>{},
    setShowOverlay: ()=>{},
    overlay: '',
    showOverlay:false,
    customOverlayProps:()=>{},
    setCustomOverlayProps:()=>{}

}



export const OverlayContext = createContext(initialState);

export const OverlayProvider = ({children})=>{
    const overlay = useOverlay();
    return <OverlayContext.Provider value={overlay}>{children}</OverlayContext.Provider>
}