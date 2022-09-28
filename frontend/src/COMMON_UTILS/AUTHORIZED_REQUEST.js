/* ---> IMPORT DEPENDENCIES <--- */
import axios from 'axios';
import { AUTH_API} from '../MasterData/GlobalData';

/*
SUMMARY!! 
makeRequest()
1. Shoots request with Bearer Token
2. If Token invalid, refreshes it and then shoots the request again
*/

const REFRESHTHESESSION = async (api,data={},headeroption,method)=>{
    const refreshToken = localStorage.getItem('refreshToken');
    let response = await axios.post(AUTH_API.REFRESH_API, {refreshToken});
    if(response.data.errCode==="UNAUTHORIZED") return response
    else
    {
        localStorage.setItem('accessToken',response.data.accessToken);
        if(method==='GET') response = await axios.get(api,
            {
                 headers: { Authorization: `Bearer ${response.data.accessToken}`,...headeroption }
            });
        if(method==='POST') response = await axios.post(api,
            data,
            {
                 headers: { Authorization: `Bearer ${response.data.accessToken}`,...headeroption}
            });
    }
    return response
}



export default  async function makeRequest(api,data={},headeroption,method){
    try{
        let response;
        const accessToken = localStorage.getItem('accessToken');    
        if(method==='GET') response = await axios.get(api,
            { 
                headers: { Authorization: `Bearer ${accessToken}`, ...headeroption}
            });
        if(method==='POST') response = await axios.post(api,
            data,
            { 
                headers: { Authorization: `Bearer ${accessToken}`, ...headeroption}
            });
        if(response.data.errCode==="UNAUTHORIZED") response=REFRESHTHESESSION(api,data,headeroption,method)
        return response
    }
    catch(e)
    {
        console.log(`ERROR OCCURED ${e.message} API CALL ${api}`)
    }
}