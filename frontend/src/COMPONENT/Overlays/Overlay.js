import React from 'react'
import { useOverlayContext } from '../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import AddProduct from './AddProduct/AddProduct';
import ChatBox from './Chat/ChatBox';
import CreatePostPopup from './CreatePostPopup/CreatePostPopupOverlay';
import StoreManageGridElementUpdate from './StoreManageGridElementUpdate/StoreManageGridElementUpdate';

function Overlay(props) {
    const overlay = useOverlayContext();

    switch (overlay.overlay) {
        case 'CreatePostPopUp':
            return(<CreatePostPopup/>)

        case 'AddProduct':
            return(<AddProduct setBarVisibility={props.setBarVisibility} />)
    
        case 'Chat':
            return(<ChatBox conversationID={props.data.conversationID} 
                toUser = {props.data.toUser} 
                toStore = {props.data.toStore}/>)
        case 'ProductUpdate':
            return(<StoreManageGridElementUpdate setUpdateForm={props.data.setUpdateForm} product={props.data.product}/>)
        default:
            return null
    }
}

export default Overlay