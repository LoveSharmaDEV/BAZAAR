import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { useState, lazy, Suspense } from 'react';
import { useAuth } from './CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { useOverlayContext } from './CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';

import LandingPage from './COMPONENT/Landing/LandingPage';
import NavbarPage from './COMPONENT/Navbar/NavbarPage';
import ReactLoading from "react-loading";
import RightNavBar from './COMPONENT/RightNavBar/RightNavBar';
import Cookies from 'universal-cookie';
import LeftNavBar from './COMPONENT/LeftnavBar/LeftNavBar';
import Overlay from './COMPONENT/Overlays/Overlay';
import EcomNavBar from './COMPONENT/Ecommerce/EcomNavBar/EcomNavBar';

const LazyLoginPage = lazy(()=>{return import('./COMPONENT/Login/LoginPage')});
const LazySignUpAsPage = lazy(()=>{ return import('./COMPONENT/SignUpAs/SignUpAsPage')});
const LazySignupPage = lazy(()=>{return import('./COMPONENT/Signup/SignupPage')});
const LazyPosts = lazy(()=>{return import('./COMPONENT/Posts/Posts')});
const LazyFollowing = lazy(()=>{ return import('./COMPONENT/Following/Following')});
const LazyStoreManage = lazy(()=>{ return import('./COMPONENT/StoreManagePage/StoreManage') });
const LazySettings = lazy(()=>{return import('./COMPONENT/Settings/Settings')});
const LazySupport = lazy(()=>{return import('./COMPONENT/Support/Support')});
const LazyStore = lazy(()=>{ return import('./COMPONENT/Ecommerce/Store/Store')});
const LazyProductView = lazy(()=>{ return import('./COMPONENT/Ecommerce/ProductView/ProductView')});
const LazyCart = lazy(()=>{ return import('./COMPONENT/Ecommerce/Cart/Cart')});

const cookies = new Cookies();

export const RequireAuth = function ({ children }) {
  const auth = useAuth();
  if (auth.user && !auth.loading) return children;
  if (!auth.user && auth.loading) return <ReactLoading type="spin" color="#0000FF" height={100} width={50} />;
  if (!auth.user && !auth.loading) return <Navigate to='/login' />;
}

export const RestrictPath = function ({ children }) {
  const auth = useAuth();
  if (!auth.user && !auth.loading) return children;
  if (!auth.user && auth.loading) return <ReactLoading type="spin" color="#0000FF" height={100} width={50} />;
  if (auth.user && !auth.loading) return <Navigate to={cookies.get('selectedPath') ? cookies.get('selectedPath') : '/posts'} />
}


function App() {
  const auth = useAuth();
  const overlay = useOverlayContext();
  const [BarVisibility, setBarVisibility] = useState(
    {
      rightNavBarVisibility: true,
      leftNavBarVisibility: true,
      topNavBarVisibility: true,
      EcomNavBarVisibility: false
    }
  )

  const [optionSelected, setOptionSelected] = useState(cookies.get('optionSelected') ? cookies.get('optionSelected') : 'Home');



  return (
    <Router>

      {
        overlay.showOverlay ?
          <ToastProvider><Overlay data={overlay.customOverlayProps} setBarVisibility={setBarVisibility} /></ToastProvider>
          :
          null
      }

      {
        BarVisibility.topNavBarVisibility
          ?
          <NavbarPage /> :
          null
      }

      {
        BarVisibility.EcomNavBarVisibility
          ?
          <EcomNavBar /> :
          null
      }

      <div className='main_div_body'>

        {
          auth.user && BarVisibility.leftNavBarVisibility
            ?
            <LeftNavBar optionSelected={optionSelected} setOptionSelected={setOptionSelected} />
            :
            null
        }

        <Routes>

          <Route exact path='' element={<Navigate to={'/home'} />} />

          <Route exact path='home' element={<LandingPage setBarVisibility={setBarVisibility} />} />

          <Route exact path='login' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                              <RestrictPath>
                                                <ToastProvider>
                                                  <LazyLoginPage setBarVisibility={setBarVisibility} />
                                                </ToastProvider>
                                              </RestrictPath>
                                            </Suspense>} />

          <Route exact path='signupas' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                                  <RestrictPath>
                                                    <LazySignUpAsPage />
                                                  </RestrictPath>
                                                </Suspense>} />

          <Route exact path='signup' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                                <RestrictPath>
                                                  <ToastProvider>
                                                    <LazySignupPage />
                                                  </ToastProvider>
                                                </RestrictPath>
                                              </Suspense>} />

          <Route exact path='posts' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                              <RequireAuth>
                                                <ToastProvider>
                                                  <LazyPosts setBarVisibility={setBarVisibility} />
                                                </ToastProvider>
                                              </RequireAuth>
                                            </Suspense>} />

          <Route exact path='following' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                                  <RequireAuth>
                                                    <ToastProvider>
                                                      <LazyFollowing setBarVisibility={setBarVisibility} />
                                                    </ToastProvider>
                                                  </RequireAuth>
                                                </Suspense>} />

          <Route exact path='store' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                              <RequireAuth>
                                                <ToastProvider>
                                                  <LazyStoreManage setBarVisibility={setBarVisibility} />
                                                </ToastProvider>
                                              </RequireAuth>
                                            </Suspense>} />

          <Route exact path='settings' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                                  <RequireAuth>
                                                    <ToastProvider>
                                                      <LazySettings setBarVisibility={setBarVisibility} />
                                                    </ToastProvider>
                                                  </RequireAuth>
                                                </Suspense>} />

          <Route exact path='support' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                                  <RequireAuth>
                                                    <ToastProvider>
                                                      <LazySupport />
                                                    </ToastProvider>
                                                  </RequireAuth>
                                                </Suspense>} />

          <Route exact path='store/:storeName' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                                          <LazyStore setBarVisibility={setBarVisibility} />
                                                        </Suspense>} />

          <Route exact path='product/:storeName/:productID' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                                                      <LazyProductView setBarVisibility={setBarVisibility} />
                                                                    </Suspense>} />

          <Route exact path='cart' element={<Suspense fallback={<ReactLoading type="spin" color="#0000FF" height={100} width={50} />}>
                                              <ToastProvider><LazyCart setBarVisibility={setBarVisibility} /></ToastProvider>
                                            </Suspense>} />

        </Routes>

        {
          auth.user && BarVisibility.rightNavBarVisibility
            ?
            <RightNavBar />
            :
            null
        }

      </div>
    </Router>
  );
}

export default App;
