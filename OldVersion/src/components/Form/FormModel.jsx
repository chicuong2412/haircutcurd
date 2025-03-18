import { Grid2, TextField } from '@mui/material'
import React, { memo, useEffect } from 'react'
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

    if (new RegExp("^[0-9]*$").test(val)) setValue(val);

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


function Components({ type, value, name, options, setValue, editable, number, typeForm, invalid, error, label, width }) {
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
                        <div>{option[`${(label !== undefined) ? label : "name"}`]}</div>
                        {(option.location !== undefined) ? <div>Location: {option.location?.id}</div> : ""}
                        {(option.location !== undefined) ? <div>Location: {option.location?.name}</div> : ""}
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
                    optionLabel={`${(label !== undefined) ? label : "name"}`}
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
    } else if (type === "file") {
        const uploadURL = async (event) => {
            var file = event.target.files[0];

            try {
                var link = URL.createObjectURL(file)
                setValue(link);
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <>
                <div className="imageForm flex flex-column" style={{ alignItems: "center", width: "100%", justifySelf: "center" }}>
                    <img className=" mt-5" referrerPolicy='no-referrer' width={`${(width !== undefined) ? width : 150}px`} src={(value !== "") ? value : value} />
                    <label for={"actual-btn"} id='chooseFile'>Choose file</label>
                    <input id="actual-btn" className='customFileInput' type='file' accept='image/*' onChange={(event) => {
                        uploadURL(event)
                    }} />
                </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default memo(function FormModel({ id, listInputs, link, typeForm, confirm }) {
    const { handleSubmit, control, setValue, getValues } = useForm();
    useEffect(() => {
        if (typeForm == "edit" || typeForm === "view") {
            $.ajax({
                url: `${link}${(id) ? "/" : ""}${id}`,
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
                        if (i.stack !== undefined && i.stack) {
                            i.listStacks.forEach(element => {
                                if (data.result.hasOwnProperty(element.valueName) == true) {
                                    if (element.getObject) {
                                        setValue(element.valueName, objectGetByID(element, Object.getOwnPropertyDescriptor(data.result, element.valueName).value));
                                    } else
                                        setValue(element.valueName, Object.getOwnPropertyDescriptor(data.result, element.valueName).value);
                                }
                            });
                        } else {
                            if (data.result.hasOwnProperty(i.valueName) == true) {
                                if (i.getObject) {
                                    setValue(i.valueName, objectGetByID(i, Object.getOwnPropertyDescriptor(data.result, i.valueName).value));
                                } else
                                    setValue(i.valueName, Object.getOwnPropertyDescriptor(data.result, i.valueName).value);
                            }
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
                        if (item.stack !== undefined && item.stack) {
                            return (
                                <Grid2 container size={item.size} key={index} sx={item.sx}>
                                    {item.listStacks.map((itemCons, index) => {
                                        return (
                                            <Grid2 size={itemCons.size} key={index} sx={item.sx}>
                                                <Controller
                                                    control={control}
                                                    name={`${itemCons.valueName}`}
                                                    rules={itemCons.rules}
                                                    defaultValue={itemCons.defaultValue ?? ""}
                                                    render={({ field: { onChange, value }, fieldState: { invalid, error } }) => {
                                                        return (
                                                            <Components
                                                                type={itemCons.type}
                                                                value={value}
                                                                name={itemCons.name}
                                                                options={itemCons.options}
                                                                setValue={onChange}
                                                                editable={(typeForm === "view") ? false : itemCons.editable}
                                                                number={itemCons.number}
                                                                typeForm={typeForm}
                                                                error={error}
                                                                invalid={invalid}
                                                                label={item.label}
                                                                width={item.width}
                                                            ></Components>)
                                                    }}
                                                ></Controller>
                                            </Grid2>
                                        )
                                    })}
                                </Grid2>
                            )
                        } else {
                            {/* console.log(item) */}
                            return (
                                <Grid2 size={item.size} key={index} sx={item.sx}>
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
                                                    width={item.width}
                                                ></Components>)
                                        }}
                                    ></Controller>
                                </Grid2>
                            )
                        }
                    })}

                </Grid2>
                {(typeForm === "edit") ? (<Button type='submit' variant="contained" endIcon={<SendIcon />}>
                    UPDATE
                </Button>) : (typeForm === "create") ? (<Button type='submit' variant="contained" endIcon={<SendIcon />}>
                    CREATE
                </Button>) : ""}
            </form>
        </>
    )
});
