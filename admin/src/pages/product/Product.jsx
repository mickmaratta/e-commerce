import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './product.css';
import Chart from "../../components/chart/Chart";
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from "../../requestMethods";
import { Publish } from '@mui/icons-material';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import { updateProduct } from '../../redux/apiCalls';

const Product = () => {
  const location = useLocation()
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) => 
    state.product.products.find(product => product._id === productId)
  );

  const [productStats, setProductStats] = useState([]);
  const [inputs, setInputs] = useState({title: product.title, desc: product.desc, price: product.price, inStock: product.inStock});
  const [imgFile, setImgFile] = useState(product.img);
  const [cat, setCat] = useState(product.categories);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs(prev=> {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleCat = (e) => {
    setCat(e.target.value.split(","))
  }

  

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

  const handleClick = (e) => {
    e.preventDefault();
    if(typeof imgFile === "string") {
      const updatedProduct = {...inputs, _id: productId, img:imgFile, categories: cat};
      console.log(updatedProduct);
      updateProduct(updatedProduct, dispatch);
    } else {
    const fileName = new Date().getTime() + imgFile;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
            default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const updatedProduct = {...inputs, _id: productId, img:downloadURL, categories: cat};
          updateProduct(updatedProduct, dispatch)
        });
      }
    )};
    }

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
        <form className="productForm">
            <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" placeholder={product.title} name="title" onChange={handleChange}/>
                <label>Product Description</label>
                <textarea type="textarea" placeholder={product.desc} name="desc" onChange={handleChange}/>
                <label>Price</label>
                <input type="number" placeholder={product.price} name="price" onChange={handleChange}/>
                <label>Categories</label>
                <input type="text" placeholder={product.categories} onChange={handleCat}/>
                <label>In Stock</label>
                <select name="inStock" id="active" onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="productFormRight">
                <div className="productUpload">
                    <img src={product.img} alt="" className='productUploadImg' onChange={e=>setImgFile(e.target.files[0])}/> 
                    <label htmlFor="file">
                        <Publish className='productFormIcon' />
                    </label>
                    <input type="file" id="file" style={{display: "none" }}/>
                </div>
                <button className="productButton" onClick={handleClick}>Update</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Product