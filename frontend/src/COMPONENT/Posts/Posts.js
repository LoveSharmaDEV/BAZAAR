import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { APICALL_GETPOST} from '../../REDUX/REDUCERS/POSTS__REDUCER';
import { useOverlayContext } from '../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import ReactLoading from 'react-loading';
import { BACKEND_BASE } from '../../MasterData/GlobalData';
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import PostCard from './PostCard';
import CSS from './Posts.module.css';




export default function Posts(props) {
  const overlay = useOverlayContext();
  const auth = useAuth();
  const posts = useSelector((state)=>{
    return state.posts
  }) 
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(APICALL_GETPOST());
  },[ dispatch])



  const showPopUpScreen = ()=>{
    overlay.setOverlay('CreatePostPopUp')
    overlay.setShowOverlay(true);
  }
  
  useEffect(()=>{
    props.setBarVisibility(
      {
        rightNavBarVisibility:true,
        leftNavBarVisibility:true,
        topNavBarVisibility:true,
        EcomNavBarVisibility:false
      }
    );
  },[ ])

  return (
    <div className={CSS.OuterContainer}>

      <div className={CSS.OuterContainer__CreatePost}>

        {
          auth.user.role==='SELLER'?
          <img src={`${BACKEND_BASE}/plus.png`} className={CSS.CreatePost__BTN} onClick={showPopUpScreen} alt='createpost'/>
          :
          null    
        }

      </div>
      <div className={CSS.OuterContainer__PostList}>

        {
          posts.loading && !posts.error?
            <ReactLoading type='spin' color='blue' height={'3%'} width={'3%'} />        
            :
            posts.posts.length!==0?
                posts.posts.map((post,key)=>
                {
                  return <PostCard post={post} key={key}/>
                })
                :
                <span className={CSS.PostList__NoFeeds}>YOUR FEEDS ARE EMPTY <br/> FOLLOW A STORE TO GET STARTED</span>
        }


      </div>
    </div>
  )
}
