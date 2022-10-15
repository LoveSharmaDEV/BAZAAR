import React, { useCallback, useEffect, useState } from 'react'
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST'
import CSS from './Following.module.css'
import ReactLoading from 'react-loading';
import FollowingCard from './FollowingCard';
import { USER_PERSONALIZATION_API } from '../../MasterData/GlobalData';

function Following(props) {

    const [apiStatus, setAPIStatus] = useState({
        loading:true,
        error:false
    })

    const [Followers, setFollowers] = useState([]);

    const callApi_fetchFollowerDetail = useCallback(async ()=>{
        setAPIStatus({
            loading:true,
            error:false
        })
        const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.FETCH_FOLLOWERS, {},{},'POST');
        if(response.data.errCode==='SUCCESS') {
            setAPIStatus({
                loading:false,
                error:false
            })  

            setFollowers(response.data.FollowersList);
        }
        else{
            setAPIStatus({
                loading:false,
                error:true
            })
        }
    },[]) 

    useEffect(()=>{
        callApi_fetchFollowerDetail();
    },[callApi_fetchFollowerDetail])

    useEffect(()=>{
        props.setBarVisibility(
            {
            rightNavBarVisibility:true,
            leftNavBarVisibility:true,
            topNavBarVisibility:true,
            EcomNavBarVisibility:false
            }
        )
    },[])

    return (
        <div className={CSS.OuterContainer}>
        {
            apiStatus.loading && !apiStatus.error?
                <ReactLoading type='spin' color='blue' height={'3%'} width={'3%'} />         
                :
                !apiStatus.loading && !apiStatus.error?
                    Followers.map((follower,key)=>{
                        return <FollowingCard follower={follower} key={key}/>
                    })
                    :
                    !apiStatus.loading && apiStatus.error?
                        <span>INTERNAL SERVER ERROR</span>
                        :
                        null
        }

        </div>
    )
}

export default Following