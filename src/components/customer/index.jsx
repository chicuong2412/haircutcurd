import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CustomerForm, CustomerCreateForm, EditCustomerForm } from './CustomerForm'
import Table from '../Table'
import { Checkbox } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import ViewForm from '../Form/ViewForm'
// import { Avatar } from '@/components/lib/avatar/Avatar';

import dayjs from 'dayjs'
import UpdateForm from '../Form/UpdateForm'

export default function Customer() {
    const [id, setId] = useState("");

    const [username, setUsername] = useState("");
    const [nameCustomer, setnameCustomer] = useState("");
    const [typeOfCustomer, setTypeOfCustomer] = useState("None");
    const [password, setPassword] = useState("");
    const [doB, setDob] = useState(dayjs("2000-01-01"));
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [loyaltyPoint, setLoyaltyPoint] = useState(0);

    const [visible, setVisible] = useState(false);
    const [typeDialog, setTypeDialog] = useState("View");

    const headerElement = (Type) => {
        return(
            <div className="inline-flex align-items-center justify-content-center gap-2">
                {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" /> */}
                <span className="font-bold white-space-nowrap">{Type}</span>
            </div>
        );
    }

    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (
        <>
            <Dialog visible={visible} modal header={headerElement(typeDialog)} style={{ width: '50rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                {/* <ViewForm
                    id={id}
                    listInputs={[{
                        name: "ID",
                        valueName: "id",
                        type: "TextField",
                        size: 6,
                        value: id,
                        setValue: setId,
                    }, {
                        name: "Name",
                        valueName: "nameCustomer",
                        type: "TextField",
                        size: 6,
                        value: nameCustomer,
                        setValue: setnameCustomer,
                    }, {
                        name: "Username",
                        valueName: "username",
                        type: "TextField",
                        size: 6,
                        value: username,
                        setValue: setUsername,
                    }, {
                        name: "Date Of Birth",
                        valueName: "doB",
                        type: "DateField",
                        size: 6,
                        value: doB,
                        setValue: setDob,
                    }, {
                        name: "Password",
                        valueName: "password",
                        type: "TextField",
                        size: 6,
                        value: password,
                        setValue: setPassword,
                    }, {
                        name: "Type Customer",
                        valueName: "typeCustomer",
                        type: "Dropdown",
                        size: 6,
                        value: typeOfCustomer,
                        setValue: setTypeOfCustomer,
                        options: [{ label: 'None', value: 'None' },
                        { label: 'Broze', value: 'Broze' },
                        { label: 'Silver', value: 'Silver' },
                        { label: 'Gold', value: "Gold" },
                        { label: 'Platinum', value: "Platinum" }]
                    }, {
                        name: "Loyalty Point",
                        valueName: "loyaltyPoint",
                        type: "TextField",
                        size: 6,
                        value: loyaltyPoint,
                        setValue: setLoyaltyPoint,
                    }, {
                        name: "Email",
                        valueName: "email",
                        type: "TextField",
                        size: 3,
                        value: email,
                        setValue: setEmail,
                    }, {
                        name: "Phone Number",
                        valueName: "phoneNumber",
                        type: "TextField",
                        size: 3,
                        value: phoneNumber,
                        setValue: setPhoneNumber,
                    }, {
                        name: "Address",
                        valueName: "address",
                        type: "TextField",
                        size: 12,
                        value: address,
                        setValue: setAddress,
                    }
                    ]}
                    link={"http://localhost:3120/identity/customers/"}
                >
                </ViewForm> */}
                <UpdateForm
                    id={id}
                    listInputs={[{
                        name: "ID",
                        valueName: "id",
                        type: "TextField",
                        size: 6,
                        value: id,
                        setValue: setId,
                        editable: false
                    }, {
                        name: "Name",
                        valueName: "nameCustomer",
                        type: "TextField",
                        size: 6,
                        value: nameCustomer,
                        setValue: setnameCustomer,
                        editable: true
                    }, {
                        name: "Username",
                        valueName: "username",
                        type: "TextField",
                        size: 6,
                        value: username,
                        setValue: setUsername,
                        editable: true
                    }, {
                        name: "Date Of Birth",
                        valueName: "doB",
                        type: "DateField",
                        size: 6,
                        value: doB,
                        setValue: setDob,
                        editable: true
                    }, {
                        name: "Password",
                        valueName: "password",
                        type: "TextField",
                        size: 6,
                        value: password,
                        setValue: setPassword,
                        editable: true,
                    }, {
                        name: "Type Customer",
                        valueName: "typeCustomer",
                        type: "Dropdown",
                        size: 6,
                        value: typeOfCustomer,
                        setValue: setTypeOfCustomer,
                        options: [{ label: 'None', value: 'None' },
                        { label: 'Broze', value: 'Broze' },
                        { label: 'Silver', value: 'Silver' },
                        { label: 'Gold', value: "Gold" },
                        { label: 'Platinum', value: "Platinum" }],
                        editable: true
                    }, {
                        name: "Loyalty Point",
                        valueName: "loyaltyPoint",
                        type: "TextField",
                        size: 6,
                        value: loyaltyPoint,
                        setValue: setLoyaltyPoint,
                        editable: true,
                        number: "int"
                    }, {
                        name: "Email",
                        valueName: "email",
                        type: "TextField",
                        size: 3,
                        value: email,
                        setValue: setEmail,
                        editable: true
                    }, {
                        name: "Phone Number",
                        valueName: "phoneNumber",
                        type: "TextField",
                        size: 3,
                        value: phoneNumber,
                        setValue: setPhoneNumber,
                        editable: true
                    }, {
                        name: "Address",
                        valueName: "address",
                        type: "TextField",
                        size: 12,
                        value: address,
                        setValue: setAddress,
                        editable: true
                    }
                    ]}
                    link={"http://localhost:3120/identity/customers/"}
                >
                </UpdateForm>
            </Dialog>

            <Routes>
                <Route path='/' element={<Table
                    colDefsIn={[
                        { headerName: "ID", field: "id", resizable: true },
                        { field: "username", resizable: true },
                        { headerName: "Name", field: "nameCustomer", resizable: true },
                        { headerName: "DoB", field: "doB", resizable: true },
                        { field: "email", resizable: true },
                        { field: "loyaltyPoint", resizable: true },
                        { field: "address", resizable: true },
                        { field: "phoneNumber", resizable: true },
                        { field: "startDate", resizable: true },
                        { field: "typeCustomer", resizable: true },
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
                    link={"http://localhost:3120/identity/customers"}
                    nameLink={"customers"}
                    chartField={["id", "name", "username", "loyaltyPoint"]}
                    setId={setId}
                    setVisible={setVisible}
                    setTypeDialog={setTypeDialog}
                ></Table>}></Route>
                {/* <Route path='/view/*' element={<CustomerForm></CustomerForm>}></Route> */}
                <Route path='/create/*' element={<CustomerCreateForm></CustomerCreateForm>}></Route>
                <Route path='/edit/*' element={<EditCustomerForm></EditCustomerForm>}></Route>
            </Routes>
        </>
    )
}
