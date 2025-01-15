import React, { useEffect, useState } from 'react'
import style from "../../../styles/FormStyle.module.scss"
import { TextField, } from '@mui/material'
import "dayjs/locale/en-gb"
import { useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../../../layouts/layout';
import $ from "jquery"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

export function ComboForm() {

    const navigate = useNavigate();

    const { toast } = useInfo();
    const [id, setId] = useState("");
    const [nameCombo, setNameCombo] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [rate, setRate] = useState("0");
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const id = searchParams.get("id");
        setId(id);
        $.ajax({
            url: `http://localhost:3120/identity/combos/getComboByID/${id}`,
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
                setNameCombo(data.result.name);
                setDescription(data.result.description);
                setImgSrc(data.result.imgSrc);
                setDuration(data.result.duration);
                setPrice(data.result.price);
                setRate(data.result.rate);
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
            <FontAwesomeIcon databack="combos" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog />
            <div className={style.formEmployee}>
                <div className={style.headingForm}>View Combo Information</div>
                <TextField
                    label="Combo ID"
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
                    value={nameCombo}
                    slotProps={
                        {
                            input: {
                                readOnly: true,
                            },
                        }
                    }
                    fullWidth
                    multiline
                    maxRows={2}
                    required
                    margin='normal'
                >
                </TextField>
                <TextField
                    label="Description"
                    value={description}
                    slotProps={
                        {
                            input: {
                                readOnly: true,
                            },
                        }
                    }
                    fullWidth
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
                            label="Price"
                            fullWidth
                            margin='normal'
                            value={price}
                            slotProps={
                                {
                                    input: {
                                        readOnly: true,
                                    },
                                }
                            }
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Duration"
                            fullWidth
                            value={duration}
                            margin='normal'
                            slotProps={
                                {
                                    input: {
                                        readOnly: true,
                                    },
                                }
                            }
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Rate"
                            fullWidth
                            value={rate}
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
                </div>
            </div>
        </>
    )
}


export function ComboCreateForm() {
    const [idProductView, setIdProductView] = useState("ID");

    const navigate = useNavigate();

    const { toast } = useInfo();
    const [nameCombo, setNameCombo] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [rate, setRate] = useState("0");

    const confirm1 = () => {
        console.log(JSON.stringify({
            name: nameCombo,
            imgSrc: imgSrc,
            description: description,
            duration: duration,
            price: price,
            rate: parseFloat(rate)
        }));

        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept() {
                if (nameCombo !== "" && imgSrc !== "" && description !== "") {
                    $.ajax({
                        url: `http://localhost:3120/identity/combos/create`,
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJncmVhdHNoYW5nLmNvbSIsInN1YiI6ImFkbWluIiwiaWQiOiJlZDcyMzFjZS0zYjg5LTQxOGUtYWM3Ny1iODNhNGRjNjFjY2IiLCJleHAiOjE3NzAzNjMxOTgsImlhdCI6MTczNDM2MzE5OCwic2NvcGUiOiJXT1JLRVIgQURNSU4ifQ.uITT19uUCsf1tGb3ZDF8oE3nKTeF3xpuZyBRhKvBMK7YhQjfPK06N1GGuvszdQ48JPN_cRXNgzpc4QCnk2qi4A`
                        },
                        data: JSON.stringify({
                            name: nameCombo,
                            imgSrc: imgSrc,
                            description: description,
                            duration: duration,
                            price: price,
                            rate: parseFloat(rate)
                        })
                        ,
                        CORS: false,
                        contentType: 'application/json',
                        secure: true,
                        async: false,
                        success: function (data) {
                            if (data.code === 101) {
                                toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Create successfully', life: 3000 });
                                navigate("/combos")
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

    React.useEffect(() => {
        $(".backArrow").on("click", function () {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);

    const updateNumber = (e, setValue) => {
        const val = e.target.value;
        // If the current value passes the validity test then apply that to state
        if (new RegExp("^[0-9]*$").test(val)) setValue(val);
        // If the current val is just the negation sign, or it's been provided an empty string,
        // then apply that value to state - we still have to validate this input before processing
        // it to some other component or data structure, but it frees up our input the way a user
        // would expect to interact with this component
        else if (val === '' || val === '-') setValue(val);
    }

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
            <FontAwesomeIcon databack="combos" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog />
            <div className={style.formEmployee}>
                <div className={style.headingForm}>Create Combo</div>
                <TextField
                    label="Name"
                    value={nameCombo}
                    onChange={(event) => setNameCombo(event.target.value)}
                    fullWidth
                    multiline
                    maxRows={2}
                    required
                    margin='normal'
                >
                </TextField>
                <TextField
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    fullWidth
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
                            onChange={(event) => setImgSrc(event.target.value)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Price"
                            fullWidth
                            margin='normal'
                            value={price}
                            onChange={event => updateNumber(event, setPrice)}
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Duration"
                            fullWidth
                            value={duration}
                            margin='normal'
                            onChange={event => updateNumber(event, setDuration)}
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Rate"
                            fullWidth
                            value={rate}
                            onChange={(event) => updateFloatNumber(event, setRate, rate)}
                            margin='normal'
                            error={(parseFloat(rate) >= 0 && parseFloat(rate) <= 5) ? false : true}
                            helperText={(parseFloat(rate) >= 0 && parseFloat(rate) <= 5) ? "" : "Rate needs to be between 0 and 5"}
                        >
                        </TextField>
                    </div>
                </div>
                <Button onClick={confirm1} variant='contained'>Create</Button>
            </div>
        </>
    )
}


export function EditingComboForm() {
    const navigate = useNavigate();

    const { toast } = useInfo();
    const [id, setId] = useState("");
    const [nameCombo, setNameCombo] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [rate, setRate] = useState("0");
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const id = searchParams.get("id");
        setId(id);
        $.ajax({
            url: `http://localhost:3120/identity/combos/getComboByID/${id}`,
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
                setNameCombo(data.result.name);
                setDescription(data.result.description);
                setImgSrc(data.result.imgSrc);
                setDuration(data.result.duration);
                setPrice(data.result.price);
                setRate(data.result.rate);
            },
            error: function (data) {
            }
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
                if (nameCombo !== "" && imgSrc !== "" && description !== "" && rate !== "") {
                    $.ajax({
                        url: `http://localhost:3120/identity/combos/update/${idPar}`,
                        type: 'PUT',
                        dataType: 'json',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("JWT")}`,
                        },
                        data: JSON.stringify({
                            name: nameCombo,
                            imgSrc: imgSrc,
                            description: description,
                            duration: duration,
                            price: price,
                            rate: parseFloat(rate)
                        })
                        ,
                        CORS: false,
                        contentType: 'application/json',
                        secure: true,
                        async: false,
                        success: function (data) {
                            if (data.code === 103) {
                                toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Create successfully', life: 3000 });
                                navigate("/combos")
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
            <FontAwesomeIcon databack="combos" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog />
            <div className={style.formEmployee}>
                <div className={style.headingForm}>Update Combo Information</div>
                <TextField
                    label="Combo ID"
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
                    value={nameCombo}
                    onChange={(event) => setNameCombo(event.target.value)}
                    fullWidth
                    multiline
                    maxRows={2}
                    required
                    margin='normal'
                >
                </TextField>
                <TextField
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    fullWidth
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
                            onChange={(event) => setImgSrc(event.target.value)}
                            margin='normal'
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Price"
                            fullWidth
                            margin='normal'
                            value={price}
                            onChange={event => updateNumber(event, setPrice)}
                        >
                        </TextField>
                    </div>
                </div>
                <div className={style.flexContainer}>
                    <div className='col-2'>
                        <TextField
                            label="Duration"
                            fullWidth
                            value={duration}
                            margin='normal'
                            onChange={event => updateNumber(event, setDuration)}
                        >
                        </TextField>
                    </div>
                    <div className='col-2'>
                        <TextField
                            label="Rate"
                            fullWidth
                            value={rate}
                            onChange={(event) => updateFloatNumber(event, setRate, rate)}
                            margin='normal'
                            error={(parseFloat(rate) >= 0 && parseFloat(rate) <= 5) ? false : true}
                            helperText={(parseFloat(rate) >= 0 && parseFloat(rate) <= 5) ? "" : "Rate needs to be between 0 and 5"}
                        >
                        </TextField>
                    </div>
                </div>
                <Button onClick={confirm1} variant='contained'>Update</Button>
            </div>
        </>
    )
}

