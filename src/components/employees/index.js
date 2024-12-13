import React from 'react'
import EmployeeTable from './employeeTable'
import { Route, Routes } from 'react-router-dom'
import {EmployeeForm, EmployeeCreateForm, EditEmployeeForm} from './EmployeeForm'

export default function Employee() {
    return (
        <Routes>
            <Route path='/' element={<EmployeeTable></EmployeeTable>}></Route>
            <Route path='/view/*' element={<EmployeeForm></EmployeeForm>}></Route>
            <Route path='/create/*' element={<EmployeeCreateForm></EmployeeCreateForm>}></Route>
            <Route path='/edit/*' element={<EditEmployeeForm></EditEmployeeForm>}></Route>
        </Routes>
    )
}
