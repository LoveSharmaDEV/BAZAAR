import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ToastProvider} from 'react-toast-notifications';
import {  useState } from 'react';
import { useAuth } from './CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { useOverlayContext } from './CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import LandingPage from './COMPONENT/Landing/LandingPage';
import NavbarPage from './COMPONENT/Navbar/NavbarPage';
import SignUpAsPage from './COMPONENT/SignUpAs/SignUpAsPage';
import SignupPage from './COMPONENT/Signup/SignupPage';
import LoginPage from './COMPONENT/Login/LoginPage';
import ReactLoading from "react-loading";
import RightNavBar from './COMPONENT/RightNavBar/RightNavBar';
import Cookies from 'universal-cookie';
import LeftNavBar from './COMPONENT/LeftnavBar/LeftNavBar';
import Posts from './COMPONENT/Posts/Posts';
import StoreManage from './COMPONENT/StoreManagePage/StoreManage';
import Overlay from './COMPONENT/Overlays/Overlay';
import Store from './COMPONENT/Ecommerce/Store/Store';
import EcomNavBar from './COMPONENT/Ecommerce/EcomNavBar/EcomNavBar';
import ProductView from './COMPONENT/Ecommerce/ProductView/ProductView';
import Cart from './COMPONENT/Ecommerce/Cart/Cart';
import Following from './COMPONENT/Following/Following';
import Settings from './COMPONENT/Settings/Settings';
import Support from './COMPONENT/Support/Support';
const cookies = new Cookies();

export const RequireAuth = function ({ children }) {
  const auth = useAuth();
  if(auth.user && !auth.loading) return children;
  if(!auth.user && auth.loading) return <ReactLoading type="spin" color="#0000FF" height={100} width={50}/>;
  if(!auth.user && !auth.loading) return <Navigate to='/login'/>;
}

export const RestrictPath = function ({children}){
  const auth = useAuth();
  if(!auth.user && !auth.loading) return children;
  if(!auth.user && auth.loading) return <ReactLoading type="spin" color="#0000FF" height={100} width={50}/>;
  if(auth.user && !auth.loading) return <Navigate to={cookies.get('selectedPath')?cookies.get('selectedPath'):'/posts'}/>
}


function App() {
  const auth = useAuth();
  const overlay = useOverlayContext();
  const [BarVisibility,setBarVisibility] = useState(
    {
      rightNavBarVisibility:true,
      leftNavBarVisibility:true,
      topNavBarVisibility:true,
      EcomNavBarVisibility:false
    }
  ) 

  const [optionSelected, setOptionSelected] = useState(cookies.get('optionSelected')?cookies.get('optionSelected'):'Home');
  

  
  return (
      <Router>
        
        {
          overlay.showOverlay?
          <ToastProvider><Overlay data={overlay.customOverlayProps} setBarVisibility={setBarVisibility} /></ToastProvider>
          :
          null
        }

        {
          BarVisibility.topNavBarVisibility
          ?
          <NavbarPage/>:
          null
        }

        {
          BarVisibility.EcomNavBarVisibility
          ?
          <EcomNavBar/>:
          null
        }
        
        <div className='main_div_body'>

          {
            auth.user && BarVisibility.leftNavBarVisibility
            ?
              <LeftNavBar optionSelected={optionSelected} setOptionSelected={setOptionSelected}/>
            :
            null
          }

          <Routes>

            <Route exact path = '' element={<Navigate to={'/home'}/>}/>
            <Route exact path = 'home' element={<LandingPage setBarVisibility={setBarVisibility}/>}/>
            <Route exact path = 'login' element={ <RestrictPath><ToastProvider><LoginPage setBarVisibility={setBarVisibility}/></ToastProvider></RestrictPath>}/>
            <Route exact path  ='signupas' element={<RestrictPath><SignUpAsPage/></RestrictPath>}/>
            <Route exact path = 'signup' element={<RestrictPath><ToastProvider><SignupPage/></ToastProvider></RestrictPath>}/>
            <Route exact path = 'posts' element={<RequireAuth><ToastProvider><Posts setBarVisibility={setBarVisibility}/></ToastProvider></RequireAuth>}/>
            <Route exact path = 'following' element={<RequireAuth><ToastProvider><Following setBarVisibility={setBarVisibility}/></ToastProvider></RequireAuth>}/> 
            <Route exact path = 'store' element={<RequireAuth><ToastProvider><StoreManage setBarVisibility={setBarVisibility}/></ToastProvider></RequireAuth>}/> 
            <Route exact path = 'settings' element={<RequireAuth><ToastProvider><Settings setBarVisibility={setBarVisibility}/></ToastProvider></RequireAuth>}/> 
            <Route exact path = 'support' element={<RequireAuth><ToastProvider><Support/></ToastProvider></RequireAuth>}/>                                 
            <Route exact path = 'store/:storeName' element={<Store setBarVisibility={setBarVisibility}/>}/>
            <Route exact path = 'product/:storeName/:productID' element={<ProductView setBarVisibility={setBarVisibility}/>}/>
            <Route exact path = 'cart' element={<ToastProvider><Cart setBarVisibility={setBarVisibility}/></ToastProvider>} />
          
          </Routes>

          {
            auth.user && BarVisibility.rightNavBarVisibility
            ?
              <RightNavBar/>
            :
            null
          }

        </div>
      </Router>
  );
}

export default App;
