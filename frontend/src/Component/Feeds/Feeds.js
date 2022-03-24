import React, { useEffect, useState } from 'react'
import css from './Feeds.module.css'
import RightNavBar from '../RightNavBar/RightNavBar';
import LeftNavBar from '../LeftnavBar/LeftNavBar';
import MidFeedsBar from '../MidFeedsBar/MidFeedsBar';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
 



export default function Feeds() {
  const [optionSelected, setOptionSelected] = useState('Home');

  useEffect(()=>{
   setOptionSelected(cookies.get('optionSelected')?cookies.get('optionSelected'):'Home')
  },[])
  
  return (
    <div className={css.main}>
      <LeftNavBar optionSelected={optionSelected} setOptionSelected={setOptionSelected}/>
      <MidFeedsBar optionSelected={optionSelected} />
      <RightNavBar/>
    </div>
  )
}
