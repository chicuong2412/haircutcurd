import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layouts/layout'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import LoginPage from '../pages/LoginPage';
import { Navigate } from 'react-router-dom';
import $ from "jquery"
import ViewForm from './Form/ViewForm';


const Main = React.createContext();

export default function App() {
    const jwt = localStorage.getItem("JWT");
    const [isLogged, setIsLogged] = useState((jwt) ? true : false);

    return (
        <React.StrictMode>
            <Main.Provider value={{ setIsLogged }}>
                {(isLogged) ?
                    <BrowserRouter>
                        <Routes>
                            <Route index path='/*' element={<Layout></Layout>}></Route>
                            <Route index path='/login/*' element={<LoginPage></LoginPage>}></Route>
                        </Routes>
                    </BrowserRouter> :
                    <BrowserRouter>
                        <Routes>
                            <Route path='/*' element={<Navigate to={"login"}></Navigate>}></Route>
                            <Route index path='/login' element={<LoginPage></LoginPage>}></Route>
                        </Routes>
                    </BrowserRouter>}
            </Main.Provider>
        </React.StrictMode>

    );
}

export const useMain = () => React.useContext(Main);
