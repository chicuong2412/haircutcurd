import React, { useEffect, useState, useRef } from 'react'
import style from "../../../styles/FormStyle.module.scss"
import { TextField, } from '@mui/material'
import "dayjs/locale/en-gb"
import { useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../../../layouts/layout';
import $ from "jquery"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimeField } from '@mui/x-date-pickers';

export function LocationForm() {

    const navigate = useNavigate();

    const { toast } = useInfo();
    const [id, setId] = useState("");
    const [nameLocation, setNameLocation] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const id = searchParams.get("id");
        setId(id);
        $.ajax({
            url: `http://localhost:3120/identity/locations/getLocation/${id}`,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJncmVhdHNoYW5nLmNvbSIsInN1YiI6ImFkbWluIiwiaWQiOiJlZDcyMzFjZS0zYjg5LTQxOGUtYWM3Ny1iODNhNGRjNjFjY2IiLCJleHAiOjE3NzAzNjMxOTgsImlhdCI6MTczNDM2MzE5OCwic2NvcGUiOiJXT1JLRVIgQURNSU4ifQ.uITT19uUCsf1tGb3ZDF8oE3nKTeF3xpuZyBRhKvBMK7YhQjfPK06N1GGuvszdQ48JPN_cRXNgzpc4QCnk2qi4A`
            },
            CORS: false,
            contentType: 'application/json',
            secure: true,
            async: false,
            success: function (data) {
                setNameLocation(data.result.name);
                setAddress(data.result.address);
                setImgSrc(data.result.imgSrc);
                setPhoneNumber(data.result.phoneNumber);
                setCity(data.result.city);
                setEmail(data.result.email);
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
            <FontAwesomeIcon databack="locations" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog />
            <div className={style.formEmployee}>
                <div className={style.headingForm}>View Location Information</div>
                <TextField
                    label="Location ID"
                    value={id}
                    fullWidth
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
                <TextField
                    label="Name"
                    value={nameLocation}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                    fullWidth
                    multiline
                    maxRows={2}
                    margin='normal'
                >
                </TextField>
                <TextField
                    label="Address"
                    value={address}
                    fullWidth
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                    multiline
                    maxRows={5}
                    required
                    margin='normal'
                >
                </TextField>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Img Src"
                            fullWidth
                            value={imgSrc}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="City"
                            fullWidth
                            margin='normal'
                            value={city}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Phone Number"
                            fullWidth
                            value={phoneNumber}
                            margin='normal'
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
            </div>
        </>
    )
}


export function LocationCreateForm() {
    const navigate = useNavigate();

    const { toast } = useInfo();
    const [nameLocation, setNameLocation] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
    const [email, setEmail] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        $(".backArrow").on("click", function () {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);

    const confirm1 = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                const idPar = searchParams.get("id");
                if (nameLocation !== "" && imgSrc !== "" && address !== "" && email !== "" && phoneNumber != "" && city != "") {
                    $.ajax({
                        url: `http://localhost:3120/identity/locations/create`,
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
                        },
                        data: JSON.stringify({
                            name: nameLocation,
                            imgSrc: imgSrc,
                            address: address,
                            phoneNumber: phoneNumber,
                            city: city,
                            email: email,
                            openHour: `${(value.hour() < 10) ? "0" : ""}${value.hour()}:${(value.minute() < 10) ? "0" : ""}${value.minute()}`
                        })
                        ,
                        CORS: false,
                        contentType: 'application/json',
                        secure: true,
                        async: false,
                        success: function (data) {
                            if (data.code === 101) {
                                toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Create successfully', life: 3000 });
                                navigate("/Locations")
                            } else {
                                toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                            }
                        },
                        error: function (data) {

                        }
                    })
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please, fill in the required inputs', life: 3000 });
                }
            },
            reject() {
                toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    };

    return (
        <>
            <FontAwesomeIcon databack="locations" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog />
            <div className={style.formEmployee}>
                <div className={style.headingForm}>Create Location Information</div>
                <TextField
                    label="Name"
                    value={nameLocation}
                    onChange={(event) => setNameLocation(event.target.value)}
                    fullWidth
                    multiline
                    maxRows={2}
                    required
                    margin='normal'
                >
                </TextField>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                <TimeField
                                    label="Open hour"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    format='HH:mm'
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            fullWidth
                            multiline
                            maxRows={5}
                            required
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Img Src"
                            fullWidth
                            required
                            value={imgSrc}
                            onChange={(event) => setImgSrc(event.target.value)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="City"
                            fullWidth
                            required
                            margin='normal'
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Phone Number"
                            fullWidth
                            required
                            value={phoneNumber}
                            margin='normal'
                            onChange={event => setPhoneNumber(event.target.value)}
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Email"
                            fullWidth
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <Button onClick={confirm1} variant='contained'>Create</Button>
            </div>
        </>
    )
}


export function EditingLocationForm() {
    const navigate = useNavigate();

    const { toast } = useInfo();
    const [id, setId] = useState("");
    const [nameLocation, setNameLocation] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
    const [email, setEmail] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();


    React.useEffect(() => {
        const id = searchParams.get("id");
        setId(id);
        $.ajax({
            url: `http://localhost:3120/identity/locations/getLocation/${id}`,
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
                setNameLocation(data.result.name);
                setAddress(data.result.address);
                setImgSrc(data.result.imgSrc);
                setPhoneNumber(data.result.phoneNumber);
                setCity(data.result.city);
                setEmail(data.result.email);
                let time = `2022-04-17T${data.result.openHour}`;
                setValue(dayjs(time.substring(0, 16)));

            },
            error: function (data) {
            }
        })

        $(".backArrow").on("click", function () {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);


    const confirm1 = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                const idPar = searchParams.get("id");
                if (nameLocation !== "" && imgSrc !== "" && address !== "" && email !== "" && phoneNumber != "" && city != "") {
                    $.ajax({
                        url: `http://localhost:3120/identity/locations/update/${idPar}`,
                        type: 'PUT',
                        dataType: 'json',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
                        },
                        data: JSON.stringify({
                            name: nameLocation,
                            imgSrc: imgSrc,
                            address: address,
                            phoneNumber: phoneNumber,
                            city: city,
                            email: email,
                            openHour: `${(value.hour() < 10) ? "0" : ""}${value.hour()}:${(value.minute() < 10) ? "0" : ""}${value.minute()}`
                        })
                        ,
                        CORS: false,
                        contentType: 'application/json',
                        secure: true,
                        async: false,
                        success: function (data) {
                            if (data.code === 103) {
                                toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Create successfully', life: 3000 });
                                navigate("/Locations")
                            } else {
                                toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                            }
                        },
                        error: function (data) {

                        }
                    })
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please, fill in the required inputs', life: 3000 });
                }
            },
            reject() {
                toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    };


    const updateFloatNumber = (e, setValue, preValue) => {
        const val = e.target.value;
        const stringPre = preValue.toString();
        let index = stringPre.indexOf(".");

        if ((index == -1 && new RegExp("^[0-9.]*$").test(val.charAt(val.length - 1)))
            || (index != -1 && new RegExp("^[0-9]*$").test(val.charAt(val.length - 1)))
            || (index != -1 && val.charAt(val.length - 1) === '.' && index === (val.length - 1))) {
            setValue(val);
        }

    }


    return (
        <>
            <FontAwesomeIcon databack="locations" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog />
            <div className={style.formEmployee}>
                <div className={style.headingForm}>Update Location Information</div>
                <TextField
                    label="Location ID"
                    value={id}
                    fullWidth
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
                <TextField
                    label="Name"
                    value={nameLocation}
                    onChange={(event) => setNameLocation(event.target.value)}
                    fullWidth
                    multiline
                    maxRows={2}
                    required
                    margin='normal'
                >
                </TextField>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                <TimeField
                                    label="Open hour"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    format='HH:mm'
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            fullWidth
                            multiline
                            maxRows={5}
                            required
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Img Src"
                            fullWidth
                            required
                            value={imgSrc}
                            onChange={(event) => setImgSrc(event.target.value)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="City"
                            fullWidth
                            required
                            margin='normal'
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Phone Number"
                            fullWidth
                            required
                            value={phoneNumber}
                            margin='normal'
                            onChange={event => setPhoneNumber(event.target.value)}
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Email"
                            fullWidth
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                </div>
                <Button onClick={confirm1} variant='contained'>Update</Button>
            </div>
        </>
    )
}

