import React from 'react'
import LocationTable from './LocationTable'
import { Route, Routes } from 'react-router-dom'
import { LocationCreateForm, LocationForm, EditingLocationForm } from './LocationForm'
import { Checkbox } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"
import Table from '../Table'

export default function Location() {
    return (
        <Routes>
            <Route path='/' element={<Table
                colDefsIn={[
                    { headerName: "ID", field: "id", resizable: true },
                    { field: "name", resizable: true },
                    { field: "imgSrc", resizable: true },
                    { headerName: "Address", field: "address", resizable: true },
                    { field: "city", resizable: true },
                    { field: "phoneNumber", resizable: true},
                    { field: "email", resizable: true },
                    { field: "openHour", resizable: true },
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
                link={"http://localhost:3120/identity/locations/getLocations"}
                nameLink={"locations"}
                chartField={["id", "duration", "price", "rate"]}></Table>}></Route>
            <Route path='/view/*' element={<LocationForm></LocationForm>}></Route>
            <Route path='/create/*' element={<LocationCreateForm></LocationCreateForm>}></Route>
            <Route path='/edit/*' element={<EditingLocationForm></EditingLocationForm>}></Route>
        </Routes>
    )
}
