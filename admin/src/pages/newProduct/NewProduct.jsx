import { Publish } from '@mui/icons-material';
import React, { useState } from 'react';
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs(prev=> {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleCat = (e) => {
    setCat(e.target.value.split(","))
  }

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + imgFile.name;
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
          const product = {...inputs, img:downloadURL, categories: cat};
          addProduct(product, dispatch)
        });
      }
    );
    }

  return (
    <div className='newProduct'>
        <h1 className="newProductTitle">New Product</h1>
        <form className="addProductForm">
            <div className="addProductFormLeft">
                <label>Product Title</label>
                <input type="text" placeholder="Title" name="title" onChange={handleChange}/>
                <label>Product Description</label>
                <input type="text" placeholder="Description" name="desc" onChange={handleChange}/>
                <label>Price</label>
                <input type="number" placeholder="Price" name="price" onChange={handleChange}/>
                <label>Categories</label>
                <input type="text" placeholder="jeans, skirts" onChange={handleCat}/>
                <label>In Stock</label>
                <select name="inStock" id="active" onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="addProductFormRight">
                <div className="addProductUpload">
                    <label htmlFor="file">
                        <Publish className='addProductFormIcon' />
                    </label>
                    <input type="file" id="file" onChange={e=>setImgFile(e.target.files[0])}/>
                </div>
                <button className="addProductButton" onClick={handleClick}>Create</button>
            </div>
        </form>
    </div>
  )
}

export default NewProduct