import React, { useState } from 'react';
import StoreManageCss from './StoreManage.module.css';
import StoreManageNavBar from './StoreManageNavBar/StoreManageNavBar';
import StoreManageGrid from './StoreManageGrid/StoreManageGrid';
import StoreManageAccount from './StoreManageAccount/StoreManageAccount';
import Template from './Template/Template';
import StoreManageFooter from './StoreManageFooter/StoreManageFooter';

export default function StoreManage() {

  const [optionSelected, setOptionSelected] = useState('Maintain Store')


  return (
    <div className={StoreManageCss.StoreManagePageContainer_div}>
          <StoreManageNavBar optionSelected={optionSelected} setOptionSelected={setOptionSelected}/>
          {/* -------------------------CONDITIONAL RENDERING-------------------------- */}
          {optionSelected==='Maintain Store'?
          <StoreManageGrid/>
          :
          optionSelected==='Maintain Account'?
          <StoreManageAccount/>
          :
          optionSelected==='Template'?
          <Template/>
          :
          null}
          {/* -------------------------CONDITIONAL RENDERING-------------------------- */}
          <StoreManageFooter/>
    </div>
  )
}
