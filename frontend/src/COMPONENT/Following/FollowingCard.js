import React from 'react'
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK'
import CSS from './FollowingCard.module.css'
import { useNavigate } from 'react-router-dom';
import { BACKEND_BASE, USER_PERSONALIZATION_API } from '../../MasterData/GlobalData';
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_STORE_ACTION } from '../../REDUX/REDUCERS/FOLLOW_REDUCER';
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST'



function FollowingCard(props) {

  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const UNFOLLOW_STORE = async ()=>
  {

    const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.NAV_UNFOLLOW_STORE, {storeId: `${props.follower._id}`},{},'POST');

    if(response.data.errCode==="SUCCESS"){
        dispatch(UNFOLLOW_STORE_ACTION(props.follower));
    }
  }

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
                <CloseButton onClick={UNFOLLOW_STORE}  className={CSS.Card__DeleteFollower}/>
                :
                null
        }
        
    </div>
  )
}

export default FollowingCard