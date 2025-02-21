import { useMain } from '../components/App';
import { Route, Routes } from 'react-router-dom'
import Layout from '../layouts/layout';
import React, { useState } from 'react'
import LoginPage from '../pages/LoginPage';
import { Layouts } from '../components/layoutPublic/Layouts';
import { LayoutLogged } from '../components/layoutPublic/Layouts';
import HomePage from '../pages/HomePage';
import Booking from '../components/Booking/Booking';

export default function RoutesDirection() {

    let role = localStorage.getItem("ROLE");
    const { isLogged } = useMain();
    console.log(isLogged);
    console.log(role);
    
    

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
                                </Routes>
                            </> :
                            <>
                                <Routes>
                                    <Route path='/*' element={<LayoutLogged><HomePage></HomePage></LayoutLogged>}></Route>
                                    <Route path='/booking/*' element = {<LayoutLogged><Booking></Booking></LayoutLogged>}></Route>
                                </Routes>
                            </>
                    }
                </> : <>
                    <Routes>
                        <Route path='/*' element={<Layouts><HomePage></HomePage></Layouts>}></Route>
                        <Route index path='/login' element={<Layouts><LoginPage></LoginPage></Layouts>}></Route>
                    </Routes>
                </>
            }
        </>
    )
}
