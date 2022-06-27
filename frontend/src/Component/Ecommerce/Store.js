import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Store = (props) => {
    

    useEffect(()=>{
        props.setleftNavBarVisibility(false)
        props.setrightNavBarVisibility(false)
    },[props])

  return (
    <div>Hi</div>
  )
}

export default Store