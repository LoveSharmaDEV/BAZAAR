import React from 'react'
import { useOverlayContext } from '../../Hooks/overlay';
import AddProduct from './AddProduct/AddProduct';
import ChatBox from './Chat/ChatBox';
import CreatePostPopup from './CreatePostPopup/CreatePostPopupOverlay';

function Overlay(props) {
    const overlay = useOverlayContext();

    switch (overlay.overlay) {
        case 'CreatePostPopUp':
            return(<CreatePostPopup/>)

        case 'AddProduct':
            return(<AddProduct/>)
    
        case 'Chat':
            return(<ChatBox conversationID={props.data.conversationID} 
                toUser = {props.data.toUser} 
                toStore = {props.data.toStore}/>)
        default:
            return null
    }
}

export default Overlay