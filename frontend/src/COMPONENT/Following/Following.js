import React, { useEffect } from 'react'
import CSS from './Following.module.css'
import ReactLoading from 'react-loading';
import FollowingCard from './FollowingCard';
import { APICALL_FETCH_FOLLOWERS } from '../../REDUX/REDUCERS/FOLLOW_REDUCER';
import { useDispatch, useSelector } from 'react-redux';

function Following(props) {

    const dispatch = useDispatch() 
    const Followers = useSelector((state)=>{
        return state.follow
    })

    useEffect(()=>{
        dispatch(APICALL_FETCH_FOLLOWERS());
    },[dispatch])

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
            Followers.loading && !Followers.error && !Followers.success?
                <ReactLoading type='spin' color='blue' height={'3%'} width={'3%'} />         
                :
                !Followers.loading && Followers.success?
                    Followers.Followers.map((follower,key)=>{
                        return <FollowingCard follower={follower} key={key}/>
                    })
                    :
                    !Followers.loading && Followers.error?
                        <span>INTERNAL SERVER ERROR</span>
                        :
                        null
        }

        </div>
    )
}

export default Following