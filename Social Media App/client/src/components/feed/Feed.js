import React, { useEffect } from 'react'
import './Feed.scss'
import Post from '../post/Post'
import Followers from '../followers/Followers'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../redux/slices/feedSlice'
function Feed() {
    const dispatch = useDispatch();
    const feedData = useSelector(state => state.feedDataReducer.feedData)

    useEffect(() => {
        dispatch(getFeedData());
    }, [])

    return (
        <div className='Feed'>
            <div className='container'>
                <div className='left-part'>
                    {feedData?.posts.map(post => <Post key={post._id} post={post} />)}
                </div>
                <div className='right-part'>
                    <div className='following'>
                        <h3 className='title'> You are following</h3>
                        {feedData?.followings?.map(user => <Followers key={user._id} user={user} />)}
                        <h3 className='suggestion'> Suggestion </h3>
                        {feedData?.suggestions?.map(user => <Followers key={user._id} user={user} />)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed
