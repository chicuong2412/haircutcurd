import React from 'react'
import EnhancedTable from './AppointmentTable'
import {AppointmentForm, CreateFormAppointment} from './Form'
import { Routes, Route } from 'react-router-dom'

export default function Appointment() {
    return (
        <Routes>
            <Route path='/' element={<EnhancedTable></EnhancedTable>}></Route>
            <Route path='/view/*' element= {<AppointmentForm></AppointmentForm>}></Route>
            <Route path='/create/*' element= {<CreateFormAppointment></CreateFormAppointment>}></Route>
        </Routes>
    )
}
