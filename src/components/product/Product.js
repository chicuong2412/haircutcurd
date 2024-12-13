import React from 'react'
import ProductTable from './ProductTable'
import { Route, Routes } from 'react-router-dom'
import { ProductForm, ProductCreateForm, EditingProductForm } from './ProductForm'

export default function Product() {
    return (
        <Routes>
            <Route path='/' element={<ProductTable></ProductTable>}></Route>
            <Route path='/view/*' element={<ProductForm></ProductForm>}></Route>
            <Route path='/create/*' element={<ProductCreateForm></ProductCreateForm>}></Route>
            <Route path='/edit/*' element={<EditingProductForm></EditingProductForm>}></Route>
        </Routes>
    )
}
