import { Publish } from '@mui/icons-material';
import React from 'react';
import "./productForm.css"

const ProductForm = ({product, newProduct}) => {
  return (
    <div>
        <form className={newProduct? "newProductForm" : "productForm"}>
            <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" placeholder={product && product.title} />
                <label>Product Description</label>
                <textarea type="textarea" placeholder={product && product.desc} />
                <label>Price</label>
                <input type="number" placeholder={product && product.price} />
                <label>In Stock</label>
                <select name="inStock" id="active">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="productFormRight">
                <div className="productUpload">
                    {product && <img src={product.img} alt="" className='productUploadImg'/> }
                    <label htmlFor="file">
                        <Publish className='productFormIcon' />
                    </label>
                    <input type="file" id="file" style={product && {display: "none" }}/>
                </div>
                <button className={ newProduct ? "newProductButton" : "productButton"}>{newProduct ? "Create" : "Update"}</button>
            </div>
        </form>
    </div>
  )
}

export default ProductForm