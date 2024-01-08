import React, { useEffect } from 'react'

import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMyInfo } from '../components/redux/slices/AppConfigSlices';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyInfo())
    }, [])
    return (
        <div>
            <Navbar />
            <div className='outlet' style={{ margin: '60px' }}>
                <Outlet />
            </div>

        </div>
    )
}

export default Home
