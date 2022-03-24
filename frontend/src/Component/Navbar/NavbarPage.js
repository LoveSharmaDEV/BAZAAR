import React, {useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import NavCss from './NavbarPage.module.css';
import { useAuth } from '../../Hooks/index';
import axios from 'axios';
import ReactLoading from "react-loading";
import SearchResult from './SearchResult';


export default function NavbarPage() {
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
      const result = await axios.post('http://localhost:8000/search/store',{key:e.target.value});
      setSearchStore({...searchStore, loading:false, data:result.data.data})
    }

  }

  return (
    <div className={NavCss.NavBar}>
      <div className={NavCss.NavBar_Search}>
        <input type='text' placeholder='Search' onChange={populateSearch} required/>
        <div className={NavCss.NavBar_SearchPopulate}>
          {searchStore.loading?<ReactLoading type="spin" color="#0000FF" height={100} width={50}/>
          :searchStore.data.map((store,key)=>{
            if(store.owner!==user?._id) return <SearchResult store={store} key={key}/>
            return null
          })}
        </div>
      </div>
      {
      !user?
      <div className={NavCss.NavBarLinkDiv}> 
        <Link className={NavCss.NavBarLink} to={'/login'}>Login</Link>
        <Link className={NavCss.NavBarLink} to={'/signupas'}>Signup</Link>          
      </div>:
      
      <div className={NavCss.NavBarLinkDiv}> 
        <div className={NavCss.NavBarLink} to={'/login'} onClick={logout}>Logout</div>          
      </div>
      }
    </div>
  )
}
