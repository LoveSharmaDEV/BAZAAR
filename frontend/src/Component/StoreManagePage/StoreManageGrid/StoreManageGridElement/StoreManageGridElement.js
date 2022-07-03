import StoreManageGridElementCss from './StoreManageGridElement.module.css'
import { useState } from 'react';
import StoreManageGridElementUpdate from '../StoreManageGridElementUpdate/StoreManageGridElementUpdate';
import { DELETE_FROM_STOCK } from '../../../../Redux/Reducers/fetchAvailableStock_reducer';
import { useDispatch } from 'react-redux';
import makeRequest from '../../../../Commons/makeRequest';

function StoreManageGridElement(props) {
  
  const dispatch = useDispatch();
  const [updateForm, setUpdateForm] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

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
      setUpdateForm(true);
  }

  const DeleteProduct = async()=>{

    const response = await makeRequest('http://localhost:8000/store/delete/stock',{productID:props.product._id},'POST');
    console.log(response.data)
    if(response.data.errCode==='SUCCESS') dispatch(DELETE_FROM_STOCK(props.product._id));
  }

  return (
    <>

      {
      updateForm?
      <StoreManageGridElementUpdate setUpdateForm={setUpdateForm} product={props.product}/>
      :
      null
      }

      <div className={StoreManageGridElementCss.StoreManageGridElement}>
        <div className={StoreManageGridElementCss.StoreManageGridElement_ImageCarousal}>
          <img onClick={changePicBackward} src='http://localhost:8000/right.png' className={StoreManageGridElementCss.ProductCardBackward} alt='changePic'/>
          <div className={StoreManageGridElementCss.StoreManageGridElement_ImagePanel_div}>
            
            {
            props.product.ProductImage?
              <img src={
                props.product.ProductImage[imageIndex].path instanceof File?
                URL.createObjectURL(props.product.ProductImage[imageIndex].path):
                `http://localhost:8000/${props.product.ProductImage[imageIndex].path}`
              } 
                alt='ProductImage' />
              :
              null
            }

          </div>
          <img onClick={changePicForward} src='http://localhost:8000/right.png' className={StoreManageGridElementCss.ProductCardForward} alt='changePic'/>
        </div>
        
        <div className={StoreManageGridElementCss.StoreManageGridElement_ProductName}>
          <span>{props.product.ProductName}</span>
        </div>
        
        <div className={StoreManageGridElementCss.StoreManageGridElement_Actions}>
          <button className={StoreManageGridElementCss.button54} onClick={toggleUpdateForm}>UPDATE</button>
          <button className={StoreManageGridElementCss.button54} onClick={DeleteProduct}>DELETE</button>
        </div>
        
      </div>
    </>    
  )
  
}

export default StoreManageGridElement