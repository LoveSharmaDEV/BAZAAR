import React, { useEffect,useState } from 'react';
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import CSS from './Settings.module.css';
import { BACKEND_BASE} from '../../MasterData/GlobalData';
import { USER_PERSONALIZATION_API } from '../../MasterData/GlobalData';
import { ECOMM_API } from '../../MasterData/GlobalData';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner';


export default function Settings(props) {

  const auth = useAuth();
  const navigate = useNavigate();
  const [store,setStore] = useState({storePic:''});
  const [user, setUser] = useState({...auth.user});
  const [RequestStatus,setRequestStatus] = useState({loading:false,error:false,success:false})


  const callAPI_DeactivateUser = async (e)=>{
      e.preventDefault()
      const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.DEACTIVATE_USER,{},{},'POST');
      if(response.data.errCode==='SUCCESS') auth.logout();
  }

  const callAPI_GetStore = async()=>{
    setRequestStatus({...RequestStatus,loading:true,error:false,success:false});

    const response = await AUTHORIZED_REQ(ECOMM_API.FETCH_STORE_USERID,{},{},'POST');

    if(response.data.errCode==="UNAUTHORIZED"){
      setRequestStatus({...RequestStatus,loading:false,error:true,success:false});
      auth.logout();
      navigate('/login');
    }

    if(response.data.errCode==='SUCCESS') {
      setRequestStatus({...RequestStatus,loading:false,error:false,success:true});
      setStore(response.data.store) ;
    }

    if(response.data.errCode==='FAILURE') {
      setRequestStatus({...RequestStatus,loading:false,error:false,success:true});
    }

  }

  const UpdateControl = async (e)=>{
    e.preventDefault();
    const LocalFormData = GET_FORMDATA({...user,...store});
    const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.UPDATE_USER,LocalFormData,{},'POST')
    if(response.data.errCode === 'SUCCESS') {
      navigate('../posts')
    }
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

          <img className={CSS.ProfilePic__IMG} src={
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

          <div className={CSS.ProfilePic__UPLOADBTN}>
            <input onChange={ImageUpload} type='file' name='profilepic'/>
            <img src={`${BACKEND_BASE}/upload.png`} alt=''/>
          </div>

        </div>
        {
          user && store?
            user.role==='SELLER'?
              <div className={CSS.ImageSection__StorePic}>
                <img className={CSS.StorePic__IMG} src={
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
                <div className={CSS.ProfilePic__UPLOADBTN}>
                  <input onChange={ImageUpload} type='file' name='storePic'/>
                  <img src={`${BACKEND_BASE}/upload.png`} alt=''/>
                </div>


              </div>
              :
              null
            :
            null
        }
        <div className={CSS.ImageSection__RoleCheckBox}>
          <div className={CSS.RoleCheckBox__Header}>
            <span>USER ROLE</span>
          </div>
          <div className={CSS.RoleCheckBox__CustomerCheck}>
            <span>CUSTOMER</span>
            <div className={CSS.CustomerCheck}>
              <img src={`${BACKEND_BASE}/people.png`} alt=''/>
              <input 
              type='checkbox' 
              name='role' 
              value='CUSTOMER' 
              checked={user.role==='CUSTOMER'?true:false}
              onChange={FORM__USERDATA}
              />
            </div>
          </div>
          <div className={CSS.RoleCheckBox__SellerCheck}>
            <span>SELLER</span>
            <div className={CSS.SellerCheck}>
              <img src={`${BACKEND_BASE}/seller.png`} alt=''/>
              <input 
              type='checkbox' 
              name='role' 
              value='SELLER' 
              checked={user.role==='SELLER'?true:false}
              onChange={FORM__USERDATA}
              />
            </div>
          </div>
        </div>  

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
                user.role==='SELLER'?
                  <div className={CSS.inputdata}>
                    {
                      RequestStatus.loading?
                      <Spinner animation="border" /> 
                      :
                      <>
                        <input name='storeName' type='text' autoComplete='off'  value={store?.storeName} onChange={FORM__STOREDATA} required/>
                        <div className={CSS.underline}></div>
                        <label>Store Name</label>
                      </>

                    }

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
  LocalFormData.append('role', FormDataVar.role);


  return LocalFormData

} 

/* ---> HELPER FUNCTIONS <--- */
