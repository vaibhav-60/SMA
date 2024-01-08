import React, { useRef, useState } from 'react'
import './Navbar.scss'
import Avatar from '../avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { TbLogout } from 'react-icons/tb'

import { useDispatch, useSelector } from 'react-redux'



function Navbar() {

    const navigate = useNavigate();
    const myProfile = useSelector(state => state.AppConfigReducer.myProfile);






    return (
        <div className='Navbar'>

            <div className='container'>
                <h2 className='banner hover-link' onClick={() => navigate('/')}>Social Media</h2>
                <div className='right-side'>
                    <div className='hover-link' onClick={() => navigate(`/profile/${myProfile?.id}`)}>
                        <Avatar src={myProfile?.Avatar?.url} />
                    </div>
                    <div className='logout hover-link' >
                        <TbLogout  />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
