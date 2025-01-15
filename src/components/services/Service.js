import React from 'react'
import ServiceTable from './ServiceTable'
import { Checkbox } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { ServiceCreateForm, ServiceForm, EditingServiceForm } from './ServiceForm'
import Table from '../Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"

export default function Service() {
    return (
        <Routes>
            <Route path='/' element={<Table
                colDefsIn={[
                    { headerName: "ID", field: "id", resizable: true },
                    { field: "name", resizable: true },
                    { field: "imgSrc", resizable: true },
                    { headerName: "Duration", field: "duration" },
                    { field: "description", resizable: true },
                    { field: "price" },
                    { field: "rate" },
                    { headerName: "Products", field: "products", cellRendererFramework: (params) => <div className='center'>{params.data.productsList.length}</div>},
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
                link={"http://localhost:3120/identity/services/getAllServices"}
                nameLink={"services"}
                chartField={["id", "duration", "price", "rate"]}
            ></Table>}></Route>
            <Route path='/view/*' element={<ServiceForm></ServiceForm>}></Route>
            <Route path='/create/*' element={<ServiceCreateForm></ServiceCreateForm>}></Route>
            <Route path='/edit/*' element={<EditingServiceForm></EditingServiceForm>}></Route>
        </Routes>
    )
}
