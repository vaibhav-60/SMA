import React, { useEffect, useState } from 'react'

import './UpdateProfile.scss'
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, updateMyProfile } from '../redux/slices/AppConfigSlices';

function UpdateProfile() {
    const myProfile = useSelector((state) => state.AppConfigReducer.myProfile);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [userImg, setUserImg] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '');
        setUserImg(myProfile?.avatar.url || '');
    }, [myProfile])

    function handleImageChange(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setUserImg(fileReader.result)
                console.log('img data', fileReader.result)
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateMyProfile({
            name,
            bio,
            userImg
        }))
    }

    return (
        <div className='updateprofile'>
            <div className='container'>
                <div className='left-part'>
                    <div className='input-user-image'>
                        <label htmlFor='inputImage' className='labelImage'> <img src={userImg} alt={name} /> </label>
                        <input id='inputImage' className='inputImage' type='file' accept='image/*' onChange={handleImageChange} />
                    </div>
                </div>

                <div className='right-part'>
                    <form onSubmit={handleSubmit}>
                        <input value={name} type='text' placeholder='your name' onChange={(e) => setName(e.target.value)} />
                        <input value={bio} type='bio' placeholder='your bio' onChange={(e) => setBio(e.target.value)} />
                        <input type='submit' placeholder='btn-primary' onClick={handleSubmit} />
                    </form>
                    <button className='delete-account btn-primary'>Delete Account</button>
                </div>
            </div>


        </div>
    )
}

export default UpdateProfile
