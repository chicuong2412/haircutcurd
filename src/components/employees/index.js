import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { EmployeeForm, EmployeeCreateForm, EditEmployeeForm } from './EmployeeForm'
import Table from '../Table'
import { Checkbox } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"


export default function Employee() {
    return (
        <Routes>
            <Route path='/' element={<Table
                colDefsIn={[
                    { headerName: "ID", field: "id", resizable: true },
                    { field: "username", resizable: true },
                    { headerName: "Name", field: "nameWorker", resizable: true },
                    { headerName: "DoB", field: "doB", resizable: true },
                    { field: "email", resizable: true },
                    { field: "specialities", resizable: true },
                    { field: "address", resizable: true },
                    { field: "phoneNumber", resizable: true },
                    { field: "rate", resizable: true },
                    { field: "idRole", resizable: true },
                    {
                        headerName: "Location", field: "location", cellRendererFramework: (params) =>
                            params.data.location.name , resizable: true
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
                link={"http://localhost:3120/identity/workers/getAllWorkers"}
                nameLink={"workers"}
                chartField={["rate"]}
            ></Table>}></Route>
            <Route path='/view/*' element={<EmployeeForm></EmployeeForm>}></Route>
            <Route path='/create/*' element={<EmployeeCreateForm></EmployeeCreateForm>}></Route>
            <Route path='/edit/*' element={<EditEmployeeForm></EditEmployeeForm>}></Route>
        </Routes>
    )
}
