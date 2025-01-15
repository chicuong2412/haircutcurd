import React from 'react'
import style from "../../../styles/FormStyle.module.scss"
import { TextField, Radio, RadioGroup, FormControlLabel, FormLabel, } from '@mui/material'
import ContentCutIcon from '@mui/icons-material/ContentCut';
import SmallServicePane from '../../services/serviceSmallPane';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";

export function AppointmentForm() {

    const [idCustomerView, setIdCustomerView] = React.useState('ID');
    const [customerView, setCustomerView] = React.useState();
    const [idWorkerView, setIdWorkerView] = React.useState('ID');
    const [workerView, setWorkerView] = React.useState();

    const [idLocaionView, setIdLocaionView] = React.useState('ID');
    const [locationView, setLocationView] = React.useState();

    const [idServicesView, setIdServicesView] = React.useState("Name");

    const [idComboView, setIdComboView] = React.useState("Name");

    React.useEffect(() => {
        setCustomerView(customerID);
        setWorkerView(workerID);
        setLocationView(locationID)
    }, [])

    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("id"));


    var appointmentID = "11621695-8025-46c4-b192-064549fadad9";
    var customerID = "ccafbc57-553e-4868-aa30-b4ff8bc1c91b";
    var customerName = "Lan Pham";

    var workerID = "1596822c-f517-4268-9684-a87923892457";
    var workerName = "Tran Thi Hoa";

    var locationID = "0faa608d-53a0-4092-8f0b-ab9101ed67e9";
    var locationAddress = "Ha Dong";

    var status = "WAITING";
    var price = 1000;

    var services = [
        {
            "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
            "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
            "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
            "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
            "duration": 50,
            "rate": 4.3,
            "price": 130.0,
            "productsList": [
                {
                    "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
                    "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
                    "stockQuantity": 95,
                    "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
                    "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
                    "price": 180.0,
                    "rate": 4.0
                }
            ]
        },
        {
            "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
            "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
            "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
            "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
            "duration": 75,
            "rate": 4.9,
            "price": 180.0,
            "productsList": [
                {
                    "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
                    "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
                    "stockQuantity": 95,
                    "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
                    "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
                    "price": 180.0,
                    "rate": 4.0
                },
                {
                    "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
                    "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
                    "stockQuantity": 150,
                    "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
                    "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
                    "price": 250.0,
                    "rate": 4.7
                }
            ]
        },

    ];

    var combos = [];

    const handleChangeCustomerView = (event) => {
        setIdCustomerView(event.target.value);

        setCustomerView((event.target.value === "ID") ? customerID : customerName);

    };

    const handleChangeWorkerView = (event) => {
        setIdWorkerView(event.target.value);

        setWorkerView((event.target.value === "ID") ? workerID : workerName);

    };

    const handleChangeLocationView = (event) => {
        setIdLocaionView(event.target.value);

        setLocationView((event.target.value === "ID") ? locationID : locationAddress);

    };

    const handleChangeServicesView = (event) => {
        setIdServicesView(event.target.value);
    };

    const handleChangeComboView = (event) => {
        setIdComboView(event.target.value);
    };

    const navigate = useNavigate();

    React.useEffect(()=> {
        $(".backArrow").on("click", function() {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);

    return (
        <>
            <FontAwesomeIcon databack="appointments" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <div className={style.formContainer}>
                <div className={style.left}>
                    <TextField
                        label="Appointment ID"
                        value={appointmentID}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                    <TextField
                        label="Customer"
                        value={customerView}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={idCustomerView}
                        onChange={handleChangeCustomerView}
                    >
                        <FormControlLabel value="ID" control={<Radio />} label="ID" />
                        <FormControlLabel value="Name" control={<Radio />} label="Name" />
                    </RadioGroup>
                    <TextField
                        label="Worker"
                        value={workerView}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={idWorkerView}
                        onChange={handleChangeWorkerView}
                    >
                        <FormControlLabel value="ID" control={<Radio />} label="ID" />
                        <FormControlLabel value="Name" control={<Radio />} label="Name" />
                    </RadioGroup>

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

                    <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={status}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="WAITING" control={<Radio />} label="WAITING" />
                        <FormControlLabel value="CANCELLED" control={<Radio />} label="CANCELLED" />
                        <FormControlLabel value="OVERDUE" control={<Radio />} label="OVERDUE" />
                        <FormControlLabel value="DONE" control={<Radio />} label="DONE" />
                    </RadioGroup>

                    <TextField
                        label="Price"
                        value={price}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>

                </div>

                <div className={style.right}>
                    <div className={style.scrollPane}>
                        <div className={style.listPane}>
                            <span className={style.formHeading}><ContentCutIcon /> SERVICES: </span>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={idServicesView}
                                onChange={handleChangeServicesView}
                            >
                                <FormControlLabel value="ID" control={<Radio />} label="ID" />
                                <FormControlLabel value="Name" control={<Radio />} label="Name" />
                            </RadioGroup>
                            {services.map((t, index) => {
                                return (<SmallServicePane key={t.id} heading={(idServicesView === "ID") ? t.id : t.name}></SmallServicePane>)
                            })}
                        </div>

                        <div className={style.listPane}>
                            <span className={style.formHeading}><ContentCutIcon /> Combos: </span>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={idComboView}
                                onChange={handleChangeComboView}
                            >
                                <FormControlLabel value="ID" control={<Radio />} label="ID" />
                                <FormControlLabel value="Name" control={<Radio />} label="Name" />
                            </RadioGroup>
                            {combos.map((t, index) => {
                                return (<SmallServicePane key={t.id} heading={(idComboView === "ID") ? t.id : t.name}></SmallServicePane>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function CreateFormAppointment() {
    const [idCustomerView, setIdCustomerView] = React.useState('ID');
    const [customerView, setCustomerView] = React.useState();
    const [idWorkerView, setIdWorkerView] = React.useState('ID');
    const [workerView, setWorkerView] = React.useState();

    const [idLocaionView, setIdLocaionView] = React.useState('ID');
    const [locationView, setLocationView] = React.useState();

    const [idServicesView, setIdServicesView] = React.useState("Name");

    const [idComboView, setIdComboView] = React.useState("Name");

    React.useEffect(() => {
        setCustomerView(customerID);
        setWorkerView(workerID);
        setLocationView(locationID)
    }, [])

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("id"));


    var appointmentID = "11621695-8025-46c4-b192-064549fadad9";
    var customerID = "ccafbc57-553e-4868-aa30-b4ff8bc1c91b";
    var customerName = "Lan Pham";

    var workerID = "1596822c-f517-4268-9684-a87923892457";
    var workerName = "Tran Thi Hoa";

    var locationID = "0faa608d-53a0-4092-8f0b-ab9101ed67e9";
    var locationAddress = "Ha Dong";

    var status = "WAITING";
    var price = 1000;

    var services = [
        {
            "id": "2e58a250-10c1-421a-af76-32d512b5aef6",
            "name": "Combo Dưỡng Ẩm Tóc Và Da Đầu",
            "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
            "description": "Dưỡng ẩm sâu cho tóc và da đầu, mang lại cảm giác dễ chịu và tóc bóng mượt.",
            "duration": 50,
            "rate": 4.3,
            "price": 130.0,
            "productsList": [
                {
                    "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
                    "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
                    "stockQuantity": 95,
                    "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
                    "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
                    "price": 180.0,
                    "rate": 4.0
                }
            ]
        },
        {
            "id": "0d25cb36-d960-4e8d-90c7-1e1dcf18fea0",
            "name": "Combo Chăm Sóc Da Mặt Chuyên Sâu",
            "imgSrc": "https://storage.30shine.com/service/combo_booking/1053.png",
            "description": "Làm sạch, dưỡng ẩm và trẻ hóa làn da với công thức đặc biệt từ chuyên gia.",
            "duration": 75,
            "rate": 4.9,
            "price": 180.0,
            "productsList": [
                {
                    "id": "27eb059b-09b9-4a01-bd35-03e957d17e1a",
                    "name": "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml",
                    "stockQuantity": 95,
                    "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg",
                    "description": "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.",
                    "price": 180.0,
                    "rate": 4.0
                },
                {
                    "id": "8aed2c93-f884-40e7-a4f3-c3bfca897538",
                    "name": "Kem Chống Nắng Skin&Dr Sunblock SPF50+ 50ml",
                    "stockQuantity": 150,
                    "imgSrc": "https://static.30shine.com/shop-admin/2023/11/27/30SCNSPF-vn-11134412-7t89p-fwo2mt34kl9yz.jpg",
                    "description": "Kem chống nắng bảo vệ da toàn diện khỏi tia UV, giúp ngăn ngừa sạm da, tàn nhang và lão hóa da.",
                    "price": 250.0,
                    "rate": 4.7
                }
            ]
        },

    ];

    var combos = [];

    const handleChangeCustomerView = (event) => {
        setIdCustomerView(event.target.value);

        setCustomerView((event.target.value === "ID") ? customerID : customerName);

    };

    const handleChangeWorkerView = (event) => {
        setIdWorkerView(event.target.value);

        setWorkerView((event.target.value === "ID") ? workerID : workerName);

    };

    const handleChangeLocationView = (event) => {
        setIdLocaionView(event.target.value);

        setLocationView((event.target.value === "ID") ? locationID : locationAddress);

    };

    const handleChangeServicesView = (event) => {
        setIdServicesView(event.target.value);
    };

    const handleChangeComboView = (event) => {
        setIdComboView(event.target.value);
    };

    React.useEffect(()=> {
        $(".backArrow").on("click", function() {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);

    return (
        <>
            <FontAwesomeIcon databack="appointments" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <div className={style.formContainer}>
                <div className={style.left}>
                    <TextField
                        label="Customer"

                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={idCustomerView}
                        onChange={handleChangeCustomerView}
                    >
                        <FormControlLabel value="ID" control={<Radio />} label="ID" />
                        <FormControlLabel value="Name" control={<Radio />} label="Name" />
                    </RadioGroup>
                    <TextField
                        label="Worker"
                        value={workerView}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={idWorkerView}
                        onChange={handleChangeWorkerView}
                    >
                        <FormControlLabel value="ID" control={<Radio />} label="ID" />
                        <FormControlLabel value="Name" control={<Radio />} label="Name" />
                    </RadioGroup>

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

                    <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={status}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="WAITING" control={<Radio />} label="WAITING" />
                        <FormControlLabel value="CANCELLED" control={<Radio />} label="CANCELLED" />
                        <FormControlLabel value="OVERDUE" control={<Radio />} label="OVERDUE" />
                        <FormControlLabel value="DONE" control={<Radio />} label="DONE" />
                    </RadioGroup>

                    <TextField
                        label="Price"
                        value={price}
                        fullWidth
                        margin='normal'
                    >
                    </TextField>

                </div>

                <div className={style.right}>
                    <div className={style.scrollPane}>
                        <div className={style.listPane}>
                            <span className={style.formHeading}><ContentCutIcon /> SERVICES: </span>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={idServicesView}
                                onChange={handleChangeServicesView}
                            >
                                <FormControlLabel value="ID" control={<Radio />} label="ID" />
                                <FormControlLabel value="Name" control={<Radio />} label="Name" />
                            </RadioGroup>
                            {services.map((t, index) => {
                                return (<SmallServicePane key={t.id} heading={(idServicesView === "ID") ? t.id : t.name}></SmallServicePane>)
                            })}
                        </div>

                        <div className={style.listPane}>
                            <span className={style.formHeading}><ContentCutIcon /> Combos: </span>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={idComboView}
                                onChange={handleChangeComboView}
                            >
                                <FormControlLabel value="ID" control={<Radio />} label="ID" />
                                <FormControlLabel value="Name" control={<Radio />} label="Name" />
                            </RadioGroup>
                            {combos.map((t, index) => {
                                return (<SmallServicePane key={t.id} heading={(idComboView === "ID") ? t.id : t.name}></SmallServicePane>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}