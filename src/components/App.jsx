import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layouts/layout'
import React, { useState } from 'react'
import LoginPage from '../pages/LoginPage';
import { Layouts } from './layoutPublic/Layouts';
import HomePage from '../pages/HomePage';
import RoutesDirection from '../routes/Routes';



const Main = React.createContext();

export default function App() {
    const jwt = localStorage.getItem("JWT");
    const [isLogged, setIsLogged] = useState((jwt) ? true : false);
    let role = localStorage.getItem("ROLE");

    return (
        // <Main.Provider value={{ setIsLogged }}>
        //     {(isLogged) ?
        //         <BrowserRouter>
        //             <Routes>
        //                 <Route index path='/*' element={<Layout></Layout>}></Route>
        //                 <Route index path='/login/*' element={<LoginPage></LoginPage>}></Route>
        //             </Routes>
        //         </BrowserRouter> :
        //         <BrowserRouter>
        //             <Routes>
        //                 <Route path='/*' element={<Navigate to={"login"}></Navigate>}></Route>
        //                 <Route index path='/login' element={<LoginPage></LoginPage>}></Route>
        //             </Routes>
        //         </BrowserRouter>}
        // </Main.Provider>
        <Main.Provider value={{ setIsLogged, isLogged }}>
            <BrowserRouter>
                    <RoutesDirection></RoutesDirection>
            </BrowserRouter>
        </Main.Provider>
        // <BrowserRouter>
        //     <Routes>
        //         <Route path='/booking/*' element = {<Layouts><Booking></Booking></Layouts>}></Route>
        //         <Route path='/' element = {<Layouts><HomePage></HomePage></Layouts>}></Route>
        //     </Routes>
        // </BrowserRouter>


    );
}

export const useMain = () => React.useContext(Main);
