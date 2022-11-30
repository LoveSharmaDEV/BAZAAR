import React, { useRef, useState } from 'react'
import { useAuth } from '../../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import CSS from './CreatePostPopupOverlay.module.css'
import { useNavigate } from 'react-router-dom';
import AUTHORIZED_REQ from '../../../COMMON_UTILS/AUTHORIZED_REQUEST'
import { add_to_post } from '../../../REDUX/REDUCERS/POSTS__REDUCER';
import { useDispatch } from 'react-redux';
import { useOverlayContext } from '../../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import { BACKEND_BASE} from '../../../MasterData/GlobalData';
import { POST_API } from '../../../MasterData/GlobalData';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

function CreatePostPopup() {
  const auth = useAuth(); 
  const overlay = useOverlayContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formref = useRef(); 


  const [postData, setPostData] = useState({
    postPic:[],
    postName:'',
    postDescription:'',
    postPrice:'',
    like:[]
  });

  const [RequestStatus,setRequestStatus] = useState({loading:false,error:false,success:false})
  

  const formPostData = (e)=>{
    if(e.target.files) setPostData({
                                    ...postData,
                                    'postPic':[...postData.postPic,...Array.from(e.target.files)]
                                  })
    
    else setPostData({
                      ...postData,
                      [e.target.name]:e.target.value,
                      user:auth.user._id
      })
  }


  const postSubmit= async (e)=>{

    e.preventDefault();
    
    if(!formref.current.checkValidity()){
      formref.current.reportValidity()
      return;
    }

    const ToBeSubmittedFormData = GET_FORMDATA(postData);

    setRequestStatus({...RequestStatus,loading:true,error:false,success:false});

    const response = await AUTHORIZED_REQ(POST_API.UPLOAD_POST,
                                      ToBeSubmittedFormData,
                                      {'content-type':'multipart/form-data'},
                                      "POST");
                                          
    if(response.data.errCode==="UNAUTHORIZED"){
      setRequestStatus({...RequestStatus,loading:false,error:true,success:false});
      auth.logout();
      navigate('/login');
    }

    else if(response.data.errCode==="SUCCESS"){
      setRequestStatus({...RequestStatus,loading:false,error:false,success:true});
      dispatch(add_to_post(response.data.post));
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
    <div className={CSS.createPost_main}>
        <form  ref={formref} className={CSS.createPost_form} encType='multipart/form-data' onChange={formPostData}>
            
            <CloseButton
              onClick={crossClick} 
              className={CSS.cross_btn} 
            />

            <div className={CSS.createPost_ImageContainer}>
              <div className={CSS.createPost_ImagePanel}>

                  {
                    postData.postPic.map((image,key)=>{
                        return <div className={CSS.Image} key={`post-${key}`}>
                                  
                                  <img 
                                  src={URL.createObjectURL(image)} 
                                  key={key} 
                                  alt={`post-${key}`}
                                  />

                                  <div className={CSS.ImageDelete} data-deleteimageindex={key} onClick={DeleteImage}>
                                    
                                    <img style={{height:'2rem' ,width:'2rem'}} 
                                    src={`${BACKEND_BASE}/close.png`} 
                                    alt=''
                                    />

                                  </div>
                              </div>
                    })
                  }

                </div>

                <input  type='file' multiple/>
                
                <img 
                className={CSS.createPost_ImageUploadIcon} 
                src={`${BACKEND_BASE}/upload.png`} 
                alt="Upload" 
                />

            </div>
            <div className={CSS.createPost_DetailContainer}>

              <input name="postName" placeholder='Title' type='text' autoComplete='off' required/> 
              <input name="postPrice" placeholder='Price' type='text' autoComplete='off' required/>           
              <textarea name="postDescription" placeholder='Description' minlength="30" rows="1" cols="25">
              </textarea>

              <Button className='mt-2' onClick={postSubmit} variant="primary" size='lg'>
                {
                  RequestStatus.loading && !RequestStatus.success && !RequestStatus.error?
                    <Spinner animation="border" /> 
                    :
                    'SUBMIT'             
                }
              </Button>
            </div>
        </form>
    </div>
  )
}


/* ---> HELPER FUNCTIONS <--- */

function GET_FORMDATA(postData) 
{
  const localFormData = new FormData();
  for ( var key in postData ) 
  {
    if(postData[key] instanceof Array){
      postData[key].forEach((data)=>localFormData.append(key,data))
    }
    else localFormData.append(key, postData[key]);
  }

  return localFormData
} 

/* ---> HELPER FUNCTIONS <--- */



export default CreatePostPopup