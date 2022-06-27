import React from 'react'
import { useOverlayContext } from '../../Hooks/overlay';
import AddProduct from './AddProduct/AddProduct';
import CreatePostPopup from './CreatePostPopup/CreatePostPopupOverlay';

function Overlay() {
    const overlay = useOverlayContext();

    switch (overlay.overlay) {
        case 'CreatePostPopUp':
            return(<CreatePostPopup/>)

        case 'AddProduct':
            return(<AddProduct/>)
    
        default:
            return null
    }
}

export default Overlay