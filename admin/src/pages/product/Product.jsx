import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './product.css';
import Chart from "../../components/chart/Chart";
import { productData } from '../../dummyData';
import ProductForm from '../../components/productForm/ProductForm';
import { useSelector } from 'react-redux';
import { userRequest } from "../../requestMethods";

const Product = () => {
  const location = useLocation()
  const productId = location.pathname.split("/")[2];
  const [productStats, setProductStats] = useState([]);

  const product = useSelector((state) => 
    state.product.products.find(product => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  console.log(productStats)

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
                <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={product.img} alt="" className="productInfoImg" />
                    <span className="productName">{product.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{product._id}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Sales:</span>
                        <span className="productInfoValue">4123</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Stock:</span>
                        <span className="productInfoValue">{product.inStock}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <ProductForm product={product} />
        </div>
    </div>
  )
}

export default Product