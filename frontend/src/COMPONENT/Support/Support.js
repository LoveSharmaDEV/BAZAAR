import React from 'react'
import { BACKEND_BASE } from '../../MasterData/GlobalData'
import CSS from './Support.module.css'

function Support() {
  return (
    <div className={CSS.OuterDiv}>
        <img src={`${BACKEND_BASE}/noentry.png`}/>
        <span>SERVICE CURRENTLY NOT AVAILABLE</span>
    </div>
  )
}

export default Support