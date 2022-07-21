import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LandingPage from './Component/Landing/LandingPage';
import NavbarPage from './Component/Navbar/NavbarPage';
import SignUpAsPage from './Component/SignUpAs/SignUpAsPage';
import SignupPage from './Component/Signup/SignupPage';
import LoginPage from './Component/Login/LoginPage';
import { ToastProvider} from 'react-toast-notifications';
import { useAuth } from './Hooks';
import ReactLoading from "react-loading";
import RightNavBar from './Component/RightNavBar/RightNavBar';
import Cookies from 'universal-cookie';
import LeftNavBar from './Component/LeftnavBar/LeftNavBar';
import {  useState } from 'react';
import Posts from './Component/Posts/Posts';
import StoreManage from './Component/StoreManagePage/StoreManage';
import { useOverlayContext } from './Hooks/overlay';
import Overlay from './Component/Overlays/Overlay';
import Store from './Component/Ecommerce/Store/Store';
import EcomNavBar from './Component/Ecommerce/EcomNavBar/EcomNavBar';
import ProductView from './Component/Ecommerce/ProductView.js/ProductView';
const cookies = new Cookies();

/*------------------------------------------------------HELPER FUNCTIONS------------------------------------------------------------------*/

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

/*------------------------------------------------------HELPER FUNCTIONS------------------------------------------------------------------*/

function App() {
  const auth = useAuth();
  const overlay = useOverlayContext();
  const [rightNavBarVisibility, setrightNavBarVisibility] = useState(true);
  const [leftNavBarVisibility, setleftNavBarVisibility] = useState(true);
  const [topNavBarVisibility, settopNavBarVisibility] = useState(true);
  const [EcomNavBarVisibility, setEcomNavBarVisibility] = useState(false);


  const [optionSelected, setOptionSelected] = useState(cookies.get('optionSelected')?cookies.get('optionSelected'):'Home');
  

  
  return (
      <Router>
        {/*-----------------------------------------OVERLAY--------------------------------------*/}
        
        {overlay.showOverlay?<ToastProvider><Overlay data={overlay.customChatProps}/></ToastProvider>:null}

        {/*-----------------------------------------OVERLAY--------------------------------------*/}

        {
          topNavBarVisibility
          ?
          <NavbarPage/>:
          null
        }
        {
          EcomNavBarVisibility
          ?
          <EcomNavBar/>:
          null
        }
        
        <div className='main_div_body'>
          {
            auth.user&&leftNavBarVisibility
            ?
              <LeftNavBar optionSelected={optionSelected} setOptionSelected={setOptionSelected}/>
            :
            null
          }
          <Routes>
            <Route exact path=''  element={<LandingPage/>}/>
            <Route exact path='home' element={<LandingPage/>}/>
            <Route exact path='login' element={ <RestrictPath><ToastProvider><LoginPage 
                                                                    settopNavBarVisibility={settopNavBarVisibility}
                                                                    setEcomNavBarVisibility={setEcomNavBarVisibility}/>
                                                                </ToastProvider></RestrictPath>}/>
            <Route exact path='signupas' element={<RestrictPath><SignUpAsPage/></RestrictPath>}/>
            <Route exact path='signup' element={<RestrictPath><ToastProvider><SignupPage/></ToastProvider></RestrictPath>}/>
            <Route exact path='posts' element={<RequireAuth><ToastProvider><Posts setrightNavBarVisibility={setrightNavBarVisibility} 
                                                                    setleftNavBarVisibility={setleftNavBarVisibility} 
                                                                    settopNavBarVisibility={settopNavBarVisibility}
                                                                    setEcomNavBarVisibility={setEcomNavBarVisibility} />
                                                              </ToastProvider></RequireAuth>}/>
            <Route exact path='customers' element={<RequireAuth><ToastProvider>customers</ToastProvider></RequireAuth>}/>  
            <Route exact path='following' element={<RequireAuth><ToastProvider>following</ToastProvider></RequireAuth>}/> 
            <Route exact path='favourites' element={<RequireAuth><ToastProvider>favourites</ToastProvider></RequireAuth>}/> 
            <Route exact path='cart' element={<RequireAuth><ToastProvider>cart</ToastProvider></RequireAuth>}/> 
            <Route exact path='store' element={<RequireAuth><ToastProvider><StoreManage/></ToastProvider></RequireAuth>}/> 
            <Route exact path='settings' element={<RequireAuth><ToastProvider>settings</ToastProvider></RequireAuth>}/> 
            <Route exact path='support' element={<RequireAuth><ToastProvider>support</ToastProvider></RequireAuth>}/>                                 
            <Route exact path = 'store/:storeName' element={<Store setrightNavBarVisibility={setrightNavBarVisibility} 
                                                                    setleftNavBarVisibility={setleftNavBarVisibility} 
                                                                    settopNavBarVisibility={settopNavBarVisibility}
                                                                    setEcomNavBarVisibility={setEcomNavBarVisibility}
                                                                    />
                                                            }/>
            <Route exact path = 'product/:storeName/:productID' element={<ProductView setrightNavBarVisibility={setrightNavBarVisibility} 
                                                                    setleftNavBarVisibility={setleftNavBarVisibility} 
                                                                    settopNavBarVisibility={settopNavBarVisibility}
                                                                    setEcomNavBarVisibility={setEcomNavBarVisibility}
                                                                    />
                                                            } />
          </Routes> 
          {
            auth.user&&rightNavBarVisibility
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
