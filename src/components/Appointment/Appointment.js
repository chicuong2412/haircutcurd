import React, { useEffect } from 'react'
import { useState } from 'react'
import { Checkbox } from '@mui/material'
import Table from '../Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"
import { confirmDialog } from 'primereact/confirmdialog';
import { useInfo } from '../../layouts/layout'
import DialogHeader from '../DialogHeader/DialogHeader'
import { Dialog } from 'primereact/dialog';
import FormModel from '../Form/FormModel';
import $ from 'jquery'
import dayjs from 'dayjs';

export default function Appointment() {
    const [id, setId] = useState("");
    const link = "http://localhost:3120/identity/appointments"
    const [visible, setVisible] = useState(false);
    const [typeDialog, setTypeDialog] = useState("View");
    const [optionServices, setOptionServices] = useState([]);
    const [optionCombos, setOptionCombos] = useState([]);
    const [optionWorkers, setOptionWorkers] = useState([]);
    const [optionCustomers, setOptionCustomers] = useState([]);
    const [optionLocations, setOptionLocations] = useState([]);

    const { toast } = useInfo();

    const headerElement = (Type) => {
        return (
            <DialogHeader header={Type}></DialogHeader>
        );
    }

    useEffect(() => {
        $.ajax({
            url: `http://localhost:3120/identity/services/getAllPublicServices`,
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
                setOptionServices([...data.result]);
            },
            error: function (data) {
                setOptions([]);
            }
        })
        $.ajax({
            url: `http://localhost:3120/identity/combos/getAllPublicCombos`,
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
                setOptionCombos([...data.result]);
            },
            error: function (data) {
                setOptions([]);
            }
        })
        $.ajax({
            url: `http://localhost:3120/identity/workers/getAllWorkers`,
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
                setOptionWorkers([...data.result]);
            },
            error: function (data) {
                setOptions([]);
            }
        })
        $.ajax({
            url: `http://localhost:3120/identity/customers`,
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
                setOptionCustomers([...data.result]);
            },
            error: function (data) {
                setOptions([]);
            }
        })

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
                setOptionLocations([...data.result]);
            },
            error: function (data) {
                setOptions([]);
            }
        })
    }, []);

    const confirm1 = (data) => {
        let idService = [];
        data.idService?.map((item) => {
            idService.push(item.id);
        })

        let idCombo = [];
        data.idCombo?.map((item) => {
            idCombo.push(item.id);
        })
        
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                $.ajax({//${(typeDialog === "Edit") ? `/${id}` : ""}
                    url: `${link}`,
                    type: (typeDialog === "Create") ? "POST" : "PUT",
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
                    },
                    data: JSON.stringify(
                        {
                            ...data,
                            idService: idService,
                            idCombo: idCombo,
                            idLocation: data.idLocation.id,
                            idWorker: data.worker.id,
                            idCustomer: data.customer.id,
                            dateTime: dayjs(data.dateTime).format('YYYY-MM-DDTHH:mm:ss')
                        }
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
                            setId("");
                        }
                    },
                    error: function (data) {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                        // setVisible(false);
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
        // <Routes>
        //     <Route path='/' element={
        <>
            <Dialog visible={visible} modal header={headerElement(typeDialog)} style={{ width: '50rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <FormModel
                    id={id}
                    typeForm={`${typeDialog.toLocaleLowerCase()}`}
                    confirm={confirm1}
                    listInputs={[{
                        name: "ID",
                        valueName: "id",
                        type: "TextField",
                        size: 6,
                        editable: false
                    }, {
                        name: "Worker",
                        valueName: "worker",
                        label: "nameWorker",
                        type: "Dropdown",
                        size: 6,
                        editable: true,
                        options: optionWorkers,
                        rules: {
                            required: {
                                value: true,
                                message: "Can't leave this field blank"
                            }
                        }
                    }, {
                        name: "Customer",
                        valueName: "customer",
                        label: "nameCustomer",
                        type: "Dropdown",
                        size: 6,
                        editable: true,
                        options: optionCustomers,
                        rules: {
                            required: {
                                value: true,
                                message: "Can't leave this field blank"
                            }
                        }
                    }, {
                        name: "Status",
                        valueName: "status",
                        type: "Dropdown",
                        size: 6,
                        editable: true,
                        options: [{ label: 'WAITING', value: 'WAITING' },
                        { label: 'CANCELLED', value: 'CANCELLED' },
                        { label: 'OVERDUE', value: 'OVERDUE' },
                        { label: 'DONE', value: 'DONE' }],
                        rules: {
                            required: {
                                value: true,
                                message: "Can't leave this field blank"
                            }
                        }
                    }, {
                        name: "Date Time",
                        valueName: "dateTime",
                        type: "datetime",
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
                        valueName: "idLocation",
                        type: "Dropdown",
                        size: 6,
                        editable: true,
                        options: optionLocations,
                        getObject: true,
                        rules: {
                            required: {
                                value: true,
                                message: "Can't leave this field blank"
                            }
                        }
                    }, {
                        name: "Service List",
                        valueName: "idService",
                        type: "list",
                        size: 12,
                        options: optionServices,
                        editable: true
                    }, {
                        name: "Combo List",
                        valueName: "idCombo",
                        type: "list",
                        size: 12,
                        options: optionCombos,
                        editable: true
                    }
                    ]}
                    link={link + ""}
                >
                </FormModel>
            </Dialog>
            <Table
                colDefsIn={[
                    { headerName: "ID", field: "id", resizable: true },
                    {
                        field: "worker", resizable: true, cellRendererFramework: (params) => {
                            return (
                                <>{params.data.worker.id}</>
                            )
                        }, resizable: true
                    },
                    {
                        field: "customer", resizable: true, cellRendererFramework: (params) => {
                            return (
                                <>{params.data.customer.id}</>
                            )
                        }, resizable: true
                    },
                    { headerName: "Status", field: "status", resizable: true },
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
                setId={setId}
                setVisible={setVisible}
                setTypeDialog={setTypeDialog}
            ></Table>
        </>
        //     }></Route>
        //     <Route path='/view/*' element={<AppointmentForm></AppointmentForm>}></Route>
        //     <Route path='/create/*' element={<CreateFormAppointment></CreateFormAppointment>}></Route>
        // </Routes>
    )
}
