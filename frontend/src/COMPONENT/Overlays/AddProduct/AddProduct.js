import { useRef, useState } from 'react';
import AddProductCss from './AddProduct.module.css';
import { useOverlayContext } from '../../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import AUTHORIZED_REQ from '../../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useDispatch } from 'react-redux';
import { ADD_TO_THE_STOCK } from '../../../REDUX/REDUCERS/FETCH_MY_STOCK__REDUCER';
import { BACKEND_BASE, ECOMM_API } from '../../../MasterData/GlobalData';
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton';



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


  const [showHashTagOverlay,setHashTagOverlay] = useState(false);
  const formref = useRef();
  const overlay = useOverlayContext();
  const dispatch = useDispatch();


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
    const response = await AUTHORIZED_REQ(ECOMM_API.STORE_PRODUCT_UPLOAD,
      LocalFormData,
      {},
      'POST')
    if(response.data.errCode==='SUCCESS')
    {

      dispatch(ADD_TO_THE_STOCK({...response.data.product}));
      overlay.setShowOverlay(false);
      
    }
    else{
      console.log(response.data)
      //formref.current.reset()
    }


    if(!formref.current.checkValidity()){
      formref.current.reportValidity()
      return;
    }

  }  



  return (
    <div className={AddProductCss.OuterMostContainer}>

        <form ref={formref} className={AddProductCss.OuterMostContainer__ProductUploadForm} encType="multipart/formdata" onChange={handleFormData}>

            <div className={AddProductCss.ProductUploadForm__FormHeader}>
                <CloseButton onClick={()=>{ overlay.setShowOverlay(false)}}className={`${AddProductCss.FormHeader__CloseBTN} mx-2`}/>
                <Button onClick={onFormSubmit} variant="primary" size='lg'>SUBMIT</Button>
            </div>


          <div className={AddProductCss.ProductUploadForm__Container1}>

            <div className={AddProductCss.Container1__ImagePanel}>
              <div className={AddProductCss.ImagePanel__ImageList}>

                {
                  formData.ProductImage.map((image , key) => (
                  <img src={URL.createObjectURL(image.path)} alt='' key={key}/>
                  ))
                }

                <img src={`${BACKEND_BASE}/upload.png`} alt='UploadTag'/>

                <input name='ProductImage' type='file' multiple/>

              </div>
            </div>


            <div className={AddProductCss.Container1_BodyTagsPanel}>
                {
                  showHashTagOverlay?
                    <div className={AddProductCss.BodyTagsPanel_InputOverlay}>
                          <input type='text' placeholder='Add your #Tags' onKeyPress={AddHashTag}/>
                          <CloseButton onClick={()=>{setHashTagOverlay(false)}} className={`${AddProductCss.InputOverlay__CloseBTN} mt-2`}/>
                    </div>
                    :
                    null
                }
                <div className={AddProductCss.BodyTagsPanel_Header}>

                      <img src={`${BACKEND_BASE}/add.png`} alt='Add' onClick={()=>{setHashTagOverlay(true)}}/>
                      <span>ADD HASH TAGS</span>
                
                </div>

                <div className={AddProductCss.BodyTagsPanel_Tags}>

                      {
                        formData.hashtag.map((hashtag,key) => <span key={key}>#{hashtag}</span>)
                      }

                </div>
            </div>

          </div>

          <div className={AddProductCss.ProductUploadForm__Container2}>

                <div className={AddProductCss.Container2__Input1}>
                      
                      <div className={AddProductCss.Input1__BodyInfoCollectForm}>
                          <input name='ProductName' type='text' placeholder='Name'  required/>
                      </div>

                      <div className={AddProductCss.Input1__BodyInfoCollectForm}>
                          <input name='ProductPrice' type='number' placeholder='Price' required/>
                      </div>

                      <div className={AddProductCss.Input1__BodyInfoCollectForm}>
                          <input name='ProductQuantity' type='number' placeholder='Quantity' required/>
                      </div>

                      <div className={AddProductCss.Input1__BodyInfoCollectForm}>
                          <input name='ProductDiscount' type='number' placeholder='Discount %' required/>
                      </div>

                      <div className={AddProductCss.Input1__BodyInfoCollectForm}>
                          <input name='ProductDiscountedPrice' type='number' placeholder='Discounted Price' required/>
                      </div>

                </div>

                <div className={AddProductCss.Container2__Input2}>
                  
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