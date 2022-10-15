import React, { useCallback, useEffect, useState } from 'react'
import CSS from './CommentCard.module.css'
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { BACKEND_BASE, POST_API} from '../../MasterData/GlobalData';
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { CommentItem } from './CommentItem';


function CommentCard(props) {

    const [Comments, setComments] = useState([]);
    const [Comment, setComment] = useState('');

    const auth = useAuth(); 
    const {user} = auth;


    const fetchComments = useCallback( async ()=>{
        const response = await AUTHORIZED_REQ(POST_API.FETCH_COMMENT,
        {PostId:props.post._id},
        {},
        'POST');
        if(response.data.errCode==='SUCCESS'){
          setComments(response.data.comments)
        }
      },[props.post._id])


    const commentSubmit = async ()=>{
        const response = await AUTHORIZED_REQ(POST_API.UPLOAD_COMMENT,
        {PostId:props.post._id,Comment},
        {},
        'POST');
        if(response.data.errCode==='SUCCESS') setComments([...Comments,response.data.comment]);  
    }

    const toggleCommentBox = ()=>{
        props.setShowCommentBox(false);
    }

    const togglelikeComment = (commentID)=>{
        const index1 = Comments.findIndex((comment)=>comment._id===commentID);
        if(Comments[index1].like.includes(user._id)){
          let index2 = Comments[index1].like.indexOf(user._id);
          if (index2 !== -1) {
            Comments[index1].like.splice(index2, 1);
          }
        }else{
          Comments[index1].like.push(user._id)
        }
        setComments([...Comments])
      }


    useEffect(()=>{
        fetchComments();
      },[fetchComments])

  return (
        <div className={CSS.CommentBoxOverlay}>
            <div className={CSS.CommentBox}>
                <div className={CSS.CommentBoxHeader}>
                    <img onClick={toggleCommentBox} src={`${BACKEND_BASE}/close.png`} alt='Close'/>
                </div>

                <div className={CSS.CommentBoxBody}>
                {
                    Comments.map((c,key)=>{
                    return <CommentItem comment={c} togglelikeComment={togglelikeComment} key={key} />
                    })
                }
                </div>

                <div className={CSS.CommentBoxFooter}>
                <input onChange={(e)=>{setComment(e.target.value)}} type='text'/>
                <button onClick={commentSubmit} className={CSS.button54}> Add Comment!</button>
                </div>
            </div>         
        </div>
  )
}

export default CommentCard