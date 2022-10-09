import React from 'react'
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import CSS from './Comments.module.css'
import { BACKEND_BASE, POST_API } from '../../MasterData/GlobalData';

export const CommentItem = (props) => {
    const auth = useAuth(); 
    const {user} = auth;
    const togglelike = async ()=>{
        if(props.comment.like.includes(user._id))
        {

          const response = await AUTHORIZED_REQ(POST_API.COMMENT_TOGGLELIKE,
          {CommentId:props.comment._id,action:'dislike'},
          {},
          'POST');
          
          if(response.data.errCode==='SUCCESS')
          {
            props.togglelikeComment(props.comment._id)
          };
        }else{
          const response = await AUTHORIZED_REQ(POST_API.COMMENT_TOGGLELIKE,
          {CommentId:props.comment._id,action:'like'},
          {},
          'POST');

          if(response.data.errCode==='SUCCESS') 
          {
            props.togglelikeComment(props.comment._id)
          }
        }
    }


  return (
    <div className={CSS.CommentOuterBody}>
        <h4>{props.comment.user.username}</h4>
        <span> {props.comment.comment} </span>
        {
            props.comment.like?
              props.comment.like.includes(user._id) ?
              <img onClick={togglelike}  src={`${BACKEND_BASE}/heart.png`} alt='heart'/>
              :
              <img onClick={togglelike} src={`${BACKEND_BASE}/emptyheart.png`} alt='empty heart'/>
            :
            null
        }
    </div>
  )
}
