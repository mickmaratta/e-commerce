import React from 'react';
import ProductForm from '../../components/productForm/ProductForm';
import "./newProduct.css"

const NewProduct = () => {
  return (
    <div className='newProduct'>
        <h1 className="newProductTitle">New Product</h1>
        <ProductForm newProduct={true}/>
    </div>
  )
}

export default NewProduct