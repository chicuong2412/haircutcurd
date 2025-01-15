import React from 'react'
import style from "../../../styles/FormStyle.module.scss"
import { TextField, } from '@mui/material'
import "dayjs/locale/en-gb"
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useInfo } from '../../../layouts/layout';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";

export function ProductForm() {

    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("id"));


    var productID = "e52685c3-46f8-4937-bcfc-a5be225a6ca3";
    var nameProduct = "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml";
    var imgSrc = "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg";

    var description = "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.";

    var Quantity = 1250;

    var price = 40;

    var rate = 0;

    const navigate = useNavigate();

    React.useEffect(()=> {
        $(".backArrow").on("click", function() {
            navigate("/" + $(this).attr("databack"));
        })
    }, []);

    return (
        <>
            <FontAwesomeIcon databack="products" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <div className={style.formEmployee}>
                <div className={style.headingForm}>View product</div>
                <TextField
                    label="Product ID"
                    value={productID}
                    fullWidth
                    margin='normal'
                >
                </TextField>
                <TextField
                    label="Name"
                    value={nameProduct}
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
            </div>
        </>
    )
}

export function ProductCreateForm() {


    var productID = "e52685c3-46f8-4937-bcfc-a5be225a6ca3";
    var nameProduct = "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml";
    var imgSrc = "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg";

    var description = "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.";

    var Quantity = 1250;

    var price = 40;

    var rate = 0;


    const navigate = useNavigate();

    const { toast } = useInfo();


    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        navigate("/products")
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
            <FontAwesomeIcon databack="products" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog></ConfirmDialog>
            <div className={style.formEmployee}>
                <div className={style.headingForm}>Create product</div>
                <TextField
                    label="Name"
                    fullWidth
                    multiline
                    maxRows={2}
                    margin='normal'
                >
                </TextField>
                <TextField
                    label="Description"
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
                <Button onClick={confirm1} variant='contained'>Create</Button>
            </div>
        </>
    )
}

export function EditingProductForm() {

    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("id"));


    var productID = "e52685c3-46f8-4937-bcfc-a5be225a6ca3";
    var nameProduct = "Sữa Dưỡng Thể Hương Hoa Hồng Skin&Dr Rose Body Milk 200ml";
    var imgSrc = "https://static.30shine.com/shop-admin/2023/11/27/30SDBTFL-vn-11134305-4q92y-lkt1oz98fwmcv.jpg";

    var description = "Công thức nhẹ dịu với chiết xuất hoa hồng, cung cấp độ ẩm và nuôi dưỡng làn da mềm mại suốt cả ngày.";

    var Quantity = 1250;

    var price = 40;

    var rate = 0;

    const navigate = useNavigate();

    const { toast } = useInfo();


    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        navigate("/products");
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
            <FontAwesomeIcon databack="products" className='backArrow' icon={faLeftLong}></FontAwesomeIcon>
            <ConfirmDialog></ConfirmDialog>
            <div className={style.formEmployee}>
                <div className={style.headingForm}>Update product</div>
                <TextField
                    label="Product ID"
                    value={productID}
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
                    value={nameProduct}
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
        </>
    )
}
