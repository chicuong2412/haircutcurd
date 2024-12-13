import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layouts/layout'
import React from 'react'


const MenuChosen = React.createContext();

export default function App() {
    

    return (
        
            <BrowserRouter>
                <Routes>
                    <Route index path='/*' element={<Layout></Layout>}></Route>
                </Routes>
            </BrowserRouter>
       
    );
}

export const useInfo = () => React.useContext(MenuChosen);
