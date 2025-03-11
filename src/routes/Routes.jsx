import { useMain } from '../components/App';
import { Route, Routes } from 'react-router-dom'
import Layout from '../layouts/layout';
import React, { useState } from 'react'
import LoginPage from '../pages/LoginPage';
import { Layouts } from '../components/layoutPublic/Layouts';
import { LayoutLogged } from '../components/layoutPublic/Layouts';
import HomePage from '../pages/HomePage';
import Booking from '../components/Booking/Booking';
import NoPage from '../pages/NoPage';
import NoPermitted from '../pages/NoPermitted';
import ProfilePage from '../pages/ProfilePage';
import AppointmentHistory from '../components/AppointmentHistory/AppointmentHistory';
import RegisterPage from '../pages/RegisterPage';

export default function RoutesDirection() {

    let role = localStorage.getItem("ROLE");
    const { isLogged } = useMain();

    return (
        <>
            {
                (isLogged !== false) ? <>
                    {
                        (role.includes("ADMIN") || role.includes("MANAGER")) ?
                            <>
                                <Routes>
                                    <Route index path='/dashboard/*' element={<Layout></Layout>}></Route>
                                    <Route index path='/*' element={<LayoutLogged><HomePage></HomePage></LayoutLogged>}></Route>
                                    <Route path='/booking/*' element = {<LayoutLogged><Booking></Booking></LayoutLogged>}></Route>
                                    <Route path='/profile/*' element = {<LayoutLogged><ProfilePage></ProfilePage></LayoutLogged>}></Route>
                                    <Route path='/appointments/*' element = {<LayoutLogged><AppointmentHistory></AppointmentHistory></LayoutLogged>}></Route>
                                </Routes>
                            </> :
                            <>
                                <Routes>
                                    <Route path='/*' element={<LayoutLogged><HomePage></HomePage></LayoutLogged>}></Route>
                                    <Route path='/booking/*' element = {<LayoutLogged><Booking></Booking></LayoutLogged>}></Route>
                                    <Route path='/profile/*' element = {<LayoutLogged><ProfilePage></ProfilePage></LayoutLogged>}></Route>
                                    <Route path='/appointments/*' element = {<LayoutLogged><AppointmentHistory></AppointmentHistory></LayoutLogged>}></Route>
                                </Routes>
                            </>
                    }
                </> : <>
                    <Routes>
                        <Route index path='/' element={<Layouts><HomePage></HomePage></Layouts>}></Route>
                        <Route path='/login' element={<Layouts><LoginPage></LoginPage></Layouts>}></Route>
                        <Route path='/register' element={<Layouts><RegisterPage></RegisterPage></Layouts>}></Route>
                        <Route path='/dashboard' element={<NoPermitted></NoPermitted>}></Route>
                        <Route path='/*'  element={<Layouts><NoPage></NoPage></Layouts>}></Route>
                    </Routes>
                </>
            }
        </>
    )
}
