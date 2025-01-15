import React from 'react'
import Table from '../Table'
import { Route, Routes } from 'react-router-dom'
import { ProductForm, ProductCreateForm, EditingProductForm } from './ProductForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import style from "../../styles/FormStyle.module.scss"
import { Checkbox } from '@mui/material';

export default function Product() {

    return (
        <Routes>
            <Route path='/' element={<Table
                colDefsIn={[
                    { headerName: "ID", field: "id", resizable: true },
                    { field: "name", resizable: true },
                    { field: "imgSrc", resizable: true },
                    { headerName: "Quantity", field: "stockQuantity" },
                    { field: "description", resizable: true },
                    { field: "price" },
                    { field: "rate" },
                    { headerName: "Deleted", field: "deleted", cellRendererFramework: (params) => 
                            <Checkbox disabled checked={params.data.deleted}></Checkbox>
                    },
                    {
                        headerName: "Function",field: "id", cellRendererFramework: (params) => {
                            return (
                                <div className={style.buttonFunctions}>
                                    <FontAwesomeIcon icon={faPenToSquare} dataid={params.value} className='edit' />
                                    <FontAwesomeIcon icon={faEye} dataid={params.value} className='view' />
                                    <FontAwesomeIcon icon={faX} dataid={params.value} className='delete' />
                                </div>
                            )
                        }
                    }
                ]}
                link={"http://localhost:3120/identity/products/getProducts"}
                nameLink = {"products"}
                chartField = {["id", "stockQuantity", "price", "rate"]}
            ></Table>}></Route>
            <Route path='/view/*' element={<ProductForm></ProductForm>}></Route>
            <Route path='/create/*' element={<ProductCreateForm></ProductCreateForm>}></Route>
            <Route path='/edit/*' element={<EditingProductForm></EditingProductForm>}></Route>
        </Routes>
    )
}
