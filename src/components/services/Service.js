import React from 'react'
import ServiceTable from './ServiceTable'
import { Route, Routes } from 'react-router-dom'
import { ServiceCreateForm, ServiceForm, EditingServiceForm } from './ServiceForm'
//import {EmployeeForm, EmployeeCreateForm, EditEmployeeForm} from './EmployeeForm'

export default function Service() {
    return (
        <Routes>
            <Route path='/' element={<ServiceTable></ServiceTable>}></Route>
            <Route path='/view/*' element={<ServiceForm></ServiceForm>}></Route>
            <Route path='/create/*' element={<ServiceCreateForm></ServiceCreateForm>}></Route>
            <Route path='/edit/*' element={<EditingServiceForm></EditingServiceForm>}></Route>
        </Routes>
    )
}
