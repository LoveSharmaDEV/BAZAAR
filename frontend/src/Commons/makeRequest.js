// IMPORT DEPENDENCIES
import axios from 'axios';



/* 
makeRequest()
1. Shoots request with Bearer Token
2. If Token invalid, refreshes it and then shoots the request again
*/
export default  async function makeRequest(api,data={},method){
    let response;
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if(method==='GET') response = await axios.get(api,data,{ headers: { Authorization: `Bearer ${accessToken}` }});
    if(method==='POST') response = await axios.post(api,data,{ headers: { Authorization: `Bearer ${accessToken}`}});
    

    if(response.data.errCode==="UNAUTHORIZED")
    {
        response = await axios.post('http://localhost:8000/refresh', {refreshToken});
        if(response.data.errCode==="UNAUTHORIZED") return response
        else
        {
            localStorage.setItem('accessToken',response.data.accessToken);
            if(method==='GET')response = await axios.get(api,{ headers: { Authorization: `Bearer ${response.data.accessToken}` }});
            if(method==='POST')response = await axios.post(api,data,{ headers: { Authorization: `Bearer ${response.data.accessToken}`}});
        }
    }
    return response
}