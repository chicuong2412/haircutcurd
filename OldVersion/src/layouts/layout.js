import React from 'react'
import Menu from '../components/Menu'
import AboveBar from '../components/aboveBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
import AppointmentPage from "../pages/AppointmentPage"
import EmployeePage from '../pages/EmployeePage'
import ProductPage from '../pages/ProductPage'
import ServicePage from '../pages/ServicePage'
import $ from "jquery"
import CustomerPage from '../pages/CustomerPage'
import Combo from '../components/combo'
import LocationPage from '../pages/LocationPage'


export default function Layout() {
    var [flagMenu, setFlagMenu] = React.useState(false);



    React.useEffect(() => {
        $(".menuButton").on("click", function () {
            if (flagMenu) {
                $(".leftSide").fadeOut();
                $(".rightSide").css("width", "100%");
                $(".logo").css("display", "none");
                flagMenu = false;
            } else {
                $(".leftSide").fadeIn();
                $(".leftSide").css("width", "20%");
                $(".rightSide").css("width", "78%");
                $(".logo").css("display", "inline");
                flagMenu = true;
            }
        })
    }, []);

    return (
        <>
            <div className='layoutContainer'>
                <div className='leftSide' style={{ display: `${(flagMenu) ? "block" : "none"}` }}>
                    <Menu></Menu>
                    <div className='menuButton mobileButtonClose'><FontAwesomeIcon icon={faRectangleXmark}></FontAwesomeIcon></div>
                </div>
                <div className='rightSide'>
                    <div className='topBar'>
                        <AboveBar></AboveBar>
                    </div>
                    <div className='bottomBar'>
                        {
                            (localStorage.getItem("ROLE").includes("ADMIN") ?
                                <Routes>
                                    <Route path='/appointments/*' element={<AppointmentPage />}></Route>
                                    <Route path='/workers/*' element={<EmployeePage />}></Route>
                                    <Route path='/combos/*' element={<Combo />}></Route>
                                    <Route path='/products/*' element={<ProductPage />}></Route>
                                    <Route path='/services/*' element={<ServicePage></ServicePage>}></Route>
                                    <Route path='/customers/*' element={<CustomerPage></CustomerPage>}></Route>
                                    <Route path='/locations/*' element={<LocationPage></LocationPage>}></Route>
                                </Routes> : ((localStorage.getItem("ROLE").includes("MANAGER") ? <>
                                    <Routes>
                                        <Route path='/myinfo'></Route>
                                        <Route path='/appointments/*' element={<AppointmentPage />}></Route>
                                        <Route path='/workers/*' element={<EmployeePage />}></Route>
                                    </Routes>
                                </> : <></>)))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
