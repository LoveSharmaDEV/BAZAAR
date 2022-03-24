import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LandingPage from './Component/Landing/LandingPage';
import NavbarPage from './Component/Navbar/NavbarPage';
import SignUpAsPage from './Component/SignUpAs/SignUpAsPage';
import SignupPage from './Component/Signup/SignupPage';
import LoginPage from './Component/Login/LoginPage';
import Feeds from './Component/Feeds/Feeds';
import { ToastProvider} from 'react-toast-notifications';
import { useAuth } from './Hooks';
import ReactLoading from "react-loading";


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
  if(auth.user && !auth.loading) return <Navigate to='/feeds'/>
}



/*------------------------------------------------------HELPER FUNCTIONS------------------------------------------------------------------*/


function App() {

  return (
      <Router>
          <NavbarPage/>
          <Routes>
            <Route exact path=''  element={
                                            <LandingPage/>
                                          } />

            <Route exact path='home' element={
                                                <LandingPage/>
                                             } />
                                              
            <Route exact path='login' element={ <RestrictPath>
                                                  <ToastProvider>
                                                     <LoginPage/>
                                                  </ToastProvider>
                                                </RestrictPath>
                                                }/>
            <Route exact path='signupas' element={
                                                   <RestrictPath>
                                                     <SignUpAsPage/>
                                                   </RestrictPath>
                                                  } />
            <Route exact path='signup' element={
                                                  <RestrictPath>
                                                    <ToastProvider>
                                                      <SignupPage/>
                                                    </ToastProvider>
                                                  </RestrictPath>
                                                }/>
            <Route exact path='feeds' element={
                                                <RequireAuth>
                                                  <ToastProvider>
                                                      <Feeds/>
                                                  </ToastProvider>
                                                </RequireAuth>
                                              } >
                                               
            </Route>                                   
          </Routes> 
      </Router>
  );
}

export default App;
