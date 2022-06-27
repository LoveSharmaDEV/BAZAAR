import React from 'react'
import makeRequest from '../../Commons/makeRequest';
import { useAuth } from '../../Hooks';
import CommentsCss from './Comments.module.css'

export const Comments = (props) => {
    const auth = useAuth(); 
    const {user} = auth;
    const togglelike = async ()=>{
        if(props.comment.like.includes(user._id))
        {

          const response = await makeRequest('http://localhost:8000/post/comment/togglelike',
          {CommentId:props.comment._id,action:'dislike'},
          'POST');
          
          if(response.data.errCode==='SUCCESS')
          {
            props.togglelikeComment(props.comment._id)
          };
        }else{
          const response = await makeRequest('http://localhost:8000/post/comment/togglelike',
          {CommentId:props.comment._id,action:'like'},
          'POST');

          if(response.data.errCode==='SUCCESS') 
          {
            props.togglelikeComment(props.comment._id)
          }
        }
    }


  return (
    <div className={CommentsCss.CommentOuterBody}>
        <h4>{props.comment.user.username}</h4>
        <span> {props.comment.comment} </span>
        {
            props.comment.like?
              props.comment.like.includes(user._id) ?
              <img onClick={togglelike}  src='http://localhost:8000/heart.png' alt='heart'/>
              :
              <img onClick={togglelike} src='http://localhost:8000/emptyheart.png' alt='empty heart'/>
            :
            null
        }
    </div>
  )
}
