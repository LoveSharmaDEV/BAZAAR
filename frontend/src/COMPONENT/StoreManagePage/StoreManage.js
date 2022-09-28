import React, { useEffect, useState } from 'react';
import CSS from './StoreManage.module.css';
import StoreManageNavBar from './StoreManageNavBar/StoreManageNavBar';
import StoreManageGrid from './StoreManageGrid/StoreManageGrid';
import StoreManageAccount from './StoreManageAccount/StoreManageAccount';

export default function StoreManage(props) {

  const [optionSelected, setOptionSelected] = useState('Maintain Store')
  useEffect(()=>{
    props.setBarVisibility(
      {
        rightNavBarVisibility:true,
        leftNavBarVisibility:true,
        topNavBarVisibility:true,
        EcomNavBarVisibility:false
      }
    );
  },[])

  return (
    <div className={CSS.StoreManagePageContainer_div}>
          <StoreManageNavBar optionSelected={optionSelected} setOptionSelected={setOptionSelected}/>
          {/* -------------------------CONDITIONAL RENDERING-------------------------- */}
          {optionSelected==='Maintain Store'?
          <StoreManageGrid/>
          :
          optionSelected==='Account Status'?
          <StoreManageAccount/>
          :
          null}
          {/* -------------------------CONDITIONAL RENDERING-------------------------- */}
    </div>
  )
}
