import { Grid2, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import $ from "jquery"
import dayjs from 'dayjs';
import "dayjs/locale/en-gb"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Dropdown } from 'primereact/dropdown';
import { FormLabel } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import List from '../List/List';


const updateNumber = (e, setValue, value) => {
    const val = (value !== undefined) ? e.target.value : "";
    // If the current value passes the validity test then apply that to state
    if (new RegExp("^[0-9]*$").test(val)) setValue(val);
    // If the current val is just the negation sign, or it's been provided an empty string,
    // then apply that value to state - we still have to validate this input before processing
    // it to some other component or data structure, but it frees up our input the way a user
    // would expect to interact with this component
    else if (val === '-') setValue(val);

}

const updateFloatNumber = (e, setValue, preValue) => {
    const val = e.target.value;
    const stringPre = (preValue !== undefined) ? preValue.toString() : "";
    let index = stringPre.indexOf(".");

    if ((index == -1 && new RegExp("^[0-9.]*$").test(val.charAt(val.length - 1)))
        || (index != -1 && new RegExp("^[0-9]*$").test(val.charAt(val.length - 1)))
        || (index != -1 && val.charAt(val.length - 1) === '.' && index === (val.length - 1))) {
        setValue(val);
    }

}


function Components({ type, value, name, options, setValue, editable, number, typeForm, invalid, error, label }) {
    if (type === "TextField") {
        return (
            <TextField
                label={name}
                value={value}
                fullWidth
                slotProps={
                    {
                        input: {
                            readOnly: !editable,
                        },
                    }
                }
                onChange={(e) => {
                    if (number && number === "int") {
                        updateNumber(e, setValue, value);
                    } else if (number && number === "float") {
                        updateFloatNumber(e, setValue, value);
                    } else
                        setValue(e.target.value)
                }}
                margin='none'
                error={invalid}
                helperText={invalid && error?.message}
            ></TextField>
        )
    } else if (type === "DateField") {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DateField
                    label="Date of birth"
                    margin='none'
                    fullWidth
                    slotProps={
                        {
                            input: {
                                readOnly: !editable,
                            },
                        }
                    }
                    value={dayjs(value)}
                    onChange={(newValue) => {
                        if (editable) {
                            setValue(newValue)
                        }
                    }}
                />
            </LocalizationProvider>
        )
    } else if (type === "TimeField") {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimeField
                        label={name}
                        value={dayjs(`${(typeof value === "string") ? `2022-04-17T${value?.substring(0, 5)}` : value}`)}
                        format='HH:mm'
                        fullWidth
                        onChange={(newValue) => {
                            if (editable) {
                                setValue(newValue)
                            }
                        }}
                    />
                </DemoContainer>
            </LocalizationProvider>
        )
    } else if (type === "Dropdown") {
        const optionTemplate = (option) => {
            if (option !== undefined && option.label === undefined) {
                return (
                    <div>
                        <div>{option?.id}</div>
                        <div>{option[`${(label !== undefined) ? label:"name"}`]}</div>
                        {(option.location !== undefined) ? <div>Location: {option.location?.id}</div>: ""}
                        {(option.location !== undefined) ? <div>Location: {option.location?.name}</div>: ""}
                    </div>
                );
            } else {
                return (
                    <div>
                        <div>{option?.label}</div>
                    </div>
                );
            }

        };

        const selectedTemplate = (option, props) => {
            if (value !== undefined && value?.label === undefined && typeof value === "object") {
                return (
                    <div>
                        <div>{value?.id}</div>
                        {/* <div>{value[`${(label !== undefined) ? label:"name"}`]}</div> */}
                    </div>
                );
            } else if (value !== undefined && typeof value !== "object") {
                return (
                    <div>
                        <div>{value}</div>
                    </div>
                );
            }

            return <span>{props.placeholder}</span>;
        };
        
        
        return (
            <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                <FormLabel style={{ height: "fit-content" }} id="demo-radio-buttons-group-label">{name}: </FormLabel>
                <Dropdown
                    options={options}
                    value={value}
                    style={{ flexGrow: 1, height: "56px", alignSelf: "center", width: "72%" }}
                    onChange={(e) => {
                        if (editable) {
                            setValue(e.value)
                        }
                    }}
                    valueTemplate={selectedTemplate}
                    itemTemplate={optionTemplate}
                    filterBy={"id,label,nameWorker,value,location.id,location.name,name,username,nameCustomer"}
                    filter
                    optionLabel={`${(label !== undefined) ? label:"name"}`}
                    placeholder="Select an option"
                ></Dropdown>
            </div>
        )
    } else if (type === "list") {
        let target = value;
        if (typeForm === "create") {
            target = [];
        }
        return (
            <>
                <h1>{name}</h1>
                <List value={target} options={options} setValue={setValue} editable={editable} />
            </>
        )
    } else if (type === "datetime") {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        label={name}
                        value={dayjs(value)}
                        onChange={(newValue) => {
                            if (editable) {
                                setValue(newValue)
                            }
                        }}
                    />
                </DemoContainer>
            </LocalizationProvider>
        )
    }
}

export default function FormModel({ id, listInputs, link, typeForm, confirm }) {
    const { handleSubmit, control, setValue, getValues } = useForm();
    useEffect(() => {
        if (typeForm == "edit" || typeForm === "view") {
            $.ajax({
                url: `${link}/${id}`,
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
                            if (i.getObject) {
                                setValue(i.valueName, objectGetByID(i, Object.getOwnPropertyDescriptor(data.result, i.valueName).value));
                            } else
                                setValue(i.valueName, Object.getOwnPropertyDescriptor(data.result, i.valueName).value);
                        }
                    }
                },
                error: function (data) {
                }
            })
        }


    }, []);


    const objectGetByID = (input, value) => {
        for (let i of input.options) {
            if (i.id === value) {
                return i;
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                confirm({ ...data })
            })}>
                <Grid2 container spacing={1} sx={{ marginBottom: "20px", paddingTop: "10px" }}>
                    {listInputs.map((item, index) => {
                        return (
                            <Grid2 size={item.size} key={index}>
                                <Controller
                                    control={control}
                                    name={`${item.valueName}`}
                                    rules={item.rules}
                                    defaultValue={item.defaultValue ?? ""}
                                    render={({ field: { onChange, onblur, value }, fieldState: { invalid, error } }) => {
                                        return (
                                            <Components
                                                type={item.type}
                                                value={value}
                                                name={item.name}
                                                options={item.options}
                                                setValue={onChange}
                                                editable={(typeForm === "view") ? false : item.editable}
                                                number={item.number}
                                                typeForm={typeForm}
                                                error={error}
                                                invalid={invalid}
                                                label={item.label}
                                            ></Components>)
                                    }}
                                ></Controller>
                            </Grid2>
                        )
                    })}

                </Grid2>
                {(typeForm === "edit") ? (<Button type='submit' variant="contained" endIcon={<SendIcon />} autoFocus>
                    UPDATE
                </Button>) : (typeForm === "create") ? (<Button type='submit' variant="contained" endIcon={<SendIcon />} autoFocus>
                    CREATE
                </Button>) : ""}
            </form>
        </>
    )
}
