import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { likeAndUnlikePost } from '../redux/slices/PostSlice'
import { Navigate, useNavigate } from 'react-router-dom'


function Post({ post }) {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    async function handlePostLike() {
        dispatch(likeAndUnlikePost({
            postId: post._id
        }))
    }


    return (
        <div className='post'>
            <div className='heading' onClick={() => Navigate(`/profile/${post.owner._id}`)}>
                <Avatar src={post?.owner?.Avatar?.url} />
                <h4>{post?.owner?.name}</h4>
            </div>
            <div className='content'>
                <img src={post?.image?.url} alt='' />
            </div>
            <div className='footer'>
                <div className='like' onChange={handlePostLike}>
                    {post.isLiked ? <AiFillHeart className='icon' /> : <AiOutlineHeart className='icon' />}

                    <h4>{`${post?.likeCount} Likes`}</h4>

                </div>

                <div className='caption'>{post?.caption}</div>
                <div className='time-ago'>{post?.timeAgo}</div>

            </div>
        </div>
    )
}

export default Post
