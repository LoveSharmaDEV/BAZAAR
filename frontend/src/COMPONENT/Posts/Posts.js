import React, { useEffect } from 'react';
import CSS from './Posts.module.css';
import {useDispatch, useSelector} from 'react-redux'
import { APICALL_GETPOST} from '../../REDUX/REDUCERS/POSTS__REDUCER';
import PostCard from './PostCard';
import { useOverlayContext } from '../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import ReactLoading from 'react-loading';
import { BACKEND_BASE } from '../../MasterData/GlobalData';


export default function Posts(props) {
  const overlay = useOverlayContext();
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
    <div className={CSS.main}>
      <div className={CSS.createPost_div}>
        <img src={`${BACKEND_BASE}/plus.png`} className={CSS.createPost_btn} onClick={showPopUpScreen} alt='createpost'/>
      </div>
      <div className={CSS.postsScreen_div}>
        {
          posts.loading && !posts.error?
          <ReactLoading type='spin' color='blue' height={'3%'} width={'3%'} />        
          :
          posts.posts.map((post,key)=>{
            return <PostCard post={post} key={key}/>
        })
        }
      </div>
    </div>
  )
}
