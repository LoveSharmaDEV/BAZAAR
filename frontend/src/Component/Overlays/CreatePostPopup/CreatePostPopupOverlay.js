import React, { useRef, useState } from 'react'
import { useAuth } from '../../../Hooks';
import CreatePostPopupCss from './CreatePostPopupOverlay.module.css'
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../../Commons/makeRequest'
import { add_to_post } from '../../../Redux/Reducers/fetchPost_reducer';
import { useDispatch } from 'react-redux';
import { useOverlayContext } from '../../../Hooks/overlay';
import { useChatSocketContext } from '../../../Hooks/chatSocket';

function CreatePostPopup(props) {
  const auth = useAuth();
  const formref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const overlay = useOverlayContext();
  const chatSocket = useChatSocketContext();
  const [postData, setPostData] = useState({
    postPic:[],
    postName:'',
    postDescription:'',
    postPrice:'',
    like:[]
  });
  

  const encodeImagetoBase64 = (files)=>{
    const ImageList = [];
    Array.from(files).forEach((file)=>{
      const reader = new FileReader();
      reader.onload = function () {
        ImageList.push(reader.result);
        if(ImageList.length === files.length)
        {
          setPostData({
            ...postData,
            postPic:[...postData.postPic,...ImageList]
          })
        }
      }
      reader.readAsDataURL(file);
    })

  }

  const formPostData = (e)=>{
    if(e.target.files)
    {
      encodeImagetoBase64(e.target.files);
    }
    else{
      setPostData({
        ...postData,
        [e.target.name]:e.target.value,
        user:auth.user._id
      })
    }
  }


  const postSubmit= async (e)=>{
    e.preventDefault();
    if(!formref.current.checkValidity()){
      formref.current.reportValidity()
      return;
    }
    const response = await makeRequest('http://localhost:8000/upload/post' ,postData,"POST");
    if(response.data.errCode==="UNAUTHORIZED"){
      auth.logout();
      navigate('/login')
    }
    else if(response.data.errCode==="SUCCESS"){
      chatSocket.socket.emit('UpdatePostChangeStream', {user:auth.user._id});
      dispatch(add_to_post(postData));
      overlay.setShowOverlay(false);
    }

  }

  const DeleteImage = (e)=>{
    postData.postPic.splice(e.target.dataset.deleteimageindex,1);
    setPostData({
      ...postData,
      postPic:[...postData.postPic]
    })
    
  }

  const crossClick = ()=>{
    overlay.setShowOverlay(false)
  }
  return (
    <div className={CreatePostPopupCss.createPost_main}>
        <form ref={formref} className={CreatePostPopupCss.createPost_form} onChange={formPostData}>
            <img onClick={crossClick} className={CreatePostPopupCss.cross_btn} src='http://localhost:8000/close.png' alt="Close Button"/>
            <div className={CreatePostPopupCss.createPost_ImageContainer}>
            <div className={CreatePostPopupCss.createPost_ImagePanel}>
                {
                  postData.postPic.map((image,key)=>{
                      return <div className={CreatePostPopupCss.Image} key={`post-${key}`}>
                                <img src={image} key={key} alt={`post-${key}`}/>
                                <div className={CreatePostPopupCss.ImageDelete} data-deleteimageindex={key} onClick={DeleteImage}>
                                  <img style={{height:'2rem' ,width:'2rem'}} src='http://localhost:8000/close.png' alt=''/>
                                </div>
                             </div>
                  })
                }
              </div>
              <input name='postPic' type='file' multiple/>
              <img className={CreatePostPopupCss.createPost_ImageUploadIcon} src='http://localhost:8000/upload.png' alt="Upload" />
            </div>
            <div className={CreatePostPopupCss.createPost_DetailContainer}>
              <input name="postName" placeholder='Title' type='text' autoComplete='off' required/> 
              <input name="postPrice" placeholder='Price' type='text' autoComplete='off' required/>           
              <textarea name="postDescription" placeholder='Description' minlength="60" rows="5" cols="30">
              </textarea>
              <button onClick={postSubmit} className={CreatePostPopupCss.button54}>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default CreatePostPopup