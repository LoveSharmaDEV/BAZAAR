import { useRef, useState } from 'react';
import CSS from './AddProduct.module.css';
import { useOverlayContext } from '../../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import AUTHORIZED_REQ from '../../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useDispatch } from 'react-redux';
import { ADD_TO_THE_STOCK } from '../../../REDUX/REDUCERS/FETCH_MY_STOCK__REDUCER';
import { BACKEND_BASE, ECOMM_API } from '../../../MasterData/GlobalData';
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';



function AddProduct() {

  const [formData, setFormData] = useState({
    ProductName:'',
    ProductImage:[],
    ProductPrice:0,
    ProductQuantity:0,
    ProductDescription:'',
    ProductDiscount:0,
    ProductDiscountedPrice:0,
    hashtag:[],
    isColorAvailable:false,
    isSizeAvailable:false,
    toBeSoldIn:false,
    ProductUnit:[],
    ProductSize:[]
  });

  const [RequestStatus,setRequestStatus] = useState({loading:false,error:false,success:false})

  const [showHashTagOverlay,setHashTagOverlay] = useState(false);
  const formref = useRef();
  const overlay = useOverlayContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth(); 

  const AddHashTag = (e)=>{
    if (e.key === "Enter") {
      setFormData({
        ...formData,
        hashtag:[...formData.hashtag,e.target.value]
      })
      setHashTagOverlay(false)
    }
  }


  const handleFormData = (e) =>{
    if(e.target.files)
    {
      setFormData({
        ...formData,
        ProductImage:[...formData.ProductImage,
          ...Array.from(e.target.files).map((file)=>{return {path:file,color:''}})]
      });
    }
    else setFormData({
        ...formData,
        [e.target.name]:e.target.value
      });

      
  }


  const onFormSubmit = async (e)=>{

    e.preventDefault();
    const LocalFormData = GET_FORMDATA(formData);

    setRequestStatus({...RequestStatus,loading:true,error:false,success:false});

    const response = await AUTHORIZED_REQ(ECOMM_API.STORE_PRODUCT_UPLOAD,
      LocalFormData,
      {},
      'POST')

    if(response.data.errCode==="UNAUTHORIZED"){
      setRequestStatus({...RequestStatus,loading:false,error:true,success:false});
      auth.logout();
      navigate('/login');
    }

    if(response.data.errCode==='SUCCESS')
    {
      setRequestStatus({...RequestStatus,loading:false,error:false,success:true});
      dispatch(ADD_TO_THE_STOCK({...response.data.product}));
      overlay.setShowOverlay(false);
      
    }



    if(!formref.current.checkValidity()){
      formref.current.reportValidity()
      return;
    }

  }  



  return (
    <div className={CSS.OuterMostContainer}>

        <form ref={formref} className={CSS.OuterMostContainer__ProductUploadForm} encType="multipart/formdata" onChange={handleFormData}>

            <div className={CSS.ProductUploadForm__FormHeader}>
                <CloseButton onClick={()=>{ overlay.setShowOverlay(false)}}className={`${CSS.FormHeader__CloseBTN} mx-2`}/>
                <Button className='mt-2' onClick={onFormSubmit} variant="primary" size='lg'>
                  {
                    RequestStatus.loading && !RequestStatus.success && !RequestStatus.error?
                      <Spinner animation="border" /> 
                      :
                      'SUBMIT'             
                  }
              </Button>
            </div>


          <div className={CSS.ProductUploadForm__Container1}>

            <div className={CSS.Container1__ImagePanel}>
              <div className={CSS.ImagePanel__ImageList}>

                {
                  formData.ProductImage.map((image , key) => (
                    <div className={CSS.ImageList__ImageContainer}>

                      <img 
                        className={CSS.ImageContainer__ProductImage}
                        src={URL.createObjectURL(image.path)} 
                        alt='' 
                        key={key}
                      />

                      <img 
                        className={CSS.ImageContainer__Delete}
                        src={`${BACKEND_BASE}/close.png`} 
                        alt='' 
                        key={key}
                      />

                    </div>
                  ))
                }

                <img src={`${BACKEND_BASE}/upload.png`} alt='UploadTag'/>

                <input name='ProductImage' type='file' multiple/>

              </div>
            </div>


            <div className={CSS.Container1_BodyTagsPanel}>
                {
                  showHashTagOverlay?
                    <div className={CSS.BodyTagsPanel_InputOverlay}>
                          <input type='text' placeholder='Add your #Tags' onKeyPress={AddHashTag}/>
                          <CloseButton onClick={()=>{setHashTagOverlay(false)}} className={`${CSS.InputOverlay__CloseBTN} mt-2`}/>
                    </div>
                    :
                    null
                }
                <div className={CSS.BodyTagsPanel_Header}>

                      <img src={`${BACKEND_BASE}/add.png`} alt='Add' onClick={()=>{setHashTagOverlay(true)}}/>
                      <span>ADD HASH TAGS</span>
                
                </div>

                <div className={CSS.BodyTagsPanel_Tags}>

                      {
                        formData.hashtag.map((hashtag,key) => <span key={key}>#{hashtag}</span>)
                      }

                </div>
            </div>

          </div>

          <div className={CSS.ProductUploadForm__Container2}>

                <div className={CSS.Container2__Input1}>
                      
                      <div className={CSS.Input1__BodyInfoCollectForm}>
                          <input name='ProductName' type='text' placeholder='Name'  required/>
                      </div>

                      <div className={CSS.Input1__BodyInfoCollectForm}>
                          <input name='ProductPrice' type='number' placeholder='Price' required/>
                      </div>

                      <div className={CSS.Input1__BodyInfoCollectForm}>
                          <input name='ProductQuantity' type='number' placeholder='Quantity' required/>
                      </div>

                      <div className={CSS.Input1__BodyInfoCollectForm}>
                          <input name='ProductDiscount' type='number' placeholder='Discount %' required/>
                      </div>

                      <div className={CSS.Input1__BodyInfoCollectForm}>
                          <input name='ProductDiscountedPrice' type='number' placeholder='Discounted Price' required/>
                      </div>

                </div>

                <div className={CSS.Container2__Input2}>
                  
                    <textarea 
                    name='ProductDescription' 
                    placeholder='Description' 
                    minlength="60" rows="20" cols="20">
                    </textarea>

                </div>
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
      postData[key].forEach((data)=>{
        localFormData.append(key,data)
        if (key==='ProductImage')localFormData.append('ProductImageUpload',data.path)
      })
    }
    else localFormData.append(key, postData[key]);
  }

  return localFormData
} 

/* ---> HELPER FUNCTIONS <--- */

export default AddProduct