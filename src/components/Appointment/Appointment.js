import React from 'react'
import { AppointmentForm, CreateFormAppointment } from './Form'
import { Routes, Route } from 'react-router-dom'
import Table from '../Table'
import { Checkbox } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"

export default function Appointment() {
    return (
        <Routes>
            <Route path='/' element={<Table
                colDefsIn={[
                    { headerName: "ID", field: "id", resizable: true },
                    {
                        field: "worker", resizable: true, cellRendererFramework: (params) =>
                            {return(
                                <>{params.data.worker.id}</>
                            )}, resizable: true
                    },
                    {
                        field: "customer", resizable: true, cellRendererFramework: (params) =>
                            {return(
                                <>{params.data.customer.id}</>
                            )}, resizable: true
                    },
                    { headerName: "status", field: "status", resizable: true },
                    { headerName: "DateTime", field: "dateTime", resizable: true },
                    { field: "idLocation", resizable: true },
                    {
                        headerName: "Service/Combo", field: "service_combo", cellRendererFramework: (params) =>
                            params.data.idService.length + params.data.idCombo.length, resizable: true
                    },
                    {
                        headerName: "Deleted", field: "deleted", cellRendererFramework: (params) =>
                            <Checkbox disabled checked={params.data.deleted}></Checkbox>
                    },
                    {
                        headerName: "Function", field: "id", cellRendererFramework: (params) => {
                            return (
                                <div className={style.buttonFunctions}>
                                    <FontAwesomeIcon icon={faPenToSquare} dataid={params.value} className='edit' />
                                    <FontAwesomeIcon icon={faEye} dataid={params.value} className='view' />
                                    <FontAwesomeIcon icon={faX} dataid={params.value} className='delete' />
                                </div>
                            )
                        }
                    }
                ]}
                link={"http://localhost:3120/identity/appointments"}
                nameLink={"appointments"}
                chartField={["rate"]}
            ></Table>}></Route>
            <Route path='/view/*' element={<AppointmentForm></AppointmentForm>}></Route>
            <Route path='/create/*' element={<CreateFormAppointment></CreateFormAppointment>}></Route>
        </Routes>
    )
}
