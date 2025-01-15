import React, { useEffect, useState, useRef } from 'react'
import style from "../../../styles/FormStyle.module.scss"
import { TextField, } from '@mui/material'
import "dayjs/locale/en-gb"
import { useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import SmallServicePane from '../serviceSmallPane';
import SearchBar from '../../searchBar';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../../../layouts/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";

export function ServiceForm() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [idProductView, setIdProductView] = useState("ID");

    const handleChangeProductView = (event) => {
        setIdProductView(event.target.value);
    }


    var ServiceID = "e52685c3-46f8-4937-bcfc-a5be225a6ca3";
    var nameService = "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml";
    var imgSrc = "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg";

    var description = "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.";

    var Quantity = 1250;

    var price = 40;

    var rate = 0;

    var products = [
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
    ];

    const navigate = useNavigate();

    React.useEffect(()=> {
        $(".backArrow").on("click", function() {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);




    return (
        <>
            <FontAwesomeIcon databack="services" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <div className={style.formContainer}>

                <div className={style.left}>
                    <div className={style.headingForm}>View Service</div>
                    <TextField
                        label="Service ID"
                        value={ServiceID}
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
                        value={nameService}
                        fullWidth
                        multiline
                        slotProps={
                            {
                                input: {
                                    readOnly: true,
                                },
                            }
                        }
                        maxRows={2}
                        margin='normal'
                    >
                    </TextField>
                    <TextField
                        label="Description"
                        value={description}
                        fullWidth
                        multiline
                        slotProps={
                            {
                                input: {
                                    readOnly: true,
                                },
                            }
                        }
                        maxRows={5}
                        margin='normal'
                    >
                    </TextField>
                    <div className={style.flexContainer}>
                        <div className='col-2'>
                            <TextField
                                label="Img Src"
                                value={imgSrc}
                                fullWidth
                                slotProps={
                                    {
                                        input: {
                                            readOnly: true,
                                        },
                                    }
                                }
                                multiline
                                maxRows={2}
                                margin='normal'
                            >
                            </TextField>
                        </div>
                        <div className='col-2'>
                            <TextField
                                label="Price"
                                value={price}
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
                        </div>
                    </div>
                    <div className={style.flexContainer}>
                        <div className='col-2'>
                            <TextField
                                label="Quantity"
                                value={Quantity}
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
                        </div>
                        <div className='col-2'>
                            <TextField
                                label="Rate"
                                value={rate}
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
                        </div>
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.scrollPane}>
                        <div className={style.listPane}>
                            <span className={style.formHeading}>PRODUCTS: </span>
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
                            {products.map((t, index) => {
                                return (<SmallServicePane id={t.id} key={t.id} heading={(idProductView === "ID") ? t.id : t.name}></SmallServicePane>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export function ServiceCreateForm() {
    const [idProductView, setIdProductView] = useState("ID");

    const [listProductAll, setListProductAll] = useState(() => {
        return [
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
        ];
    });

    const navigate = useNavigate();

    const { toast } = useInfo();



    var [products, setProducts] = useState([]);

    const AddItem = function (id) {
        for (let element of listProductAll) {
            if (element.id.localeCompare(id) == 0) {
                setProducts(prevState => [...prevState, element]);
            }
        }
    }

    const handleChangeProductView = (event) => {
        setIdProductView(event.target.value);
    }

    var ServiceID = "e52685c3-46f8-4937-bcfc-a5be225a6ca3";
    var nameService = "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml";
    var imgSrc = "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg";

    var description = "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.";

    var Quantity = 1250;

    var price = 40;

    var rate = 0;

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        navigate("/services")
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

    React.useEffect(()=> {
        $(".backArrow").on("click", function() {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);

    return (
        <>
            <FontAwesomeIcon databack="services" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog />
            <div className={style.formContainer}>
                <div className={style.left}>
                    <div className={style.headingForm}>Create Service</div>
                    <TextField
                        label="Name"
                        // value={nameService}
                        fullWidth
                        multiline
                        maxRows={2}
                        required
                        margin='normal'
                    >
                    </TextField>
                    <TextField
                        label="Description"
                        // value={description}
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
                                margin='normal'
                            >
                            </TextField>
                        </div>
                        <div className='col-2'>
                            <TextField
                                label="Price"
                                required
                                fullWidth
                                margin='normal'
                            >
                            </TextField>
                        </div>
                    </div>
                    <div className={style.flexContainer}>
                        <div className='col-2'>
                            <TextField
                                label="Quantity"
                                required
                                fullWidth
                                margin='normal'
                            >
                            </TextField>
                        </div>
                        <div className='col-2'>
                            <TextField
                                label="Rate"
                                // value={rate}
                                fullWidth
                                margin='normal'
                            >
                            </TextField>
                        </div>
                    </div>
                    <Button onClick={confirm1} variant='contained'>Create</Button>
                </div>
                <div className={style.right}>
                    <div className={style.scrollPane}>
                        <div className={style.listPane}>
                            <span className={style.formHeading}>PRODUCTS: </span>
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
                            {products.map((t, index) => {
                                return (<SmallServicePane id={t.id} key={t.id} heading={(idProductView === "ID") ? t.id : t.name}></SmallServicePane>)
                            })}
                        </div>
                        <SearchBar
                            productList={listProductAll}
                            addfunction={AddItem}
                        ></SearchBar>
                    </div>
                </div>
            </div>
        </>
    )
}


export function EditingServiceForm() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [idProductView, setIdProductView] = useState("ID");
    const [listProductAll, setListProductAll] = useState(() => {
        return [
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
        ];
    });
    const [products, setProducts] = useState([]);

    const handleChangeProductView = (event) => {
        setIdProductView(event.target.value);
    }

    const AddItem = function (id) {
        for (let element of listProductAll) {
            if (element.id.localeCompare(id) == 0) {
                setProducts(prevState => [...prevState, element]);
            }
        }
    }

    var ServiceID = "e52685c3-46f8-4937-bcfc-a5be225a6ca3";
    var nameService = "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml";
    var imgSrc = "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg";

    var description = "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.";

    var Quantity = 1250;

    var price = 40;

    var rate = 0;

    const { toast } = useInfo();
    const navigate = useNavigate();

    React.useEffect(()=> {
        $(".backArrow").on("click", function() {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        navigate("/services")
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm1 = () => {
        confirmDialog({
            message: 'Are you sure you want to update?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    return (
        <>
            <FontAwesomeIcon databack="services" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog />
            <div className={style.formContainer}>
                <div className={style.left}>
                    <div className={style.headingForm}>Update Service</div>
                    <TextField
                        label="Service ID"
                        value={ServiceID}
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
                        value={nameService}
                        fullWidth
                        multiline
                        maxRows={2}
                        margin='normal'
                    >
                    </TextField>
                    <TextField
                        label="Description"
                        value={description}
                        fullWidth
                        multiline
                        maxRows={5}
                        margin='normal'
                    >
                    </TextField>
                    <div className={style.flexContainer}>
                        <div className='col-2'>
                            <TextField
                                label="Img Src"
                                value={imgSrc}
                                fullWidth
                                multiline
                                maxRows={2}
                                margin='normal'
                            >
                            </TextField>
                        </div>
                        <div className='col-2'>
                            <TextField
                                label="Price"
                                value={price}
                                fullWidth
                                margin='normal'
                            >
                            </TextField>
                        </div>
                    </div>
                    <div className={style.flexContainer}>
                        <div className='col-2'>
                            <TextField
                                label="Quantity"
                                value={Quantity}
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
                    <Button onClick={confirm1} variant='contained'>Update</Button>
                </div>
                <div className={style.right}>
                    <div className={style.scrollPane}>
                        <div className={style.listPane}>
                            <span className={style.formHeading}>PRODUCTS: </span>
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
                            {products.map((t, index) => {
                                return (<SmallServicePane id={t.id} key={t.id} heading={(idProductView === "ID") ? t.id : t.name}></SmallServicePane>)
                            })}
                        </div>
                        <SearchBar productList={listProductAll} addfunction={AddItem}></SearchBar>
                    </div>
                </div>
            </div>
        </>
    )
}

