import React from 'react'
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK'
import CSS from './FollowingCard.module.css'
import { useNavigate } from 'react-router-dom';
import { BACKEND_BASE } from '../../MasterData/GlobalData';
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton';



function FollowingCard(props) {

  const auth = useAuth();
  const navigate = useNavigate();

  const navigateToStore = ()=>{
    navigate(`/store/${props.follower.storeName}`)
  }

  return (
    <div className={CSS.Card}>
        <div className={CSS.Card__StoreImage}>
            <img 
            src={props.follower.storePic?`${BACKEND_BASE}/${props.follower.storePic}`:`${BACKEND_BASE}/DefaultStorePic.png`} 
            alt=''
            />
        </div>
        <span className={CSS.Card__StoreName}>{props.follower.storeName}</span>
        <Button onClick={navigateToStore} variant="primary" size='lg'>GO TO STORE</Button>

        {
            auth.user._id !== props.follower.owner?
                <CloseButton  className={CSS.Card__DeleteFollower}/>
                :
                null
        }
        
    </div>
  )
}

export default FollowingCard