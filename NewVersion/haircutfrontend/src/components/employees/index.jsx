import React, { useEffect, useState } from 'react'
import Table from '../Table'
import { Checkbox } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"
import { confirmDialog } from 'primereact/confirmdialog';
import DialogHeader from '../DialogHeader/DialogHeader'
import { Dialog } from 'primereact/dialog';
import FormModel from '../Form/FormModel';
import dayjs from 'dayjs';
import $ from 'jquery'
import { getContentBase64 } from '../../utils/Functions';
import { useMain } from '../App';


export default function Employee() {

    const [id, setId] = useState("");
    const link = "http://localhost:3120/identity/workers"
    const [visible, setVisible] = useState(false);
    const [typeDialog, setTypeDialog] = useState("View");

    const [options, setOptions] = useState([]);

    const { toast } = useMain();

    const headerElement = (Type) => {
        return (
            <DialogHeader header={Type}></DialogHeader>
        );
    }


    useEffect(() => {
        $.ajax({
            url: `http://localhost:3120/identity/locations/getLocations`,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("JWT")}`
            },
            CORS: false,
            contentType: 'application/json',
            secure: true,
            async: false,
            success: function (data) {
                setOptions([...data.result]);
            },
            error: function (data) {
                setOptions([]);
            }
        })
    }, []);

    function callBack(data, content) {
        let location = (typeof data.location === "object") ? data.location.id : data.location;
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                $.ajax({
                    url: `${link}${(typeDialog === "Edit") ? `/${id}` : ""}`,
                    type: (typeDialog === "Create") ? "POST" : "PUT",
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
                    },
                    data: JSON.stringify(
                        { ...data, doB: dayjs(data.doB).toISOString().substring(0, 10), location: location, file: content }
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
    }

    const confirm1 = (data) => {
        getContentBase64(data, callBack)
    };

    return (
        <>
            <Dialog visible={visible} modal header={headerElement(typeDialog)} style={{ width: '50rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <FormModel
                    id={id}
                    typeForm={`${typeDialog.toLocaleLowerCase()}`}
                    confirm={confirm1}
                    listInputs={[
                        {
                            name: "Image",
                            valueName: "imgSrc",
                            type: "file",
                            size: { "sm": 12, "lg": 4 },
                            sx: {
                                width: "100%"
                            },
                            editable: true,
                            width: "250px"
                        }, {
                            stack: true,
                            listStacks: [
                                {
                                    name: "ID",
                                    valueName: "id",
                                    type: "TextField",
                                    size: 6,
                                    editable: false
                                }, {
                                    name: "Username",
                                    valueName: "username",
                                    type: "TextField",
                                    size: 6,
                                    editable: true,
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                },
                                {
                                    name: "Password",
                                    valueName: "password",
                                    type: "TextField",
                                    size: 6,
                                    editable: true,
                                    rules: {
                                        required: {
                                            value: (typeDialog.toLocaleLowerCase() === "create") ? true : false,
                                            message: "Can't leave this field blank"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                            message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number."
                                        }
                                    }
                                },
                                {
                                    name: "Name",
                                    valueName: "nameWorker",
                                    type: "TextField",
                                    size: 6,
                                    editable: true,
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                }, {
                                    name: "Specialities",
                                    valueName: "specialities",
                                    type: "TextField",
                                    size: 6,
                                    editable: true,
                                }, {
                                    name: "Salary",
                                    valueName: "salary",
                                    type: "TextField",
                                    size: 6,
                                    editable: true,
                                    number: "float"
                                }, {
                                    name: "Rate",
                                    valueName: "rate",
                                    type: "TextField",
                                    size: 4,
                                    number: "float",
                                    editable: true
                                }, {
                                    name: "Date Of Birth",
                                    valueName: "doB",
                                    type: "DateField",
                                    size: 4,
                                    editable: true,
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                }, {
                                    name: "Email",
                                    valueName: "email",
                                    type: "TextField",
                                    size: 4,
                                    typeEmail: true,
                                    editable: true,
                                    rules: {
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Email Invalid"
                                        },
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                }, {
                                    name: "Address",
                                    valueName: "address",
                                    type: "TextField",
                                    size: 6,
                                    editable: true,
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                }, {
                                    name: "PhoneNumber",
                                    valueName: "phoneNumber",
                                    type: "TextField",
                                    size: 6,
                                    editable: true,
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                }, {
                                    name: "Location",
                                    valueName: "location",
                                    type: "Dropdown",
                                    size: 6,
                                    editable: true,
                                    options: options,
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                }, {
                                    name: "Role",
                                    valueName: "idRole",
                                    type: "Dropdown",
                                    size: 6,
                                    editable: true,
                                    options: [{ label: 'EMPLOYEE', value: 'EMPLOYEE' },
                                    { label: 'MANAGER', value: 'MANAGER' },
                                    { label: 'ADMIN', value: 'ADMIN' },],
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                },
                            ],
                            size: { "sm": 12, "lg": 8 }
                        }
                    ]}
                    link={link + ""}
                >
                </FormModel>
            </Dialog>
            <Table
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
                    { field: "salary", resizable: true },
                    { headerName: "Role", field: "idRole", resizable: true },
                    {
                        headerName: "Location", field: "location", cellRenderer: (params) =>
                            params.data.location.name, resizable: true
                    },
                    {
                        headerName: "Deleted", field: "deleted", cellRenderer: (params) =>
                            <Checkbox disabled checked={params.data.deleted}></Checkbox>
                    },
                    {
                        headerName: "Function", field: "id", cellRenderer: (params) => {
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
                setId={setId}
                setVisible={setVisible}
                setTypeDialog={setTypeDialog}
            ></Table>
        </>
    )
}
