import React, { useState } from 'react'
import style from "../../../styles/FormStyle.module.scss"
import { TextField, Radio, RadioGroup, FormControlLabel, FormLabel, } from '@mui/material'
import dayjs from 'dayjs';
import "dayjs/locale/en-gb"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useInfo } from '../../../layouts/layout';
import { Dropdown } from 'primereact/dropdown';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from "jquery"
import { DatePicker } from '@mui/x-date-pickers';


export function CustomerForm() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [nameCustomer, setnameCustomer] = useState("");
    const [typeOfCustomer, setTypeOfCustomer] = useState("None");
    const [password, setPassword] = useState("");
    const [doB, setDob] = useState(dayjs("2000-01-01"));
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [loyaltyPoint, setLoyaltyPoint] = useState("");

    const navigate = useNavigate();


    const typeCustomer = [
        { label: 'None', value: 'None' },
        { label: 'Broze', value: 'Broze' },
        { label: 'Silver', value: 'Silver' },
        { label: 'Gold', value: "Gold" },
        { label: 'Platinum', value: "Platinum" }
    ];

    React.useEffect(() => {

        const id = searchParams.get("id");
        setId(id);
        $.ajax({
            url: `http://localhost:3120/identity/customers/${id}`,
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
                console.log(data);
                console.log(Object.keys(data.result));
                
                setnameCustomer(data.result.nameCustomer);
                setAddress(data.result.address);
                setUsername(data.result.username);
                setDob(dayjs(data.result.doB));
                setTypeOfCustomer(data.result.typeCustomer);
                setLoyaltyPoint(data.result.loyaltyPoint);
                setEmail(data.result.email);
                setPhoneNumber(data.result.phoneNumber);
                // setPassword(data.result.password);
            },
            error: function (data) {
            }
        })

        $(".backArrow").on("click", function () {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);


    return (
        <>
            <FontAwesomeIcon databack="customers" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog></ConfirmDialog>
            <div className={style.formEmployee}>
                <div className={style.headingForm}>View new Customer</div>
                <TextField
                    label="ID"
                    fullWidth
                    value={id}
                    slotProps={
                        {
                            input: {
                                readOnly: true,
                            },
                        }
                    }
                    margin='normal'
                >
                </TextField>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Name"
                            fullWidth
                            value={nameCustomer}
                            slotProps={
                                {
                                    input: {
                                        readOnly: true,
                                    },
                                }
                            }
                            margin='normal'
                        >
                        </TextField>

                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Username"
                            fullWidth
                            slotProps={
                                {
                                    input: {
                                        readOnly: true,
                                    },
                                }
                            }
                            value={username}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Password"
                            fullWidth
                            slotProps={
                                {
                                    input: {
                                        readOnly: true,
                                    },
                                }
                            }
                            value={password}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DateField
                                label="Date of birth"
                                margin='normal'
                                fullWidth
                                slotProps={
                                    {
                                        input: {
                                            readOnly: true,
                                        },
                                    }
                                }
                                value={dayjs(doB)}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Email"
                            fullWidth
                            slotProps={
                                {
                                    input: {
                                        readOnly: true,
                                    },
                                }
                            }
                            value={email}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Phone number"
                            fullWidth
                            slotProps={
                                {
                                    input: {
                                        readOnly: true,
                                    },
                                }
                            }
                            value={phoneNumber}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <TextField
                    label="Address"
                    fullWidth
                    value={address}
                    margin='normal'
                >
                </TextField>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Loyalty point"
                            fullWidth
                            slotProps={
                                {
                                    input: {
                                        readOnly: true,
                                    },
                                }
                            }
                            value={loyaltyPoint}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <FormLabel id="demo-radio-buttons-group-label">Type:</FormLabel>
                        <Dropdown options={typeCustomer} value={typeOfCustomer}></Dropdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export function CustomerCreateForm() {

    const [username, setUsername] = useState("");
    const [nameCustomer, setnameCustomer] = useState("");
    const [typeOfCustomer, setTypeOfCustomer] = useState("None");
    const [password, setPassword] = useState("");
    const [doB, setDob] = useState(dayjs("2000-01-01"));
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [loyaltyPoint, setLoyaltyPoint] = useState("");


    const navigate = useNavigate();

    const { toast } = useInfo();


    const confirm1 = () => {
        // confirmDialog({
        //     message: 'Are you sure you want to proceed?',
        //     header: 'Confirmation',
        //     icon: 'pi pi-exclamation-triangle',
        //     defaultFocus: 'accept',
        //     accept() {
        //         if (nameCustomer !== "" && username !== "" && password !== "" && doB.isValid() && loyaltyPoint != "") {
        //             $.ajax({
        //                 url: `http://localhost:3120/identity/customers`,
        //                 type: 'POST',
        //                 dataType: 'json',
        //                 headers: {
        //                     'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
        //                 },
        //                 data: JSON.stringify({
        //                     nameCustomer: nameCustomer,
        //                     doB: doB.add(1, 'day').toISOString().substring(0, 10),
        //                     username: username,
        //                     password: password,
        //                     loyaltyPoint: loyaltyPoint,
        //                     address: address,
        //                     typeCustomer: typeOfCustomer,
        //                     email: email,
        //                     phoneNumber: phoneNumber
        //                 })
        //                 ,
        //                 CORS: false,
        //                 contentType: 'application/json',
        //                 secure: true,
        //                 async: false,
        //                 success: function (data) {
        //                     if (data.code === 103) {
        //                         toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Create successfully', life: 3000 });
        //                         navigate("/customers")
        //                     } else {
        //                         toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
        //                     }
        //                 },
        //                 error: function (data) {

        //                 }
        //             })
        //         } else {
        //             toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please, fill in the required inputs', life: 3000 });
        //         }
        //     },
        //     reject() {
        //         toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        //     }
        // });
    };

    const typeCustomer = [
        { label: 'None', value: 'None' },
        { label: 'Broze', value: 'Broze' },
        { label: 'Silver', value: 'Silver' },
        { label: 'Gold', value: "Gold" },
        { label: 'Platinum', value: "Platinum" }
    ];

    const updateNumber = (e, setValue) => {
        const val = e.target.value;

        if (new RegExp("^[0-9]*$").test(val))
            setValue(val);
        else if (val === '')
            setValue(val);
    }

    React.useEffect(() => {
        $(".backArrow").on("click", function () {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);

    return (
        <>
            <FontAwesomeIcon databack="customers" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog></ConfirmDialog>
            <div className={style.formEmployee}>
                <div className={style.headingForm}>Adding new Customer</div>
                <TextField
                    label="Name"
                    value={nameCustomer}
                    fullWidth
                    required
                    onChange={(e) => setnameCustomer(e.target.value)}
                    margin='normal'
                >
                </TextField>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Username"
                            fullWidth
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin='normal'
                        >
                        </TextField>

                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Password"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker
                                label="Date of birth"
                                margin='normal'
                                required
                                value={doB}
                                onChange={(newValue) => setDob(newValue)}
                                fullWidth
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='col-2'>
                        <FormLabel id="demo-radio-buttons-group-label">Type:</FormLabel>
                        <Dropdown options={typeCustomer} value={typeOfCustomer} onChange={(e) => setTypeOfCustomer(e.value)}></Dropdown>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Phone number"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => updateNumber(e, setPhoneNumber)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <TextField
                    label="Address"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    margin='normal'
                >
                </TextField>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Loyalty point"
                            fullWidth
                            value={loyaltyPoint}
                            onChange={(e) => updateNumber(e, setLoyaltyPoint)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <Button onClick={confirm1} variant="contained">Create</Button>
            </div>
        </>
    )
}

export function EditCustomerForm() {


    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("id"));


    var customerID = "474628c5-69fb-4ce5-b64a-4612975157cc";
    var username = "khanhly";
    var name = "Khanh Ly";

    // "loyaltyPoint": 950.0,
    //         "email": "ly.khanh@gmail.com",
    //         "address": "Hai Phong",
    //         "phoneNumber": "0945566778",
    //         "startDate": "2024-04-12",
    //         "lastDayUsing": "2024-11-20",
    //         "typeCustomer": "None",
    //         "doB": "1993-03-22",

    var startDate = "2024-04-12";
    var lastDayUsing = "2024-11-20";
    var email = "khoa.le@gmail.com";
    var phoneNumber = "0945566778";
    var address = "Hai Phong";
    var doB = "1993-03-22";

    var loyaltyPoint = 950;

    var rate = 0;

    var type = "None";

    const navigate = useNavigate();

    const { toast } = useInfo();

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        navigate("/customers");
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm1 = (id) => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    const typeCustomer = [
        { label: 'None', value: 'None' },
        { label: 'Broze', value: 'Broze' },
        { label: 'Silver', value: 'Silver' },
        { label: 'Gold', value: "Gold" },
        { label: 'Platinum', value: "Platinum" }
    ];

    React.useEffect(() => {
        $(".backArrow").on("click", function () {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);



    return (
        <>
            <FontAwesomeIcon databack="customers" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog></ConfirmDialog>
            <div className={style.formEmployee}>
                <div className={style.headingForm}>Update new Customer</div>
                <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    margin='normal'
                >
                </TextField>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Username"
                            fullWidth
                            value={username}
                            margin='normal'
                        >
                        </TextField>

                    </div>
                    <div className='col-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DateField
                                label="Start Date"
                                margin='normal'
                                value={dayjs(startDate)}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DateField
                                label="Date of birth"
                                margin='normal'
                                value={dayjs(doB)}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='col-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DateField
                                label="Start date"
                                margin='normal'
                                value={dayjs(lastDayUsing)}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Phone number"
                            fullWidth
                            value={phoneNumber}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <TextField
                    label="Address"
                    fullWidth
                    value={address}
                    margin='normal'
                >
                </TextField>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Loyalty point"
                            fullWidth
                            value={loyaltyPoint}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <FormLabel id="demo-radio-buttons-group-label">Type:</FormLabel>
                        <Dropdown options={typeCustomer} value={type}></Dropdown>
                    </div>
                </div>
                <Button onClick={confirm1} variant="contained">Update</Button>
            </div>
        </>
    )
}
