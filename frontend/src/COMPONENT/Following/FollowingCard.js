import React from 'react'
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK'
import FollowingCardCss from './FollowingCard.module.css'
import { useNavigate } from 'react-router-dom';
import { BACKEND_BASE } from '../../MasterData/GlobalData';


function FollowingCard(props) {

  const auth = useAuth();
  const navigate = useNavigate();

  const navigateToStore = ()=>{
    navigate(`/store/${props.follower.storeName}`)
  }

  return (
    <div className={FollowingCardCss.Card}>
        <div className={FollowingCardCss.Card__StoreImage}>
            <img 
            src={props.follower.storePic?`${BACKEND_BASE}/${props.follower.storePic}`:`${BACKEND_BASE}/DefaultStorePic.png`} 
            alt=''
            />
        </div>
        <span className={FollowingCardCss.Card__StoreName}>{props.follower.storeName}</span>
        <button onClick={navigateToStore} className={FollowingCardCss.button66}> GO TO STORE</button>

        {
            auth.user._id !== props.follower.owner?
                <img 
                className={FollowingCardCss.Card__DeleteFollower} 
                src={`${BACKEND_BASE}/delete.png`} 
                alt=''
                />
                :
                null
        }
    </div>
  )
}

export default FollowingCard