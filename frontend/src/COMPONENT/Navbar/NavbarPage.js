import React, {useState } from 'react';
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import {Link, useNavigate} from 'react-router-dom';
import NavCss from './NavbarPage.module.css';
import axios from 'axios';
import ReactLoading from "react-loading";
import SearchResult from './SearchResult';
import { BACKEND_BASE} from '../../MasterData/GlobalData';
import { ECOMM_API } from '../../MasterData/GlobalData';


export default function NavbarPage(props) {
  const auth = useAuth();
  const [searchStore, setSearchStore]= useState({
    loading:false,
    data:[]
  });

  const navigate = useNavigate();
  const {user} = auth;
  const logout = ()=>{
    auth.logout();
    navigate('/login');
  }

  const populateSearch= async (e)=>{
    if(e.target.value){
      setSearchStore({...searchStore, loading:true});
      const result = await axios.post(ECOMM_API.NAV_SEARCH_STORE,{key:e.target.value});
      setSearchStore({...searchStore, loading:false, data:result.data.data})
    }
  }


  return (
    <div className={NavCss.NavBar}>
      <div className={NavCss.NavBar__Logo}>
        <img onClick={()=>{navigate('/home')}} src={`${BACKEND_BASE}/Logo.jpg`} alt=''/>
      </div>
      <div className={NavCss.NavBar_Search}>
        <input type='text' placeholder='Search' onChange={populateSearch} required/>
        <div className={NavCss.NavBar_SearchPopulate}>
          {
            searchStore.loading?
            <ReactLoading type="spin" color="#0000FF" height={100} width={50}/>
            :
            searchStore.data.map((store,key)=>{
              if(store.owner!==user?._id) return <SearchResult store={store} key={key}/>
              return null
          })}
        </div>
      </div>
      {
        !user?
        <div className={NavCss.NavBarLinkDiv}> 
          <Link className={NavCss.NavBarLink} to={'/login'}>
            <button className={NavCss.button66}>Login</button>
          </Link>
          <Link className={NavCss.NavBarLink} to={'/signupas'}>
            <button className={NavCss.button66}>Sign Up</button>        
          </Link>          
        </div>
        :
        <div className={NavCss.NavBarLinkDiv}> 
            <button onClick={logout} className={NavCss.button66}>Log Out</button>        
        </div>
      }
    </div>
  )
}