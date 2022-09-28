import StoreManageGridElementCss from './StoreManageGridElement.module.css'
import { useState } from 'react';
import { DELETE_FROM_STOCK } from '../../../../REDUX/REDUCERS/FETCH_MY_STOCK__REDUCER';
import { useDispatch } from 'react-redux';
import { BACKEND_BASE} from '../../../../MasterData/GlobalData';
import { ECOMM_API } from '../../../../MasterData/GlobalData';
import AUTHORIZED_REQ from '../../../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useOverlayContext } from '../../../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';

function StoreManageGridElement(props) {
  
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const overlay = useOverlayContext();

  const changePicForward = ()=>{
    setImageIndex((prev)=>{
        return (((prev+1)%props.product.ProductImage.length))
    })
  }

  const changePicBackward = ()=>{
      setImageIndex((prev)=>{
          return (prev-1)>0?((prev-1)%props.product.ProductImage.length):0;
      })
  }

  const toggleUpdateForm = ()=>{
      overlay.setOverlay('ProductUpdate')
      overlay.setCustomOverlayProps({product:props.product})
      overlay.setShowOverlay(true);
  }

  const DeleteProduct = async()=>{

    const response = await AUTHORIZED_REQ(ECOMM_API.STORE_PRODUCT_DELETE,{productID:props.product._id},{},'POST');
    if(response.data.errCode==='SUCCESS') dispatch(DELETE_FROM_STOCK(props.product._id));
  }

  return (
    <>

      {/* {
        updateForm?
        <StoreManageGridElementUpdate setUpdateForm={setUpdateForm} product={props.product}/>
        :
        null
      } */}

      <div className={StoreManageGridElementCss.StoreManageGridElement}>
        <div className={StoreManageGridElementCss.StoreManageGridElement_ImageCarousal}>
          <img onClick={changePicBackward} src={`${BACKEND_BASE}/right.png`} className={StoreManageGridElementCss.ProductCardBackward} alt='changePic'/>
          <div className={StoreManageGridElementCss.StoreManageGridElement_ImagePanel_div}>
            
            {
              props.product.ProductImage?
                <img src={
                  props.product.ProductImage.length!==0?
                    props.product.ProductImage[imageIndex].path instanceof File?
                      URL.createObjectURL(props.product.ProductImage[imageIndex].path)
                      :
                      `${BACKEND_BASE}/${props.product.ProductImage[imageIndex].path}`
                    :
                    null
                } 
                  alt='' />
                :
                null
            }

          </div>
          <img onClick={changePicForward} src={`${BACKEND_BASE}/right.png`} className={StoreManageGridElementCss.ProductCardForward} alt='changePic'/>
        </div>
        
        <div className={StoreManageGridElementCss.StoreManageGridElement_ProductName}>
          <span>{props.product.ProductName}</span>
        </div>
        
        <div className={StoreManageGridElementCss.StoreManageGridElement_Actions}>
          <button className={StoreManageGridElementCss.button66} onClick={toggleUpdateForm}>UPDATE</button>
          <button className={StoreManageGridElementCss.button66} onClick={DeleteProduct}>DELETE</button>
        </div>
        
      </div>
    </>    
  )
  
}

export default StoreManageGridElement