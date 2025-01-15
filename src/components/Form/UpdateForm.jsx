import { Grid2, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import $ from "jquery"
import dayjs from 'dayjs';
import "dayjs/locale/en-gb"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

import style from "../../styles/FormStyle.module.scss";

import SmallServicePane from '../serviceSmallPane';



import { Dropdown } from 'primereact/dropdown';
import { FormLabel } from '@mui/material';

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


function Components({ type, value, name, options, setValue, editable, number }) {


    if (type === "TextField") {

        return (
            <TextField
                label={name}
                value={value}
                fullWidth
                slotProps={
                    {
                        input: {
                            readOnly: editable,
                        },
                    }
                }
                onChange={(e) => {
                    if (number && number === "int") {
                        updateNumber(e, setValue);
                    } else if (number && number === "float") {
                        updateFloatNumber(e, setValue, value);
                    } else
                        setValue(e.target.value)
                }}
                margin='normal'
            ></TextField>
        )
    } else if (type === "DateField") {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DateField
                    label="Date of birth"
                    margin='normal'
                    fullWidth
                    slotProps={
                        {
                            input: {
                                readOnly: editable,
                            },
                        }
                    }
                    value={dayjs(value)}
                    onChange={(newValue) => setValue(newValue)}
                />
            </LocalizationProvider>
        )
    } else if (type === "TimeField") {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimeField
                        label={name}
                        value={value}
                        format='HH:mm'
                        fullWidth
                        onChange={(newValue) => setValue(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
        )
    } else if (type === "Dropdown") {
        return (
            <>
                <FormLabel id="demo-radio-buttons-group-label">Type: </FormLabel>
                <Dropdown options={options} value={value} onChange={(e) => setValue(e.value)}></Dropdown>
            </>
        )
    } else if (type === "list") {
        const [idProductView, setIdProductView] = useState("ID");

        const handleChangeProductView = (event) => {
            setIdProductView(event.target.value);
        }
        return (
            <div className={style.scrollPane}>
                <div className={style.listPane}>
                    <span className={style.formHeading}>{name}</span>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={idProductView}
                        onChange={handleChangeProductView}
                    >
                        <FormControlLabel value="ID" control={<Radio />} label="ID" />
                        <FormControlLabel value="Name" control={<Radio />} label="Name" />
                    </RadioGroup>
                    {options.map((t, index) => {
                        return (<SmallServicePane id={t.id} key={t.id} heading={(idProductView === "ID") ? t.id : t.name}></SmallServicePane>)
                    })}
                </div>
            </div>
        )
    }
}

export default function UpdateForm({ id, listInputs, link }) {

    useEffect(() => {

        $.ajax({
            url: `${link}${id}`,
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
                for (let i of listInputs) {
                    if (data.result.hasOwnProperty(i.valueName) == true) {
                        i.setValue(Object.getOwnPropertyDescriptor(data.result, i.valueName).value);
                    }

                }
            },
            error: function (data) {
            }
        })


    }, []);

    return (
        <>
            <Grid2 container spacing={1}>
                {listInputs.map((item) => {
                    return (
                        <Grid2 size={item.size}>
                            <Components
                                type={item.type}
                                value={item.value}
                                name={item.name}
                                options={item.options}
                                setValue={item.setValue}
                                editTable={item.editable}
                                number={item.number}
                            ></Components>
                        </Grid2>
                    )
                })}
            </Grid2>
        </>
    )
}
