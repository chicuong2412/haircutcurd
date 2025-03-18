import React, { useState } from 'react'
import style from "../../styles/Profile.module.scss"
import "dayjs/locale/en-gb"
import $ from "jquery";
import { confirmDialog } from 'primereact/confirmdialog';
import FormModel from '../Form/FormModel';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { getContentBase64 } from '../../utils/Functions';
import { useMain } from '../App';


export default function Profile() {

    const { toast } = useMain();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function callBack(data, content) {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                $(".loading").css("display", "flex");
                $.ajax({
                    url: `http://localhost:3120/identity/${localStorage.getItem("ROLE").includes("CUSTOMER") ? "customers" : "workers"}/${localStorage.getItem("ID")}`,
                    type: "PUT",
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
                    },
                    data: JSON.stringify(
                        { ...data, doB: dayjs(data.doB).add(1, 'day').toISOString().substring(0, 10), file: content, location: data.location?.id }
                    )
                    ,
                    contentType: 'application/json',
                    secure: true,
                    async: true,
                    success: function (data) {
                        if (data.code === 103 || data.code === 101) {
                            toast.current.show({ severity: 'info', summary: 'Confirmed', detail: data.message, life: 3000 });
                        } else {
                            toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                        }
                        $(".loading").css("display", "none")
                        setTimeout(() => {
                            navigate("/")
                        }, 1000)
                    },
                    error: function (data) {
                        setLoading(false)
                    }
                })

            },
            reject() {
                toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });

    }

    const confirm = (data) => {
        getContentBase64(data, callBack)
    };


    return (
        <>
            <div className='headingPane'>
                <div className='siteName'>
                    Carousel
                </div>
                <div className='breadcrumbBoard'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Profile</li>
                    </ol>
                </div>
            </div>
            <div className={style.profileContainer}>
                {
                    (localStorage.getItem("ROLE").includes("CUSTOMER")) ? <ProfileCus confirm={confirm}></ProfileCus> :
                        <ProfileEmployee confirm={confirm}></ProfileEmployee>

                }
                <Link className={style.changePass} to={"/changepassword"}>Change Password</Link>
            </div>
        </>
    )
}



function ProfileCus({ confirm }) {

    return (
        <FormModel
            listInputs={
                [
                    {
                        name: "Drag your image here to update your avatar",
                        valueName: "imgSrc",
                        type: "file",
                        size: { "sm": 12, "lg": 4 },
                        sx: {
                            width: "100%",
                            display: "flex",
                        },
                        editable: true,
                        width: "200px"
                    }, {
                        stack: true,
                        size: { "sm": 12, "lg": 8 },
                        listStacks: [
                            {
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
                                editable: false
                            }, {
                                name: "Loyalty Point",
                                valueName: "loyaltyPoint",
                                type: "TextField",
                                size: 6,
                                editable: false,
                                number: "float"
                            }, {
                                name: "Date Of Birth",
                                valueName: "doB",
                                type: "DateField",
                                size: 6,
                                editable: true,
                            }, {
                                name: "Email",
                                valueName: "email",
                                type: "TextField",
                                size: 6,
                                typeEmail: true,
                                editable: true,
                            }, {
                                name: "Address",
                                valueName: "address",
                                type: "TextField",
                                size: 6,
                                editable: true,
                            }, {
                                name: "Phone Number",
                                valueName: "phoneNumber",
                                type: "TextField",
                                size: 6,
                                editable: true,
                            }, {
                                name: "Rank",
                                valueName: "typeCustomer",
                                type: "Dropdown",
                                size: 6,
                                editable: false,
                                options: [{ label: 'None', value: 'None' },
                                { label: 'Broze', value: 'Broze' },
                                { label: 'Silver', value: 'Silver' },
                                { label: 'Gold', value: "Gold" },
                                { label: 'Platinum', value: "Platinum" }],
                            },
                        ]
                    }]
            }
            id={""}
            link={"http://localhost:3120/identity/customers/getMyInfo"}
            typeForm={"edit"}
            confirm={confirm}
        ></FormModel>
    )
}

function ProfileEmployee({ confirm }) {
    // console.log(confirm);
    return (
        <FormModel
            confirm={confirm}
            listInputs={
                [{
                    name: "Image",
                    valueName: "imgSrc",
                    type: "file",
                    size: { "sm": 12, "lg": 4 },
                    sx: {
                        width: "100%",
                        display: "flex",
                    },
                    editable: true,
                }, {
                    stack: true,
                    size: { "sm": 12, "lg": 8 },
                    listStacks: [
                        {
                            name: "Name",
                            valueName: "nameWorker",
                            type: "TextField",
                            size: 6,
                            editable: true
                        },
                        {
                            name: "Username",
                            valueName: "username",
                            type: "TextField",
                            size: 6,
                            editable: false
                        },
                        {
                            name: "Specialities",
                            valueName: "specialities",
                            type: "TextField",
                            size: 6,
                            editable: true
                        }, {
                            name: "Salary",
                            valueName: "salary",
                            type: "TextField",
                            size: 3,
                            editable: false,
                            number: "float"
                        }, {
                            name: "Rate",
                            valueName: "rate",
                            type: "TextField",
                            size: 3,
                            number: "float",
                            editable: false
                        }, {
                            name: "Date Of Birth",
                            valueName: "doB",
                            type: "DateField",
                            size: { "xs": 6, "sm": 6, "lg": 6 },
                            editable: true,
                        }, {
                            name: "Email",
                            valueName: "email",
                            type: "TextField",
                            size: { "xs": 6, "sm": 6, "lg": 6 },
                            typeEmail: true,
                            editable: true,
                        }, {
                            name: "Address",
                            valueName: "address",
                            type: "TextField",
                            size: { "xs": 12, "sm": 6, "lg": 4 },
                            editable: true,
                        }, {
                            name: "PhoneNumber",
                            valueName: "phoneNumber",
                            type: "TextField",
                            size: { "xs": 6, "sm": 6, "lg": 4 },
                            editable: true,
                        }, {
                            name: "Role",
                            valueName: "idRole",
                            type: "Dropdown",
                            size: { "xs": 6, "sm": 6, "lg": 4 },
                            editable: false,
                            options: [{ label: 'EMPLOYEE', value: 'EMPLOYEE' },
                            { label: 'MANAGER', value: 'MANAGER' },
                            { label: 'ADMIN', value: 'ADMIN' },],
                        }, {
                            name: "Location",
                            valueName: "location",
                            type: "Dropdown",
                            options: [],
                            size: { "xs": 12, "sm": 12, "lg": 8 },
                            editable: false,
                        },
                    ]
                }]
            }
            id={""}
            link={"http://localhost:3120/identity/workers/getMyInfo"}
            typeForm={"edit"}
        ></FormModel>
    )
}
