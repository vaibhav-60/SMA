import React, { useEffect, useState } from 'react'
import './profile.scss'
import Post from '../post/Post'
import userImage from '../../assests/ghost.png'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../CreatePost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../redux/slices/PostSlice'

function Profile() {

    const navigate = useNavigate();
    const params = useParams();
    const userProfile = useSelector(state => state.postsReducer.userProfile);
    const myProfile = useSelector(state => state.AppConfigReducer.myProfile);
    const [isFollowing, setIsFollowing] = useState();
    const dispatch = useDispatch();
    const [isMyProfile, setIsMyProfile] = useState(false);

    useEffect(() => {
        dispatch(getUserProfile({
            userId: params.userId
        }))
    }, [myProfile, params.userId])

    return (
        <div className='profile'>
            <div className='container'>
                <div className='left-part'>
                    {isMyProfile && <CreatePost />}
                    {userProfile?.posts?.map(post => <Post key={post._id} post={post} />)}
                </div>
                <div className='right-part'>
                    <div className='profile-card'>
                        <img className="userImg" src={userProfile?.avatar?.url} alt='' />
                        <h3 className='user-name'>{userProfile?.name}</h3>
                        <div className='follow-following-info'>
                            <h4>{`${userProfile?.followers?.length} Followers`}</h4>
                            <h4>{`${userProfile?.followings?.length} Followings`}</h4>
                        </div>
                        {!myProfile && <button className='follow btn-primary'>follow</button>}
                        {myProfile && <button className='update-profile btn-secondary ' onClick={() => { navigate('/updateprofile') }}>update profile</button>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
