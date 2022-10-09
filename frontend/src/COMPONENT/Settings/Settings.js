import React, { useEffect,useState } from 'react';
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import CSS from './Settings.module.css';
import { BACKEND_BASE} from '../../MasterData/GlobalData';
import { USER_PERSONALIZATION_API } from '../../MasterData/GlobalData';
import { ECOMM_API } from '../../MasterData/GlobalData';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


export default function Settings(props) {

  const auth = useAuth();
  const navigate = useNavigate();
  const [store,setStore] = useState({storePic:''});
  const [user, setUser] = useState({...auth.user});

  const callAPI_DeactivateUser = async (e)=>{
      e.preventDefault()
      const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.DEACTIVATE_USER,{},{},'POST');
      if(response.data.errCode==='SUCCESS') auth.logout();
  }

  const callAPI_GetStore = async()=>{
    const response = await AUTHORIZED_REQ(ECOMM_API.FETCH_STORE_USERID,{},{},'POST');
    if(response.data.errCode==='SUCCESS') setStore(response.data.store) ;
  }

  const UpdateControl = async (e)=>{
    e.preventDefault();
    const LocalFormData = GET_FORMDATA({...user,...store});
    // Log the key/value pairs
// for (var pair of LocalFormData.entries()) {
//   console.log(pair[0]+ ' - ' + pair[1]); 
// }
    const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.UPDATE_USER,LocalFormData,{},'POST')
    if(response.data.errCode === 'SUCCESS') navigate('../posts')
  }



  const FORM__USERDATA = (e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value,
    })
  }

  const FORM__STOREDATA = (e)=>{
    setStore({
      ...store,
      [e.target.name]:e.target.value,
    })
  }


  const ImageUpload = (e)=>{
    if(e.target.name==='profilepic') setUser({
      ...user,
      [e.target.name]:e.target.files[0]
    })

    if(e.target.name==='storePic') setStore({
      ...store,
      [e.target.name]:e.target.files[0]
    })


  }

  useEffect(()=>{
    callAPI_GetStore();
    props.setBarVisibility(
      {
        rightNavBarVisibility:true,
        leftNavBarVisibility:true,
        topNavBarVisibility:true,
        EcomNavBarVisibility:false
      }
    );
  },[ ])

  return (
    <div className={CSS.OuterContainer}>
      <div className={CSS.OuterContainer__ImageSection}>
        <div className={CSS.ImageSection__ProfilePic}>
          <img src={
                      user.profilepic?
                        user.profilepic instanceof File?
                        URL.createObjectURL(user.profilepic)
                        :
                        `${BACKEND_BASE}/${user.profilepic}`
                      :
                      `${BACKEND_BASE}/DefaultProfilePic.png`
                    } 
                    alt=''
          />
          <span>PROFILE PIC</span>
          <input onChange={ImageUpload} type='file' name='profilepic'/>
        </div>
        {
          auth.user && store?
            auth.user.role==='SELLER'?
              <div className={CSS.ImageSection__StorePic}>
                <img src={
                            store.storePic?
                              store.storePic instanceof File?
                                URL.createObjectURL(store.storePic)
                                :
                                `${BACKEND_BASE}/${store.storePic}`
                              :
                              `${BACKEND_BASE}/DefaultStorePic.png`
                          } 
                          alt=''
                />
                <span>STORE PIC</span>
                <input onChange={ImageUpload} type='file' name='storePic'/>
              </div>
              :
              null
            :
            null
        }

      </div>
      <form className={CSS.OuterContainer__InputForm} >
      {
          auth.user?
          <div className={CSS.signupcard}>
            <div className={CSS.signupcardinput}>
              
              <div className={CSS.inputdata}>
                <input name='email' type='text' value={user.email} onChange={FORM__USERDATA} required/>
                <div className={CSS.underline}></div>
                <label>Email</label>
              </div> 

              <div className={CSS.inputdata}>
                <input name='username' type='text' autoComplete='off' value={user.username} onChange={FORM__USERDATA} required/>
                <div className={CSS.underline}> </div>
                <label>Username</label>
              </div> 

              <div className={CSS.inputdata}>
                <input name='contact' type='tel' autoComplete='off' value={user.contact} onChange={FORM__USERDATA} required/>
                <div className={CSS.underline}></div>
                <label>Contact No.</label>
              </div> 

              <div className={CSS.inputdata}>
                <input name='DOB' type='Date' autoComplete='off'  value={new Date(user.DOB).toISOString().split('T')[0]} onChange={FORM__USERDATA} required/>
                <div className={CSS.underline}></div>
                <label>DOB</label>
              </div>

              {
                auth.user.role==='SELLER'?
                  <div className={CSS.inputdata}>
                    <input name='storeName' type='text' autoComplete='off'  value={store?.storeName} onChange={FORM__STOREDATA} required/>
                    <div className={CSS.underline}></div>
                    <label>Store Name</label>
                    <input type='hidden' name="role" value="SELLER" />
                  </div>
                  :
                  <input type='hidden' name="role" value="CUSTOMER" /> 
              } 

            </div> 

            <div className={CSS.ActionBtns}>
              <Button className='mx-3' onClick={UpdateControl} variant="primary" size='lg'>UPDATE</Button>
              <Button className='mx-3' onClick={callAPI_DeactivateUser} variant="primary" size='lg'>DEACTIVATE</Button>
           </div>

          </div>
            :
            null
        }

      </form>
    </div>
  )
}

/* ---> HELPER FUNCTIONS <--- */


function GET_FORMDATA(FormDataVar) 
{
  const LocalFormData = new FormData();
  LocalFormData.append('email', FormDataVar.email);
  LocalFormData.append('username', FormDataVar.username);
  LocalFormData.append('contact', FormDataVar.contact);
  LocalFormData.append('DOB', FormDataVar.DOB);
  LocalFormData.append('ProductID', FormDataVar.DOB);
  if(FormDataVar.role==='SELLER') LocalFormData.append('storeName', FormDataVar.storeName);
  LocalFormData.append('profilepicupload', FormDataVar.profilepic);
  LocalFormData.append('storePicupload', FormDataVar.storePic);

  return LocalFormData

} 

/* ---> HELPER FUNCTIONS <--- */
