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
    const [id, setId] = useState("");

    const [username, setUsername] = useState("");
    const [nameCustomer, setnameCustomer] = useState("");
    const [typeOfCustomer, setTypeOfCustomer] = useState("None");
    const [password, setPassword] = useState("");
    const [doB, setDob] = useState(dayjs("2000-01-01"));
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [loyaltyPoint, setLoyaltyPoint] = useState(0);
    const [time, setTime] = React.useState(dayjs('2022-04-17T15:30'));

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
            {/* <ViewForm
                id="CUS7"
                listInputs={[{
                    name: "ID",
                    valueName: "id",
                    type: "TextField",
                    size: 6,
                    value: id,
                    setValue: setId,
                }, {
                    name: "Name",
                    valueName: "nameCustomer",
                    type: "TextField",
                    size: 6,
                    value: nameCustomer,
                    setValue: setnameCustomer,
                }, {
                    name: "Username",
                    valueName: "username",
                    type: "TextField",
                    size: 6,
                    value: username,
                    setValue: setUsername,
                }, {
                    name: "Date Of Birth",
                    valueName: "doB",
                    type: "DateField",
                    size: 6,
                    value: doB,
                    setValue: setDob,
                }, {
                    name: "Password",
                    valueName: "password",
                    type: "TextField",
                    size: 6,
                    value: password,
                    setValue: setPassword,
                }, {
                    name: "Type Customer",
                    valueName: "typeCustomer",
                    type: "Dropdown",
                    size: 6,
                    value: typeOfCustomer,
                    setValue: setTypeOfCustomer,
                    options: [{ label: 'None', value: 'None' },
                    { label: 'Broze', value: 'Broze' },
                    { label: 'Silver', value: 'Silver' },
                    { label: 'Gold', value: "Gold" },
                    { label: 'Platinum', value: "Platinum" }]
                }, {
                    name: "Loyalty Point",
                    valueName: "loyaltyPoint",
                    type: "TextField",
                    size: 6,
                    value: loyaltyPoint,
                    setValue: setLoyaltyPoint,
                }, {
                    name: "Email",
                    valueName: "email",
                    type: "TextField",
                    size: 3,
                    value: email,
                    setValue: setEmail,
                }, {
                    name: "Phone Number",
                    valueName: "phoneNumber",
                    type: "TextField",
                    size: 3,
                    value: phoneNumber,
                    setValue: setPhoneNumber,
                }, {
                    name: "Address",
                    valueName: "address",
                    type: "TextField",
                    size: 12,
                    value: address,
                    setValue: setAddress,
                }, {
                    name: "Open Hour",
                    valueName: "openHour",
                    type: "TimeField",
                    size: 3,
                    value: time,
                    setValue: setTime,
                }
                ]}
            >
            </ViewForm> */}
        </React.StrictMode>

    );
}

export const useMain = () => React.useContext(Main);
