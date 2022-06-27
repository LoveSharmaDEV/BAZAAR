import StoreManageGridElementCss from './StoreManageGridElement.module.css'
import { useState } from 'react';
import StoreManageGridElementUpdate from '../StoreManageGridElementUpdate/StoreManageGridElementUpdate';

function StoreManageGridElement(props) {
  

  const [updateForm, setUpdateForm] = useState(false);

  const toggleUpdateForm = ()=>{
    setUpdateForm(true);
  }

  return (
    <>

      {
      updateForm?
      <StoreManageGridElementUpdate setUpdateForm={setUpdateForm} product={props.product}/>
      :
      null
      }

      <div className={StoreManageGridElementCss.StoreManageGridElement_OuterDiv}>

          <div className={StoreManageGridElementCss.StoreManageGridElement_ImagePanel_div}>
                {props.product.ProductImage.map((image,key)=>{
                   return (
                   <div>
                       <img src={`http://localhost:8000/${image}`} alt='ProductImage' key={key}/>
                   </div>)
                })}
          </div>

          <div className={StoreManageGridElementCss.StoreManageGridElement_Information_div}>
              <div className={StoreManageGridElementCss.StoreManageGridElement_Information_Container1_div}>
                <button className={StoreManageGridElementCss.button54} onClick={toggleUpdateForm}>UPDATE</button>
              </div>

              <div className={StoreManageGridElementCss.StoreManageGridElement_Information_Container2_div}>

              </div>
          </div>
      </div>
    </>    
  )
  
}

export default StoreManageGridElement