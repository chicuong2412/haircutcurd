import React, { useEffect, useState } from 'react'
import Table from '../Table'
import { Checkbox } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"
import { Dialog } from 'primereact/dialog';
import $ from "jquery"
import dayjs from 'dayjs'
import FormModel from '../Form/FormModel'
import { confirmDialog } from 'primereact/confirmdialog';
import { useInfo } from '../../layouts/layout'
import DialogHeader from '../DialogHeader/DialogHeader'



export default function Customer() {
    const [id, setId] = useState("");
    const link = "http://localhost:3120/identity/customers"
    const [visible, setVisible] = useState(false);
    const [typeDialog, setTypeDialog] = useState("View");

    const { toast } = useInfo();

    const headerElement = (Type) => {
        return (
            <DialogHeader header={Type}></DialogHeader>
        );
    }

    const confirm1 = (data) => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                $.ajax({
                    url: `${link}${(typeDialog === "Edit") ? `/${id}`:""}`,
                    type: (typeDialog === "Create") ? "POST": "PUT",
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
                    },
                    data: JSON.stringify(
                        { ...data, doB: dayjs(data.doB).add(1, 'day').toISOString().substring(0, 10) }
                    )
                    ,
                    CORS: false,
                    contentType: 'application/json',
                    secure: true,
                    async: false,
                    success: function (data) {
                        if (data.code === 103 || data.code === 101) {
                            toast.current.show({ severity: 'info', summary: 'Confirmed', detail: data.message, life: 3000 });
                            setVisible(false);
                            setId("");
                        } else {
                            toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                            setVisible(false);
                        }
                    },
                    error: function (data) {

                    }
                })

            },
            reject() {
                toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                setVisible(false);
            }
        });

    };

    return (
        <>
            <Dialog visible={visible} modal header={headerElement(typeDialog)} style={{ width: '50rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <FormModel
                    id={id}
                    typeForm={`${typeDialog.toLocaleLowerCase()}`}
                    confirm = {confirm1}
                    listInputs={[{
                        name: "ID",
                        valueName: "id",
                        type: "TextField",
                        size: 6,
                        editable: false
                    }, {
                        name: "Name",
                        valueName: "nameCustomer",
                        type: "TextField",
                        size: 6,
                        editable: true
                    }, {
                        name: "Username",
                        valueName: "username",
                        type: "TextField",
                        size: 6,
                        editable: true
                    }, {
                        name: "Date Of Birth",
                        valueName: "doB",
                        type: "DateField",
                        size: 6,
                        editable: true
                    }, {
                        name: "Password",
                        valueName: "password",
                        type: "TextField",
                        size: 6,
                        editable: true,
                    }, {
                        name: "Type Customer",
                        valueName: "typeCustomer",
                        type: "Dropdown",
                        size: 6,
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
                        editable: true,
                        number: "int"
                    }, {
                        name: "Email",
                        valueName: "email",
                        type: "TextField",
                        size: 3,
                        editable: true
                    }, {
                        name: "Phone Number",
                        valueName: "phoneNumber",
                        type: "TextField",
                        size: 3,
                        editable: true
                    }, {
                        name: "Address",
                        valueName: "address",
                        type: "TextField",
                        size: 12,
                        editable: true
                    }
                    ]}
                    link={"http://localhost:3120/identity/customers"}
                >
                </FormModel>

            </Dialog>
            <Table
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
            ></Table>
            {/* <Routes>
                <Route path='/' element={
                    <Table
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
                <Route path='/view/*' element={<CustomerForm></CustomerForm>}></Route>
                <Route path='/create/*' element={<CustomerCreateForm></CustomerCreateForm>}></Route>
                <Route path='/edit/*' element={<EditCustomerForm></EditCustomerForm>}></Route>
            </Routes> */}
        </>
    )
}
