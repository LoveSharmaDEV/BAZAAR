import React, { useEffect, useState } from 'react'
import css from './Feeds.module.css'
import RightNavBar from '../RightNavBar/RightNavBar';
import LeftNavBar from '../LeftnavBar/LeftNavBar';
import MidFeedsBar from '../MidFeedsBar/MidFeedsBar';

 



export default function Feeds() {

  
  return (
    <div className={css.main}>
      <MidFeedsBar optionSelected={optionSelected} />
      <RightNavBar/>
    </div>
  )
}
