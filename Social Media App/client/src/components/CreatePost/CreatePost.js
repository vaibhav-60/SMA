import React, { useState } from 'react'
import Avatar from '../avatar/Avatar'
import { axiosClient } from '../../utils/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/slices/AppConfigSlices';
import { BsCardImage } from "react-icons/bs";
import './CreatePost.scss'
import { getUserProfile } from '../redux/slices/PostSlice';

function CreatePost() {


    const dispatch = useDispatch();
    const [postImg, setPostImg] = useState();
    const [caption, setCaption] = useState();
    const myProfile = useSelector(state => state.AppConfigReducer.myProfile);

    function handleImageChange(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setPostImg(fileReader.result)
                console.log('img data');
            }
        }
    }

    const handlePostSubmit = async () => {
        try {
            dispatch(setLoading(true))
            const result = await axiosClient.post('/post', {
                caption,
                postImg
            })
            console.log('post demo', result);
            dispatch(getUserProfile({
                userId: myProfile._id,
            })

            );
        } catch (error) {

        } finally {
            dispatch(setLoading(false));
            setCaption('');
            setPostImg('');
        }
    }

    return (
        <div className='CreatePost'>
            <div className='left-part'>
                <Avatar />
            </div>

            <div className='right-part'>

                <input type='text' className='captionInput' placeholder='kya chal rha hai bhai' onChange={(e) => setCaption(e.target.value)} />
                {postImg && (
                    <div className='img-container'>
                        <img className='post-img' src={postImg} alt='' />
                    </div>
                )
                }


                <div className='bottom-part'>
                    <div className='input-post-Img'>
                        <label htmlFor='inputImage' className='labelImg'> <BsCardImage />  </label>
                        <input id='inputImg' className='inputImg' type='file' accept='image/*' onChange={handleImageChange} />
                    </div>

                    <button className='post-btn btn-primary' onClick={handlePostSubmit}>Post</button>
                </div>
            </div>

        </div>
    )
}

export default CreatePost
