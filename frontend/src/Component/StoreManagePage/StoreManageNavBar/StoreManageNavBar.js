import React from 'react'
import StoreManageNavBarCss from './StoreManageNavBar.module.css' 
import StoreManageNavBarData from './StoreManageNavBarData'

function StoreManageNavBar(props) {
  
    const onTabClick= (e) =>
    {
        props.setOptionSelected(e.target.dataset.option);
    }
  
    return (
    <div className={StoreManageNavBarCss.StoreManageNavBar_div}>
        <div className={StoreManageNavBarCss.StoreManageNavBar_Tabs_div}>
            {StoreManageNavBarData.map((option,key)=>
                <div className={StoreManageNavBarCss.StoreManageNavBar_TabsOption_div}
                onClick={onTabClick}
                data-option={option.title}
                key={key}
                >
                    {option.title}
                </div>
            )}
        </div>
        
        {/*
        props.optionSelected==='Maintain Store'
        ?
        <div className={StoreManageNavBarCss.StoreManageNavBar_Search_div}>
            <input type='text' placeholder='Search Product'/>
        </div>
        :
        null
        */}

    </div>
  )
}

export default StoreManageNavBar