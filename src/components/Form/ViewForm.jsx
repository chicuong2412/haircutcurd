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


function Components({ type, value, name, options, }) {


    // console.log(value);

    if (type === "TextField") {

        return (
            <TextField
                label={name}
                value={value}
                fullWidth
                slotProps={
                    {
                        input: {
                            readOnly: true,
                        },
                    }
                }
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
                                readOnly: true,
                            },
                        }
                    }
                    value={dayjs(value)}
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
                    />
                </DemoContainer>
            </LocalizationProvider>
        )
    } else if (type === "Dropdown") {
        return (
            <>
                <FormLabel id="demo-radio-buttons-group-label">Type: </FormLabel>
                <Dropdown options={options} value={value}></Dropdown>
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

export default function ViewForm({ id, listInputs, link }) {

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
                {listInputs.map((item, index) => {
                    console.log(item)
                    return (
                        <Grid2 size={item.size}>
                            <Components
                                type={item.type}
                                value={item.value}
                                name={item.name}
                                options={item.options}
                            ></Components>
                        </Grid2>
                    )
                })}
            </Grid2>
        </>
    )
}
