import { useRef, useState } from 'react';
import AddProductCss from './AddProduct.module.css';
import { useOverlayContext } from '../../../Hooks/overlay';
import makeRequest from '../../../Commons/makeRequest';
import { useDispatch } from 'react-redux';
import { ADD_TO_THE_STOCK } from '../../../Redux/Reducers/fetchAvailableStock_reducer';

function AddProduct() {

  const [imageList, setImageList] = useState([]);
  const [HashTags, setHashTags] = useState([]);
  const [formData, setFormData] = useState({});
  const [showHashTagOverlay,setHashTagOverlay] = useState(false);
  const formref = useRef();
  const overlay = useOverlayContext();
  const dispatch = useDispatch();


  const AddProductImage = (e)=>{
    setImageList([...imageList,...e.target.files])
  }

  const AddHashTag = (e)=>{
    if (e.key === "Enter") {
      setHashTags([...HashTags,e.target.value])
      setHashTagOverlay(false)
    }
  }

  const handleFormData = (e) =>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      });
  }

  const onFormSubmit = async (e)=>{

    e.preventDefault();

    /* -----------------------CREATE WEB FORM DATA--> START------------ */
    const webFormData = new FormData();
    
    for(const key in formData)
    {
      webFormData.append(key,formData[key])
    }

    imageList.forEach(image=>{
      webFormData.append('imageList',image);
    })

    HashTags.forEach(hashtag=>{
      webFormData.append('HashTags',hashtag);
    })

    const response = await makeRequest('http://localhost:8000/store/product/upload', webFormData, 'POST')
    if(response.data.errCode==='SUCCESS')
    {

      dispatch(ADD_TO_THE_STOCK(webFormData));
      overlay.setShowOverlay(false);
      
    }
    else{
      console.log(response.data)
      //formref.current.reset()
    }    
    /* -----------------------CREATE WEB FORM DATA--> END-------------- */

    if(!formref.current.checkValidity()){
      formref.current.reportValidity()
      return;
    }

  }  

  return (
    <div className={AddProductCss.AddProduct_OuterDiv_div}>
        <form ref={formref} className={AddProductCss.AddProduct_form} encType="multipart/formdata">
{/*---------------------------------------------------------------------------------------------------- */}
          <div className={AddProductCss.AddProduct_HeaderActions_div}>

              <img src='http://localhost:8000/close.png' alt='Close' onClick={()=>{ overlay.setShowOverlay(false)}}/>
              <button onClick={onFormSubmit}>SUBMIT</button>

          </div>
{/*--------------------------------------------------------------------------------------- */}

{/*--------------------------------------------------------------------------------------- */}
          <div className={AddProductCss.AddProduct_Body_div}>

                <div className={AddProductCss.AddProduct_Body_Container1}>

                      <div className={AddProductCss.AddProduct_BodyImagePanel_div}>

                        {
                          imageList.map((image , key) => (
                          <img src={URL.createObjectURL(image)} alt='ImagePreview' key={key}/>
                          ))
                        }

                        <img src='http://localhost:8000/upload.png' alt='UploadTag'/>
                        
                        <input type='file' multiple onChange={AddProductImage}/>

                      </div>

                      <div className={AddProductCss.AddProduct_BodyTagsPanel_div}>
                          {
                          showHashTagOverlay?
                            <div className={AddProductCss.AddProduct_BodyTagsPanel_InputOverlay_div}>
                                  <input type='text' placeholder='Add your #Tags' onKeyPress={AddHashTag}/>
                                  <img src='http://localhost:8000/close.png' alt='Close' onClick={()=>{setHashTagOverlay(false)}} />
                            </div>
                            :
                            null
                          }
                          <div className={AddProductCss.AddProduct_BodyTagsPanel_ADDTAG_div}>

                                <img src='http://localhost:8000/add.png' alt='Add' onClick={()=>{setHashTagOverlay(true)}}/>
                                <span>ADD HASH TAGS</span>
                          
                          </div>

                          <div className={AddProductCss.AddProduct_BodyTagsPanel_TAGS_div}>
                                
                                {
                                  HashTags.map((hashtag,key) => <span key={key}>#{hashtag}</span>)
                                }

                          </div>
                      </div>

                </div>

                <div className={AddProductCss.AddProduct_Body_Container2}>

                      <div className={AddProductCss.AddProduct_Body_Container2_Input1}>
                           
                           <div className={AddProductCss.AddProduct_BodyInfoCollectForm_div}>
                                <input name='ProductName' type='text' placeholder='Name' onChange={handleFormData} required/>
                           </div>

                            <div className={AddProductCss.AddProduct_BodyInfoCollectForm_div}>
                                <input name='ProductPrice' type='number' placeholder='Price' onChange={handleFormData} required/>
                            </div>

                            <div className={AddProductCss.AddProduct_BodyInfoCollectForm_div}>
                                <input name='ProductQuantity' type='number' placeholder='Quantity' onChange={handleFormData} required/>
                            </div>

                            <div className={AddProductCss.AddProduct_BodyInfoCollectForm_div}>
                                <input name='ProductDiscount' type='number' placeholder='Discount %' onChange={handleFormData} required/>
                            </div>

                            <div className={AddProductCss.AddProduct_BodyInfoCollectForm_div}>
                                <input name='ProductDiscountedPrice' type='number' placeholder='Discounted Price' onChange={handleFormData} required/>
                            </div>

                      </div>

                    <div className={AddProductCss.AddProduct_Body_Container2_Input2}>
                      
                      <textarea 
                      name='ProductDescription' 
                      placeholder='Description' 
                      minlength="60" rows="20" cols="20" onChange={handleFormData}>
                      </textarea>
  
                    </div>
                </div>
          </div>
{/*--------------------------------------------------------------------------------------- */}
        </form>
    </div>
  )
}

export default AddProduct