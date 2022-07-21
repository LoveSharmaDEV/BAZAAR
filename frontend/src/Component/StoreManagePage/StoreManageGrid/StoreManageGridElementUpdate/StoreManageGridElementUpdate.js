import React, { useState } from 'react'
import makeRequest from '../../../../Commons/makeRequest';
import StoreManageGridElementUpdateCss from './StoreManageGridElementUpdate.module.css'
import { useDispatch } from 'react-redux';
import { UPDATE_STOCK } from '../../../../Redux/Reducers/fetchAvailableStock_reducer';

function StoreManageGridElementUpdate(props) {

    const [showHashTagOverlay,setHashTagOverlay] = useState(false);

    const dispatch = useDispatch();

    /*-------------------LOCAL STATE START (ANTI-PATTERN)---------------- */
    const [FormData,setFormData] = useState({
        ProductName:props.product.ProductName,
        ProductPrice:props.product.ProductPrice,
        ProductImage:props.product.ProductImage,
        ProductPublish:props.product.ProductPublish,
        ProductQuantity:props.product.ProductQuantity,
        ProductDescription:props.product.ProductDescription,
        ProductDiscount:props.product.ProductDiscount,
        ProductDiscountedPrice:props.product.ProductDiscountedPrice,
        hashtag:props.product.hashtag
    });
    /*-------------------LOCAL STATE END------------------ */

    /*-------------------ON CHANGE TRIGGER START----------- */

    const onFormDataChange = (e)=>{
        setFormData({
            ...FormData,
            [e.target.name]:e.target.value
        })
    }

    /*-------------------ON CHANGE TRIGGER END------------- */

    /*---------------CUSTOM INPUT HANDLERS START------------- */

    const onCheckBoxDataChange = (e)=>{
        setFormData({
            ...FormData,
            [e.target.name]:e.target.checked?true:false
        })
    }

    const AddHashTag = (e)=>
    {
        if (e.key === "Enter") 
        {
            setFormData({
                ...FormData,
                hashtag:[...FormData.hashtag,e.target.value]
            })
            setHashTagOverlay(false)
        }
    }


    const encodeImagetoBase64 = (files)=>{
        const ImageList = [];
        Array.from(files).forEach((file)=>{
          const reader = new FileReader();
          reader.onload = function () {
            ImageList.push({path:reader.result,color:'None'});
            if(ImageList.length === files.length)
            {
                setFormData({
                ...FormData,
                ProductImage:[...FormData.ProductImage,...ImageList]
              })
            }
          }
          reader.readAsDataURL(file);
        })
    
      }

    const AddProductImage = (e)=>{
        encodeImagetoBase64(e.target.files);
      }

    const AddColorToProduct = (e)=>{
    let TempImageList = FormData.ProductImage;
    TempImageList[e.target.dataset.addcolor].color = e.target.value;
    setFormData({
        ...FormData,
        ProductImage:[...TempImageList]
    })
    }
    
    const OnImageDelete = (e)=>{
        let TempImageList = FormData.ProductImage;
        TempImageList.splice(e.target.dataset.delete,1);

        setFormData({
            ...FormData,
            ProductImage:[...TempImageList]
        })
    }

    const OnHashTagDelete = (e)=>{
        setFormData({
            ...FormData,
            hashtag:[...FormData.hashtag.filter((hashtag)=>hashtag!==e.target.dataset.delete)]
        })
    }


    /*---------------CUSTOM INPUT HANDLERS START------------- */

    /*----------------OVERLAY HANDLE START------------------ */

    const toggleHashTagOverlay = (e)=>
    {
        showHashTagOverlay?setHashTagOverlay(false):setHashTagOverlay(true);
    }

    const OnCloseUpdateForm = (e)=>
    {
        props.setUpdateForm(false)
    }

    /*----------------OVERLAY HANDLE END------------------- */



    /*-----------------ON FORM UPDATE START------------------------ */
    const OnProductUpdate = async (e)=>{
        e.preventDefault();
        const response = await makeRequest('http://localhost:8000/store/update/stock',{...FormData,ProductID:props.product._id},'POST');
        console.log(response)
        if(response.data.errCode==='SUCCESS'){
            dispatch(UPDATE_STOCK({...FormData,ProductID:props.product._id})); 
            props.setUpdateForm(false)}
    }
    /*-----------------ON FORM UPDATE END--------------------------- */


  return (
    <div className={StoreManageGridElementUpdateCss.OuterContainer}>
        <img className={StoreManageGridElementUpdateCss.CloseOverlay} src='http://localhost:8000/close.png' alt='Close'  onClick={OnCloseUpdateForm}/>
        
        <form className={StoreManageGridElementUpdateCss.UpdateForm}>
            <div className={StoreManageGridElementUpdateCss.Container1}>
                
                <div className={StoreManageGridElementUpdateCss.Container1_ImageContainer}> 

                    {
                        FormData.ProductImage.map((image,key)=>{
                            return (
                            <div className={StoreManageGridElementUpdateCss.Container1_ImageContainer_img} key={key}> 
                                <img  src='http://localhost:8000/close.png' data-delete={key}  alt='Close' onClick={OnImageDelete}/>
                                <img src={ image.path } alt='ProductImage'/>
                                <div style={{backgroundColor:image.color}}><input onChange={AddColorToProduct} data-addcolor={key} type='color'/></div>
                            </div>
                            )
                        })
                    }

                    <img src='http://localhost:8000/upload.png' alt='UploadBtn'/>
                    <input type='file' multiple onChange={AddProductImage}/>
                </div>

                <div className={StoreManageGridElementUpdateCss.Container1_DescriptionContainer}>
                    <label>DESCRIPTION</label>
                    <textarea name='ProductDescription' value={FormData.ProductDescription} onChange={onFormDataChange}></textarea>
                </div>

            </div>

            <div className={StoreManageGridElementUpdateCss.Container2}>

                <div className={StoreManageGridElementUpdateCss.Container2_DirectInputs}>

                    <div className={StoreManageGridElementUpdateCss.Container2_InputContainer}>
                        <label>Product Name</label>
                        <input name='ProductName' type='text' value={FormData.ProductName} onChange={onFormDataChange}/>
                    </div>

                    <div className={StoreManageGridElementUpdateCss.Container2_InputContainer}>
                        <label>Product Price</label>
                        <input name='ProductPrice' type='number' value={FormData.ProductPrice} onChange={onFormDataChange}/>
                    </div>

                    <div className={StoreManageGridElementUpdateCss.Container2_InputContainer}>
                        <label>Quantity</label>
                        <input name='ProductQuantity' type='number' value={FormData.ProductQuantity} onChange={onFormDataChange}/>
                    </div>

                    <div className={StoreManageGridElementUpdateCss.Container2_InputContainer}>
                        <label>Discount</label>
                        <input name='ProductDiscount' type='number' value={FormData.ProductDiscount} onChange={onFormDataChange}/>
                    </div>

                    <div className={StoreManageGridElementUpdateCss.Container2_InputContainer}>
                        <label>Discounted Price</label>
                        <input name='ProductDiscountedPrice' type='number' value={FormData.ProductDiscountedPrice} onChange={onFormDataChange}/>
                    </div>

                    <div className={StoreManageGridElementUpdateCss.Container2_CheckBoxContainer}>
                        <span>Publish</span>
                        <label>
                            <input name='ProductPublish' type='checkbox'  onChange={onCheckBoxDataChange} checked={FormData.ProductPublish===true?true:false}/>
                            <div className={StoreManageGridElementUpdateCss.Container2_CheckBoxContainer_Slider}></div>
                        </label>
                    </div>

                </div>

                <div className={StoreManageGridElementUpdateCss.Container2_StateInputs}>

                    <div className={StoreManageGridElementUpdateCss.Container2_StateInputs_HashTags}>

                        <div className={StoreManageGridElementUpdateCss.Container2_StateInputs_HashTags_Header}>
                            <img src='http://localhost:8000/add.png' alt='AddBtn' onClick={toggleHashTagOverlay}/>
                            <span>HASH TAGS</span>
                        </div>

                        <div className={StoreManageGridElementUpdateCss.Container2_StateInputs_HashTags_Body}>
                                {
                                    FormData.hashtag[0]!==null?
                                    FormData.hashtag.map((hashtag,key)=>{
                                        console.log(FormData.hashtag)
                                        return(
                                            <div key={key}>
                                                <img  src='http://localhost:8000/close.png' data-delete={hashtag}  alt='Close' onClick={OnHashTagDelete} />
                                                <span>#{hashtag}</span>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                                }
                        </div>

                        {
                            showHashTagOverlay?
                                <div className={StoreManageGridElementUpdateCss.Container2_StateInputs_HashTagsOverlay}>
                                    <img src='http://localhost:8000/close.png' alt='CloseBtn' onClick={toggleHashTagOverlay}/>
                                    <input type='text' placeholder='Add your #Tags' onKeyPress={AddHashTag}/>
                                </div>
                            :
                            null
                        }

                    </div>
                </div>

                <div className={StoreManageGridElementUpdateCss.UpdateFormActions}>
                   
                    <button onClick={OnProductUpdate} className={StoreManageGridElementUpdateCss.button54}>UPDATE</button>
                
                </div>

            </div>
        </form>
    </div>
  )
}

export default StoreManageGridElementUpdate