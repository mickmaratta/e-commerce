import { Publish } from '@mui/icons-material';
import React from 'react';
import "./productForm.css"

const ProductForm = ({img, newProduct}) => {
  return (
    <div>
        <form className={newProduct? "newProductForm" : "productForm"}>
            <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" placeholder='Apple Airpods' />
                <label>Stock</label>
                <input type="number" placeholder='100' />
                <label>Active</label>
                <select name="active" id="active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div className="productFormRight">
                <div className="productUpload">
                    {img && <img src={img} alt="" className='productUploadImg'/> }
                    <label for="file">
                        <Publish className='productFormIcon' />
                    </label>
                    <input type="file" id="file" style={img && {display: "none" }}/>
                </div>
                <button className={newProduct ? "newProductButton" : "productButton"}>{newProduct ? "Create" : "Update"}</button>
            </div>
        </form>
    </div>
  )
}

export default ProductForm