import { useRef, useState } from 'react';
import AddProductCss from './AddProduct.module.css';
import { useOverlayContext } from '../../../Hooks/overlay';
import makeRequest from '../../../Commons/makeRequest';
import { useDispatch } from 'react-redux';
import { ADD_TO_THE_STOCK } from '../../../Redux/Reducers/fetchAvailableStock_reducer';

function AddProduct() {

  const [HashTags, setHashTags] = useState([]);
  const [formData, setFormData] = useState({
    ProductName:'',
    ProductImage:[],
    ProductPrice:0,
    ProductQuantity:0,
    ProductDescription:'',
    ProductDiscount:0,
    ProductDiscountedPrice:0,
  });


  const [showHashTagOverlay,setHashTagOverlay] = useState(false);
  const formref = useRef();
  const overlay = useOverlayContext();
  const dispatch = useDispatch();


  const AddHashTag = (e)=>{
    if (e.key === "Enter") {
      setHashTags([...HashTags,e.target.value])
      setHashTagOverlay(false)
    }
  }

  const encodeImagetoBase64 = (files)=>{
    const ImageList = [];
    Array.from(files).forEach((file)=>{
      const reader = new FileReader();
      reader.onload = function () {
        ImageList.push({path:reader.result, color:'None'});
        if(ImageList.length === files.length)
        {
          setFormData({
            ...FormData,
            ProductImage:[...formData.ProductImage,...ImageList]
          })
        }
      }
      reader.readAsDataURL(file);
    })

  }

  const handleFormData = (e) =>{
    if(e.target.files)
    {
      encodeImagetoBase64(e.target.files);
    }
    else setFormData({
        ...formData,
        [e.target.name]:e.target.value
      });
  }


  const onFormSubmit = async (e)=>{

    e.preventDefault();

    /* -----------------------CREATE WEB FORM DATA--> START------------ */

    const response = await makeRequest('http://localhost:8000/store/product/upload', {...formData,hashtag:HashTags}, 'POST')
    console.log({...formData,hashtag:HashTags})
    if(response.data.errCode==='SUCCESS')
    {

      dispatch(ADD_TO_THE_STOCK({...formData,hashtag:HashTags}));
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
        <form ref={formref} className={AddProductCss.AddProduct_form} encType="multipart/formdata" onChange={handleFormData}>
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
                          formData.ProductImage.map((image , key) => (
                          <img src={image.path} alt='ImagePreview' key={key}/>
                          ))
                        }

                        <img src='http://localhost:8000/upload.png' alt='UploadTag'/>
                        
                        <input name='ProductImage' type='file' multiple/>

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
                                <input name='ProductName' type='text' placeholder='Name'  required/>
                           </div>

                            <div className={AddProductCss.AddProduct_BodyInfoCollectForm_div}>
                                <input name='ProductPrice' type='number' placeholder='Price' required/>
                            </div>

                            <div className={AddProductCss.AddProduct_BodyInfoCollectForm_div}>
                                <input name='ProductQuantity' type='number' placeholder='Quantity' required/>
                            </div>

                            <div className={AddProductCss.AddProduct_BodyInfoCollectForm_div}>
                                <input name='ProductDiscount' type='number' placeholder='Discount %' required/>
                            </div>

                            <div className={AddProductCss.AddProduct_BodyInfoCollectForm_div}>
                                <input name='ProductDiscountedPrice' type='number' placeholder='Discounted Price' required/>
                            </div>

                      </div>

                    <div className={AddProductCss.AddProduct_Body_Container2_Input2}>
                      
                      <textarea 
                      name='ProductDescription' 
                      placeholder='Description' 
                      minlength="60" rows="20" cols="20">
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