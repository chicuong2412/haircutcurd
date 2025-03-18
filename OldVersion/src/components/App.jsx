import { BrowserRouter } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'
import RoutesDirection from '../routes/Routes';
import { requestForToken } from '../firebase/Firebase';
import { Toast } from 'primereact/toast';
import { messaging } from '../firebase/Firebase'
import { onMessage, } from "firebase/messaging";
import { ConfirmDialog } from 'primereact/confirmdialog';

const Main = React.createContext();

export default function App() {
    const jwt = localStorage.getItem("JWT");
    const [isLogged, setIsLogged] = useState((jwt) ? true : false);
    const toast = useRef(null);

    useEffect(() => {
        if (isLogged) {
            requestForToken();
        }
    }, [isLogged])

    onMessage(messaging, (payload) => {
        console.log("Message received: ", payload);

        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            // icon: '/firebase-logo.png',
            // icon: '/firebase-logo.png',
        };

        toast.current.show({ severity: 'success', summary: notificationTitle, detail: notificationOptions.body, life: 3000 });

    });

    return (
        <>
            <div className='loading'>
                <div className='spinner'>
                </div>
            </div>
            <Toast ref={toast} />
            <ConfirmDialog />
            <Main.Provider value={{ setIsLogged, isLogged, toast }}>
                <BrowserRouter>
                    <RoutesDirection></RoutesDirection>
                </BrowserRouter>
            </Main.Provider>
        </>
    );
}

export const useMain = () => React.useContext(Main);
