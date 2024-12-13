import React from 'react'
import style from "../../../styles/FormStyle.module.scss"
import { TextField, Radio, RadioGroup, FormControlLabel, FormLabel, } from '@mui/material'
import dayjs from 'dayjs';
import "dayjs/locale/en-gb"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export function EmployeeForm() {


    const [idLocaionView, setIdLocaionView] = React.useState('ID');
    const [locationView, setLocationView] = React.useState();


    React.useEffect(() => {
        setLocationView(locationID)
    }, [])

    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("id"));


    var workerID = "e52685c3-46f8-4937-bcfc-a5be225a6ca3";
    var username = "khoa98765";
    var nameWorker = "Le Minh Khoa";

    var specialities = "Designer";
    var email = "khoa.le@gmail.com";
    var phoneNumber = "0913456789";
    var address = "District 3";

    var salary = 1250;

    var locationID = "0faa608d-53a0-4092-8f0b-ab9101ed67e9";
    var locationAddress = "Ha Dong";

    var rate = 0;

    const handleChangeLocationView = (event) => {
        setIdLocaionView(event.target.value);

        setLocationView((event.target.value === "ID") ? locationID : locationAddress);

    };



    return (
        <div className={style.formEmployee}>
            <TextField
                label="Worker ID"
                value={workerID}
                fullWidth
                margin='normal'
            >
            </TextField>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            // onChange={handleChangeCustomerView}
            >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <TextField
                        label="Username"
                        value={username}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Name"
                        value={nameWorker}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <DateField
                            label="Date of birth"
                            value={dayjs('2001-04-17')}
                            margin='normal'
                        />
                    </LocalizationProvider>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Specialities"
                        value={specialities}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <TextField
                        label="Email"
                        value={email}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Phone number"
                        value={phoneNumber}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <TextField
                label="Address"
                value={address}
                fullWidth
                margin='normal'
            >
            </TextField>
            <TextField
                label="Location"
                value={locationView}
                fullWidth
                margin='normal'
            >
            </TextField>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={idLocaionView}
                onChange={handleChangeLocationView}
            >
                <FormControlLabel value="ID" control={<Radio />} label="ID" />
                <FormControlLabel value="Name" control={<Radio />} label="Name" />
            </RadioGroup>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <TextField
                        label="Salary"
                        value={salary}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Rate"
                        value={rate}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
        </div>
    )
}

export function EmployeeCreateForm() {


    const [idLocaionView, setIdLocaionView] = React.useState('ID');
    const [locationView, setLocationView] = React.useState();


    React.useEffect(() => {
        setLocationView(locationID)
    }, [])

    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("id"));


    var workerID = "e52685c3-46f8-4937-bcfc-a5be225a6ca3";
    var username = "khoa98765";
    var nameWorker = "Le Minh Khoa";

    var specialities = "Designer";
    var email = "khoa.le@gmail.com";
    var phoneNumber = "0913456789";
    var address = "District 3";

    var salary = 1250;

    var locationID = "0faa608d-53a0-4092-8f0b-ab9101ed67e9";
    var locationAddress = "Ha Dong";

    var rate = 0;

    const handleChangeLocationView = (event) => {
        setIdLocaionView(event.target.value);

        setLocationView((event.target.value === "ID") ? locationID : locationAddress);

    };



    return (
        <div className={style.formEmployee}>
            <div className={style.headingForm}>Adding new Employee</div>
            <TextField
                label="Name"
                fullWidth
                margin='normal'
            >
            </TextField>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            // onChange={handleChangeCustomerView}
            >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            <div className={style.flexContainer}>


                <div className='col-2'>
                    <TextField
                        label="Username"
                        fullWidth
                        margin='normal'
                    >
                    </TextField>

                </div>
                <div className='col-2'>
                    <TextField
                        label="Password"
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <DateField
                            label="Date of birth"
                            margin='normal'
                        />
                    </LocalizationProvider>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Specialities"
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <TextField
                        label="Email"
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Phone number"
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <TextField
                label="Address"
                fullWidth
                margin='normal'
            >
            </TextField>
            <TextField
                label="Location"
                fullWidth
                margin='normal'
            >
            </TextField>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <TextField
                        label="Salary"
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Rate"
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <Button variant="contained">Create</Button>
        </div>
    )
}

export function EditEmployeeForm() {


    const [idLocaionView, setIdLocaionView] = React.useState('ID');
    const [locationView, setLocationView] = React.useState();


    React.useEffect(() => {
        setLocationView(locationID)
    }, [])

    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("id"));


    var workerID = "e52685c3-46f8-4937-bcfc-a5be225a6ca3";
    var username = "khoa98765";
    var nameWorker = "Le Minh Khoa";

    var specialities = "Designer";
    var email = "khoa.le@gmail.com";
    var phoneNumber = "0913456789";
    var address = "District 3";

    var salary = 1250;

    var locationID = "0faa608d-53a0-4092-8f0b-ab9101ed67e9";
    var locationAddress = "Ha Dong";

    var rate = 0;

    const handleChangeLocationView = (event) => {
        setIdLocaionView(event.target.value);

        setLocationView((event.target.value === "ID") ? locationID : locationAddress);

    };



    return (
        <div className={style.formEmployee}>
        <div className={style.headingForm}>Update Employee Information</div>
            <TextField
                label="Worker ID"
                value={workerID}
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
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            // onChange={handleChangeCustomerView}
            >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <TextField
                        label="Username"
                        value={username}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Name"
                        value={nameWorker}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <DateField
                            label="Date of birth"
                            value={dayjs('2001-04-17')}
                            margin='normal'
                        />
                    </LocalizationProvider>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Specialities"
                        value={specialities}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <TextField
                        label="Email"
                        value={email}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Phone number"
                        value={phoneNumber}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <TextField
                label="Address"
                value={address}
                fullWidth
                margin='normal'
            >
            </TextField>
            <TextField
                label="Location"
                value={locationView}
                fullWidth
                margin='normal'
            >
            </TextField>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={idLocaionView}
                onChange={handleChangeLocationView}
            >
                <FormControlLabel value="ID" control={<Radio />} label="ID" />
                <FormControlLabel value="Name" control={<Radio />} label="Name" />
            </RadioGroup>
            <div className={style.flexContainer}>
                <div className='col-2'>
                    <TextField
                        label="Salary"
                        value={salary}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
                <div className='col-2'>
                    <TextField
                        label="Rate"
                        value={rate}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                </div>
            </div>
            <Button variant="contained">Update</Button>
        </div>
    )
}
