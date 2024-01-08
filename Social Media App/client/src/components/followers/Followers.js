import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Followers.scss'
import { useDispatch, useSelector } from 'react-redux';
import { followAndUnfollowUser } from '../redux/slices/feedSlice';
import { useNavigate } from 'react-router-dom';

function Followers({ user }) {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const feedData = useSelector(state => state.feedDataReducer.feedData)
    const [isFollowing, setIsFollowing] = useState();

    useEffect(() => {
        setIsFollowing(feedData.followings.find(item => item._id === user._id))
    }, [feedData])

    function handleUserFollow() {
        dispatch(followAndUnfollowUser({
            userIdToFollow: user._id,
        }))
    }

    return (
        <div className='followers'>
            <div className='user-info' onClick={() => Navigate(`/profile/${user._id}`)}>
                <Avatar src={user?.avatar?.url} />
                <h4 className='name'>{user?.name}</h4>
            </div>
            <h5 onClick={handleUserFollow} className={isFollowing ? 'hover-link follow-link' : 'btn-primary'}>{isFollowing ? 'unfollow' : 'follow'}</h5>
        </div>
    )
}

export default Followers
