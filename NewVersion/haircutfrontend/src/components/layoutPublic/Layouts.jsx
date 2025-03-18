import React, { useEffect, useState } from 'react'
import Menu from './NavMenu/Menu'
import Footer from './Footers/Footer'
import Wrapper from '../Wrapper/Wrapper'
import MenuInLog from './NavMenu/MenuInLog'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from "jquery"
import NotificationPanel from '../notificationPane/NotificationPanel'


export function Layouts({ children }) {
    return (
        <Wrapper>
            <Menu />
            {children}
            <Footer />

        </Wrapper>

    )
}

export function LayoutLogged({ children }) {

    const [openNotiPanel, setOpenNotiPanel] = useState(false)

    const [dataNoti, setDataNoti] = useState([])

    useEffect(() => {
        document.querySelector(".noti").addEventListener("click", function () {
            togglePanel()
            document.querySelector(".notiPanel").classList.toggle("widthPanel")
        })

        document.querySelector(".notiPanel .close").addEventListener("click", function () {
            togglePanel()
            document.querySelector(".notiPanel").classList.toggle("widthPanel")
        })
    }, [])

    const togglePanel = () => {
        setOpenNotiPanel((prev) => !prev); // Toggle panel open/close
    };

    useEffect(() => {
        if (openNotiPanel) {
            $.ajax({
                url: `http://localhost:3120/identity/notification`,
                type: 'GET',
                dataType: 'json',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("JWT")}`
                },
                CORS: false,
                contentType: 'application/json',
                secure: true,
                async: false,
                success: function (data) {
                    updateData(data.result)
                },
                error: function (data) {
 
                }
            })
            
        }
    }, [openNotiPanel])

    function deleteAll() {
        document.querySelectorAll(".notiItem").forEach(t => {
            t.classList.toggle("scale0")
        }
        )
        setTimeout(() => {
            updateData([])
        }, 200)
    }

    function deleteData(id) {
        let newArr = []
        for (let index = 0; index < dataNoti.length; index++) {
            const element = dataNoti[index];
            if (element.id === id) {
                continue
            }
            newArr.push(element)
        }
        updateData(newArr)
    }

    function updateData(newData) {
        setDataNoti((preData) => [...newData])
    }

    return (
        <Wrapper>
            <MenuInLog />
            {children}
            <Footer />
            <NotificationPanel
                open={openNotiPanel}
                deleteData={deleteData}
                deleteAll={deleteAll}
                data={dataNoti}
            ></NotificationPanel>
        </Wrapper>

    )
}
