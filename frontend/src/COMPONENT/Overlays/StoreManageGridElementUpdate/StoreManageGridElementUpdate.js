import React, { useState } from 'react'
import AUTHORIZED_REQ from '../../../COMMON_UTILS/AUTHORIZED_REQUEST';
import CSS from './StoreManageGridElementUpdate.module.css'
import { useDispatch } from 'react-redux';
import { UPDATE_STOCK } from '../../../REDUX/REDUCERS/FETCH_MY_STOCK__REDUCER';
import { BACKEND_BASE, ECOMM_API } from '../../../MasterData/GlobalData';
import { useOverlayContext } from '../../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton';



function StoreManageGridElementUpdate(props) {

    const [showHashTagOverlay,setHashTagOverlay] = useState(false);
    const [currentInfo,setCurrentInfo] = useState('Product');
    const overlay = useOverlayContext();
    
    const dispatch = useDispatch();

    /*---------> ANTI PATTERN <------------- */
    const [FormData,setFormData] = useState({
        ProductID: props.product._id,
        ProductName: props.product.ProductName,
        ProductPrice: props.product.ProductPrice,
        ProductImage: props.product.ProductImage,
        ProductPublish: props.product.ProductPublish,
        ProductQuantity: props.product.ProductQuantity,
        ProductDescription: props.product.ProductDescription,
        ProductDiscount: props.product.ProductDiscount,
        ProductDiscountedPrice: props.product.ProductDiscountedPrice,
        ColorVisible: props.product.isColorAvailable,
        SizeVisible: props.product.isSizeAvailable,
        UnitVisible: props.product.toBeSoldIn,
        HashTags: props.product.hashtag.map((input)=>input.replaceAll("\"", "")),
        ProductUnit: props.product.ProductUnit.map((input)=>input.replaceAll("\"", "")),
        ProductSize: props.product.ProductSize.map((input)=>input.replaceAll("\"", "")),
    });
    /*---------> ANTI PATTERN <------------- */


    /* ------> DIRECT INPUT STATE HANDLER <------ */
    const OnFormDataChange = (e)=>{
        setFormData({
            ...FormData,
            [e.target.name]:e.target.value
        })
    }
    /* ------> DIRECT INPUT STATE HANDLER <------ */


    /*---------> CUSTOM INPUT HANDLERS <--------- */

    const OnAdd__ProductImage =(e)=>{
            setFormData({
                ...FormData,
                ProductImage:[...FormData.ProductImage,{path:e.target.files[0],color:'#ffffff'}]
            })
    }

    const OnDelete__ProductImage =(e)=>{
        setFormData({
            ...FormData,
            ProductImage:[...FormData.ProductImage.filter((ProductImage,key)=>{
                return key!==parseInt(e.target.dataset.delete)
            })]
        })

    }

    const OnAdd__ProductColor = (e)=>{
        const TempProductImage = FormData.ProductImage;
        TempProductImage[parseInt(e.target.dataset.key)].color = e.target.value; 
        setFormData({
            ...FormData,
            ProductImage:[...TempProductImage]
        })  
    }

    const OnAdd__HashTag = (e)=>
    {
        if (e.key === "Enter") 
        {
            setFormData({
                ...FormData,
                HashTags:[...FormData.HashTags,e.target.value]
            })
            setHashTagOverlay(false)
        }
    }

    const OnDelete__HashTag = (e)=>{
        setFormData({
            ...FormData,
            HashTags:[...FormData.HashTags.filter((hashtag,key)=>{
                return key!==parseInt(e.target.dataset.delete)
            })]
        })
    }

    const onToggle__HashTagOverlay = (e)=>
    {
        showHashTagOverlay?setHashTagOverlay(false):setHashTagOverlay(true);
    }

    const onClose__UpdateForm = (e)=>
    {
        overlay.setShowOverlay(false)
    }

    const onToggle__Page=(e)=>{
        e.preventDefault();
        if(currentInfo==='Product') setCurrentInfo('Selling')
        if(currentInfo!=='Product') setCurrentInfo('Product')
    }


    const onToggle__InputBoolean = (e)=>{
        setFormData({
            ...FormData,
            [e.target.name]:e.target.checked?true:false
        })
    }

    const OnChange__ProductDetailsState = (e) => {
        if(e.target.checked)
        {
            if(!FormData[e.target.name].includes(e.target.value)) 
            setFormData({
                ...FormData,
                [e.target.name]:[...FormData[e.target.name],e.target.value]
                }
            )
        }
        else{
            FormData[e.target.name].splice(FormData[e.target.name].findIndex((size)=>size===e.target.value),1);
            setFormData({
                ...FormData,
                [e.target.name]:[...FormData[e.target.name]]
            })
        } 
    }

    /*---------> CUSTOM INPUT HANDLERS <--------- */

    /*-----------------ON FORM UPDATE START------------------------ */
    const OnProductUpdate = async (e)=>{
        e.preventDefault();
        const LocalFormData = GET_FormData(FormData);
        const response = await AUTHORIZED_REQ(ECOMM_API.STORE_PRODUCT_UPDATE,LocalFormData,{},'POST');
        console.log(response)
        if(response.data.errCode==='SUCCESS'){
            dispatch(UPDATE_STOCK({...response.data.product})); 
            overlay.setShowOverlay(false)
        }
    }
    /*-----------------ON FORM UPDATE END--------------------------- */

  return (
    <div className={CSS.OuterMostContainer}>

        <form  className={CSS.OuterMostContainer__ProductUploadForm} encType="multipart/FormData" >

            <div className={CSS.ProductUploadForm__FormHeader}>
                <CloseButton className='mx-3'  onClick={onClose__UpdateForm} />          
                <Button onClick={OnProductUpdate} variant="primary" size='lg'>UPDATE</Button>
            </div>


          <div className={CSS.ProductUploadForm__Container1}>

            <div className={CSS.Container1__ImagePanel}>
              <div className={CSS.ImagePanel__ImageList}>

                {
                  FormData.ProductImage.map((image , key) =>(
                    <div className={CSS.ImageList__ImageContainer} key={key}>
                        
                        <CloseButton  
                        className={CSS.ImageContainer__CloseBtn} 
                        data-delete={key}  
                        onClick={OnDelete__ProductImage} 
                        />          

                        <img 
                        src={image.path instanceof File ? URL.createObjectURL(image.path):`${BACKEND_BASE}/${image.path}`} 
                        className={CSS.ImageContainer__ProductImage}
                        alt='' 
                        
                        />
                        
                        {
                        FormData.ColorVisible?
                            <div className={CSS.ImageContainer__ColorPanel}> 
                                <span>ADD COLOR</span>

                                <input 
                                type='color'
                                data-key = {key}
                                value={
                                    FormData.ProductImage[key].color ==='' || !FormData.ProductImage[key].color?
                                    '#ffffff'
                                    :
                                    FormData.ProductImage[key].color
                                
                                }
                                onChange={OnAdd__ProductColor}
                                />

                            </div>
                            :
                            null
                        }

                    </div>
                    ))
                }

                <img 
                src={`${BACKEND_BASE}/upload.png`}
                className={CSS.ImagePanel__UploadIcon}
                alt=' '
                />

                <input 
                name='ProductImage' 
                type='file' 
                onChange={OnAdd__ProductImage}
                multiple
                />

              </div>
            </div>


            <div className={CSS.Container1_BodyTagsPanel}>
                {
                  showHashTagOverlay?
                    <div className={CSS.BodyTagsPanel_InputOverlay}>
                        
                        <input 
                            type='text' 
                            placeholder='Add your #Tags'
                            onKeyPress={OnAdd__HashTag}
                            />
                            
                        <CloseButton 
                        className={`${CSS.InputOverlay__CloseBTN} mt-2 mr-2`} 
                        onClick={onToggle__HashTagOverlay} 
                        />       

                    </div>
                    :
                    null
                }
                <div className={CSS.BodyTagsPanel_Header}>

                      <img 
                        src={`${BACKEND_BASE}/add.png`}
                        alt=' ' 
                        onClick={onToggle__HashTagOverlay} 
                       />
                      <span>ADD HASH TAGS</span>
                
                </div>

                <div className={CSS.BodyTagsPanel_Tags}>
                      {
                        FormData.HashTags.map((hashtag,key) => 
                        <span key={key}>
                            
                            <CloseButton className={CSS.Tags__CloseBTN} 
                            data-delete={key}  
                            onClick={OnDelete__HashTag} 
                            />          

                            #{hashtag}
                        </span>)
                      }

                </div>
            </div>

          </div>

          <div className={CSS.ProductUploadForm__Container2}>

                <div className={CSS.Container2__Input1}>

                    <div className={CSS.Container2__Header}>
                        <Button className='mx-3' onClick={onToggle__Page} variant="primary" size='lg'>PRODUCT DETAILS</Button>
                        <Button className='mx-3' onClick={onToggle__Page} variant="primary" size='lg'>BUISNESS DETAILS</Button>
                    </div>

                    {
                        currentInfo==='Product'?
                            <div className={CSS.Input1__Page1}>

                                <div className={CSS.Input1__BodyInfoCollectForm}>
                                    <input 
                                    name='ProductName' 
                                    type='text' 
                                    placeholder='Name' 
                                    value={FormData.ProductName}
                                    onChange={OnFormDataChange}  
                                    required
                                    />
                                </div>

                                <div className={CSS.Input1__BodyInfoCollectForm}>
                                    <input 
                                    name='ProductPrice' 
                                    type='number' 
                                    placeholder='Price'
                                    value={FormData.ProductPrice}
                                    onChange={OnFormDataChange} 
                                    required
                                    />
                                </div>

                                <div className={CSS.Input1__BodyInfoCollectForm}>
                                    <input 
                                    name='ProductQuantity' 
                                    type='number' 
                                    placeholder='Quantity'
                                    value={FormData.ProductQuantity}
                                    onChange={OnFormDataChange}  
                                    required
                                    />
                                </div>

                                <div className={CSS.Input1__BodyInfoCollectForm}>
                                    <input 
                                    name='ProductDiscount' 
                                    type='number' 
                                    placeholder='Discount %'
                                    value={FormData.ProductDiscount}
                                    onChange={OnFormDataChange}  
                                    required
                                    />
                                </div>

                                <div className={CSS.Input1__BodyInfoCollectForm}>
                                    <input 
                                    name='ProductDiscountedPrice' 
                                    type='number' 
                                    placeholder='Discounted Price' 
                                    value={FormData.ProductDiscountedPrice}
                                    onChange={OnFormDataChange} 
                                    required
                                    />
                                </div>

                                <div className={CSS.Input1__BodyInfoCollectForm}>
                                    <span>Publish</span>
                                    <input 
                                    name='ProductPublish' 
                                    type='checkbox' 
                                    placeholder='Discounted Price'
                                    onChange={onToggle__InputBoolean}
                                    checked={FormData.ProductPublish} 
                                    required
                                    />
                                </div>

                            </div>

                        :
                            <div className={CSS.Input1__Page2}>
                                
                                <div className={CSS.Page2__BodyBusinessCollectForm}>

                                    <div className={CSS.BodyBusinessCollectForm__CheckBox}>
                                        <span> ADD COLOR OPTIONS</span>
                                        <input 
                                        name='ColorVisible' 
                                        type='checkbox' 
                                        checked={FormData.ColorVisible}  
                                        onChange={onToggle__InputBoolean}
                                        />
                                    </div>

                                </div>
                                
                                <div className={CSS.Page2__BodyBusinessCollectForm}>

                                    <div className={CSS.BodyBusinessCollectForm__CheckBox}>
                                        <span> ADD SIZE OPTIONS OPTION</span>
                                        <input 
                                        name='SizeVisible' 
                                        type='checkbox' 
                                        checked={FormData.SizeVisible} 
                                        onChange={onToggle__InputBoolean}
                                        />
                                    </div>

                                    {
                                    FormData.SizeVisible?
                                        <div className={CSS.BodyBusinessCollectForm__CheckBox_visible}>
                                            <div className={CSS.CheckBox__Options}>
                                                <span>S</span>
                                                <input 
                                                type='checkbox'
                                                value='SMALL'
                                                name='ProductSize'
                                                onChange={OnChange__ProductDetailsState}
                                                checked={FormData.ProductSize.includes('SMALL')}
                                                />
                                            </div>
                                            <div className={CSS.CheckBox__Options}>
                                                <span>M</span>
                                                <input 
                                                type='checkbox'
                                                value='MEDIUM'
                                                name='ProductSize'
                                                onChange={OnChange__ProductDetailsState}
                                                checked={FormData.ProductSize.includes('MEDIUM')}
                                                />
                                            </div>
                                            <div className={CSS.CheckBox__Options}>
                                                <span>L</span>
                                                <input 
                                                type='checkbox'
                                                value='LARGE'
                                                name='ProductSize'
                                                onChange={OnChange__ProductDetailsState}
                                                checked={FormData.ProductSize.includes('LARGE')}
                                                />
                                            </div>
                                            <div className={CSS.CheckBox__Options}>
                                                <span>XL</span>
                                                <input 
                                                type='checkbox'
                                                value='XLARGE'
                                                name='ProductSize'
                                                onChange={OnChange__ProductDetailsState}
                                                checked={FormData.ProductSize.includes('XLARGE')}
                                                />
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                
                                <div className={CSS.Page2__BodyBusinessCollectForm}>

                                    <div className={CSS.BodyBusinessCollectForm__CheckBox}>
                                        <span> ADD UNIT OPTIONS OPTION</span>
                                        <input 
                                        name='UnitVisible' 
                                        type='checkbox' 
                                        checked={FormData.UnitVisible} 
                                        onChange={onToggle__InputBoolean}
                                        />
                                    </div>

                                    {
                                    FormData.UnitVisible?
                                        <div className={CSS.BodyBusinessCollectForm__CheckBox_visible}>
                                            <div className={CSS.CheckBox__Options}>
                                                <span>KG</span>
                                                <input 
                                                type='checkbox'
                                                value='KG'
                                                name='ProductUnit'
                                                onChange={OnChange__ProductDetailsState}
                                                checked={FormData.ProductUnit.includes('KG')}
                                                />
                                            </div>
                                            <div className={CSS.CheckBox__Options}>
                                                <span>PCS</span>
                                                <input 
                                                type='checkbox'
                                                value='PCS'
                                                name='ProductUnit'
                                                onChange={OnChange__ProductDetailsState}
                                                checked={FormData.ProductUnit.includes('PCS')}
                                                />
                                            </div>
                                            <div className={CSS.CheckBox__Options}>
                                                <span>LTR</span>
                                                <input 
                                                type='checkbox'
                                                value='LTR'
                                                name='ProductUnit'
                                                onChange={OnChange__ProductDetailsState}
                                                checked={FormData.ProductUnit.includes('LTR')}
                                                />
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                    }
                    

                </div>

                <div className={CSS.Container2__Input2}>
                  
                    <textarea 
                    name='ProductDescription' 
                    placeholder='DESCRIPTION' 
                    value={FormData.ProductDescription}
                    onChange={OnFormDataChange} 
                    minlength="60" rows="20" cols="20">
                    </textarea>

                </div>
          </div>
        </form>
    </div>
  )
}

/* ---> HELPER FUNCTIONS <--- */

function GET_FormData(FormDataVar) 
{
  const LocalFormData = new FormData();
  LocalFormData.append('ProductID', FormDataVar.ProductID);
  LocalFormData.append('ProductName',FormDataVar.ProductName);
  LocalFormData.append('ProductPrice',FormDataVar.ProductPrice);
  LocalFormData.append('ProductPublish',FormDataVar.ProductPublish);
  LocalFormData.append('ProductQuantity',FormDataVar.ProductQuantity);
  LocalFormData.append('ProductDescription',FormDataVar.ProductDescription);
  LocalFormData.append('ProductDiscount',FormDataVar.ProductDiscount);
  LocalFormData.append('ProductDiscountedPrice',FormDataVar.ProductDiscountedPrice);
  LocalFormData.append('ColorVisible',FormDataVar.ColorVisible);
  LocalFormData.append('SizeVisible',FormDataVar.SizeVisible);
  LocalFormData.append('UnitVisible',FormDataVar.UnitVisible);
  FormDataVar.ProductImage.forEach((Data)=>{
    LocalFormData.append('ProductImage[]',JSON.stringify(Data));
    if (Data.path instanceof File) LocalFormData.append('ProductImageUpload',Data.path)
  })
  FormDataVar.HashTags.forEach((Data)=>{
    LocalFormData.append("HashTags[]",Data)
  })
  FormDataVar.ProductUnit.forEach((Data)=>{
    LocalFormData.append('ProductUnit[]',Data)
  })
  FormDataVar.ProductSize.forEach((Data)=>{
    LocalFormData.append('ProductSize[]',Data)
  })

  return LocalFormData
} 

/* ---> HELPER FUNCTIONS <--- */

export default StoreManageGridElementUpdate