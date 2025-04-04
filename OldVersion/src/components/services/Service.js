import React, { useEffect } from 'react'
import { useState } from 'react'
import { Checkbox } from '@mui/material'
import Table from '../Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"
import { confirmDialog } from 'primereact/confirmdialog';
import DialogHeader from '../DialogHeader/DialogHeader'
import { Dialog } from 'primereact/dialog';
import FormModel from '../Form/FormModel';
import $ from 'jquery'
import { getContentBase64 } from '../../utils/Functions';
import { useMain } from '../App';


export default function Service() {

    const [id, setId] = useState("");
    const link = "http://localhost:3120/identity/services"
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
            url: `http://localhost:3120/identity/products/getProducts`,
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
        let productList = [];
        data.productsList?.map((item) => {
            productList.push(item.id);
        })
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
                        {
                            ...data,
                            productsList: productList,
                            file: content
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
                            name: "ImgSRC",
                            valueName: "imgSrc",
                            type: "file",
                            size: { "sm": 12, "lg": 4 },
                        },
                        {
                            stack: true,
                            size: { "sm": 12, "lg": 8 },
                            listStacks: [
                                {
                                    name: "ID",
                                    valueName: "id",
                                    type: "TextField",
                                    size: 6,
                                    editable: false
                                }, {
                                    name: "Name",
                                    valueName: "name",
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
                                    name: "Description",
                                    valueName: "description",
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
                                    name: "Duration",
                                    valueName: "duration",
                                    type: "TextField",
                                    size: 6,
                                    number: "int",
                                    editable: true,
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                }, {
                                    name: "Rate",
                                    valueName: "rate",
                                    type: "TextField",
                                    size: 6,
                                    editable: true,
                                    number: "float",
                                    defaultValue: 0
                                }, {
                                    name: "Price",
                                    valueName: "price",
                                    type: "TextField",
                                    size: 6,
                                    number: "int",
                                    editable: true,
                                    rules: {
                                        required: {
                                            value: true,
                                            message: "Can't leave this field blank"
                                        }
                                    }
                                },

                            ]
                        },
                        {
                            name: "Product List",
                            valueName: "productsList",
                            type: "list",
                            size: 12,
                            options: options,
                            editable: true,
                            defaultValue: []
                        }
                    ]}
                    link={link + "/getServiceByID"}
                >
                </FormModel>
            </Dialog>
            <Table
                colDefsIn={[
                    { headerName: "ID", field: "id", resizable: true },
                    { field: "name", resizable: true },
                    { field: "imgSrc", resizable: true },
                    { headerName: "Duration", field: "duration" },
                    { field: "description", resizable: true },
                    { field: "price" },
                    { field: "rate" },
                    { headerName: "Products", field: "products", cellRendererFramework: (params) => <div className='center'>{params.data.productsList.length}</div> },
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
                setId={setId}
                setVisible={setVisible}
                setTypeDialog={setTypeDialog}
            ></Table>
        </>
    )
}
