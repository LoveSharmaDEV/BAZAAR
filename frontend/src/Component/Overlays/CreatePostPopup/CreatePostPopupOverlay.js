import React, { useRef, useState } from 'react'
import { useAuth } from '../../../Hooks';
import css from './CreatePostPopupOverlay.module.css'
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../../Commons/makeRequest'
import { add_to_post } from '../../../Redux/Reducers/fetchPost_reducer';
import { useDispatch } from 'react-redux';
import socket from '../../../API CHANGESTREAMS/socket';
import { useOverlayContext } from '../../../Hooks/overlay';

function CreatePostPopup(props) {
  const auth = useAuth();
  const {setPopUp}= props;
  const formref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({});
  const overlay = useOverlayContext();
  
  const formPostData = (e)=>{
    setPostData({
      ...postData,
      [e.target.name]:e.target?.files?e.target.files[0]:e.target.value,
      user:auth.user._id
    })
  }

  const showPreview = (e)=>{
    if(e.target.files.length >0)
    {
      var src = URL.createObjectURL(e.target.files[0]);
      var uploadPreview = Array.from(document.getElementsByClassName(css.uploadPreview))[0];
      uploadPreview.src= src;
    }
  }

  const postSubmit= async (e)=>{
    e.preventDefault();
    if(!formref.current.checkValidity()){
      formref.current.reportValidity()
      return;
    }
    const formData = new FormData();
    for(let key in postData){
      formData.append(key,postData[key])
    }
    const response = await makeRequest('http://localhost:8000/upload/post' ,formData,"POST");
    if(response.data.errCode==="UNAUTHORIZED"){
      auth.logout();
      navigate('/login')
    }
    else if(response.data.errCode==="SUCCESS"){
      socket.socket.emit('UpdatePostChangeStream', {user:auth.user._id});
      dispatch(add_to_post(formData));
      setPopUp(false);
    }

  }


  const crossClick = ()=>{
    overlay.setShowOverlay(false)
  }
  return (
    <div className={css.createPost_main}>
        <div className={css.createPost_div}>
          <div className={css.cross_div}>
            <img className={css.cross_btn} src='http://localhost:8000/close.png' alt="Close Button" onClick={crossClick}/>
          </div>
          <form ref={formref} encType="multipart/formdata" className={css.createPost_form} onChange={formPostData}>
            <div className={css.productPic_div}>
              <input type='file' name='image' onChange={showPreview} autoComplete='off' required/>
              <img  src='http://localhost:8000/default.jpg' className={css.uploadPreview} alt=" "/>
              <img className={css.upload_icon} src='http://localhost:8000/upload.png' alt="Upload" />
            </div>

            <div className={css.productDescription_div}>
              <div className={css.inputDescription_div}>
                  <input name="postName" type='text' autoComplete='off' required/>
                  <label>Name</label>
                  <div className={css.underline}></div>
              </div>

              <div className={css.inputDescription_div}>
                  <input name="postPrice" type='text' autoComplete='off' required/>
                  <label>Price</label>
                  <div className={css.underline}></div>
              </div>

              <div className={css.inputDescription_div_textbox}>
                <textarea name="postDescription" minlength="60" rows="5" cols="30">
                </textarea>
                <label>Description</label>
              </div>
              <div className={css.submit_btn}>
                  <button onClick={postSubmit}>Submit</button>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default CreatePostPopup