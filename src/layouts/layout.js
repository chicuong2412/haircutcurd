import React from 'react'
import Menu from '../components/Menu'
import AboveBar from '../components/aboveBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppointmentPage from "../pages/AppointmentPage"
import EmployeePage from '../pages/EmployeePage'
import ProductPage from '../pages/ProductPage'
import ServicePage from '../pages/ServicePage'
import $ from "jquery"

const MenuChosen = React.createContext();

export default function Layout() {

    const [menuItem, setMenuItem] = React.useState(0);
    var [flagMenu, setFlagMenu] = React.useState(true);

    React.useEffect(() => {
        $(".menuButton").on("click", function () {
            if (flagMenu) {
                console.log(flagMenu);
                $(".leftSide").fadeOut();
                $(".rightSide").css("width", "100%");
                $(".logo").css("display", "none");
                flagMenu = false;
            } else {
                console.log(flagMenu);
                $(".leftSide").fadeIn();
                $(".rightSide").css("width", "86%");
                $(".logo").css("display", "inline");
                flagMenu = true;
            }
        })
    }, []);

    return (
        <MenuChosen.Provider value={{ menuItem, setMenuItem }}>
            <div className='layoutContainer'>
                <div className='leftSide'>
                    <Menu></Menu>
                </div>
                <div className='rightSide'>
                    <div className='topBar'>
                        <AboveBar></AboveBar>
                    </div>
                    <div className='bottomBar'>
                        <Routes>
                            <Route path='/myinfo'></Route>
                            <Route path='/' element={<Navigate to={"myinfo"}></Navigate>}></Route>
                            <Route path='/appointment/*' element={<AppointmentPage />}></Route>
                            <Route path='/employees/*' element={<EmployeePage />}></Route>
                            <Route path='/products/*' element={<ProductPage />}></Route>
                            <Route path='/services/*' element={<ServicePage></ServicePage>}></Route>
                        </Routes>
                    </div>

                </div>


            </div>
        </MenuChosen.Provider>
    )
}

export const useInfo = () => React.useContext(MenuChosen);
