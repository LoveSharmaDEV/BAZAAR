import React from 'react'
import CSS from './StoreManageNavBar.module.css' 
import StoreManageNavBarData from './StoreManageNavBarData'

function StoreManageNavBar(props) {
  
    const onTabClick= (e) =>
    {
        props.setOptionSelected(e.target.dataset.option);
    }
  
    return (
    <div className={CSS.StoreManageNavBar_div}>
        <div className={CSS.StoreManageNavBar_Tabs_div}>
            {StoreManageNavBarData.map((option,key)=>
                <div className={CSS.StoreManageNavBar_TabsOption_div}
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
        <div className={CSS.StoreManageNavBar_Search_div}>
            <input type='text' placeholder='Search Product'/>
        </div>
        :
        null
        */}

    </div>
  )
}

export default StoreManageNavBar