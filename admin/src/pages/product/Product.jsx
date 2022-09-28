import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import Chart from "../../components/chart/Chart";
import { productData } from '../../dummyData';
import ProductForm from '../../components/productForm/ProductForm';

const Product = () => {
  return (
    <div className='product'>
        <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/products/newProduct">
                <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            <div className="productTopLeft">
                <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1551489688005" alt="" className="productInfoImg" />
                    <span className="productName">Apple Airpods</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">123</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Sales:</span>
                        <span className="productInfoValue">4123</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Active:</span>
                        <span className="productInfoValue">Yes</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Stock:</span>
                        <span className="productInfoValue">0</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <ProductForm img="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1551489688005"/>
        </div>
    </div>
  )
}

export default Product