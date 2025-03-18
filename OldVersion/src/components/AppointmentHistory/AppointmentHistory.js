import React, { useEffect, useMemo, useState, useRef } from 'react'
import style from './AppointmentHistory.module.scss'
import AppointmentTable from './AppointmentTable'
import $ from "jquery"
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';

export default function AppointmentHistory() {

    const [data, setData] = useState(0);
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);

    useMemo(() => {
        $.ajax({
            url: `http://localhost:3120/identity/appointments/${localStorage.getItem("ROLE").includes("CUSTOMER") ? `getByCustomerUsername/${localStorage.getItem("username")}` : `getAppointmentByIdWorker/${localStorage.getItem("ID")}`}`,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("JWT")}`
            },
            contentType: 'application/json',
            secure: true,
            async: true,
            success: function (data1) {
                setData([...data1.result])
            },
            error: function (data) {
            }
        })
    }, [])

    function cancel(id) {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                $.ajax({
                    url: `http://localhost:3120/identity/appointments/cancel/${id}`,
                    type: "PUT",
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
                    }
                    ,
                    contentType: 'application/json',
                    secure: true,
                    async: true,
                    success: function (data) {
                        $(".loading").css("display", "flex");
                        setTimeout(() => {
                            if (data.code === 103 || data.code === 101) {
                                toast.current.show({ severity: 'info', summary: 'Confirmed', detail: data.message, life: 3000 });
                            } else {
                                toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                            }
                            $(".loading").css("display", "none")
                        }, 1000)
                    },
                    error: function (data) {
                    }
                })

            },
            reject() {
                toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }


    return (
        <>
            <Toast ref={toast} />
            <div className='headingPane'>
                <div className='siteName'>
                    Carousel
                </div>
                <div className='breadcrumbBoard'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">AppointmentHistory</li>
                    </ol>
                </div>
            </div>
            <div className={style.apointmetWrapper}>
                <div className='container'>
                    <AppointmentTable data={data} cancel={cancel}></AppointmentTable>
                </div>

            </div>
        </>
    )
}
