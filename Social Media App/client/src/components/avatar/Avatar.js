import React from 'react'
import srcImg from '../../assests/ghost.png'
import './Avatar.scss'
function Avatar({ src }) {
    return (
        <div className='avatar'>
            <img src={src ? src : srcImg} alt="Photo lagao" />

        </div>
    )
}

export default Avatar
