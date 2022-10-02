import { Publish } from "@mui/icons-material";
import React, { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const { error } = useSelector((state) => state.product);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleCat = (e) => {
    if(cat.includes(e.target.name)) {
      setCat(cat.filter(x=>x!==e.target.name))
    } else {
    setCat((prev) => {
      return [...prev, e.target.name]
    })}
  }

  const handleSize = (e) => {
    if(size.includes(e.target.name)) {
      setSize(cat.filter(x=>x!==e.target.name))
    } else {
    setSize((prev) => {
      return [...prev, e.target.name]
    })}
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
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
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
          const product = {
            ...inputs,
            img: downloadURL,
            categories: cat,
            color: color,
            size: size,
          };
          addProduct(product, dispatch);
          setSuccess(true);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="newProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductFormLeft">
          <label>Product Title*</label>
          <input
            required
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <label>Product Description*</label>
          <input
            required
            type="text"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
          />
          <label>Price*</label>
          <input
            required
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleChange}
          />
          <label>Color*</label>
          <input
            required
            type="text"
            placeholder="black, blue"
            onChange={handleColor}
          />
          <label>Categories*</label>
          <div className="addProductFormCategory">
            <div>
              <input className="addProductRadioInput" type="checkbox" id="featured" name="featured" onClick={handleCat}/>
              <label for="featured">Featured</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="women" name="women" onClick={handleCat}/>
              <label for="women">Women</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="men" name="men" onClick={handleCat}/>
              <label for="men">Men</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="shirts" name="shirts" onClick={handleCat}/>
              <label for="shirts">Shirts</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="pants" name="pants" onClick={handleCat}/>
              <label for="pants">Pants</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="jackets" name="jackets" onClick={handleCat}/>
              <label for="jackets">Jackets</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="accessories" name="accessories" onClick={handleCat}/>
              <label for="accessories">Accesories</label>
            </div>
          </div>

          <label>Size*</label>
          <div className="addProductFormCategory">
            <div>
              <input className="addProductRadioInput" type="checkbox" id="xs" name="xs"  onClick={handleSize}/>
              <label for="xs">XS</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="s" name="s" onClick={handleSize}/>
              <label for="s">S</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="m" name="m" onClick={handleSize}/>
              <label for="m">M</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="l" name="l" onClick={handleSize}/>
              <label for="l">L</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="XL" name="xl"  onClick={handleSize}/>
              <label for="XL">XL</label>
            </div>
            <div>
              <input className="addProductRadioInput" type="checkbox" id="oneSize" name="oneSize"  onClick={handleSize}/>
              <label for="oneSize">One Size</label>
            </div>
          </div>
          <label>In Stock*</label>
          <select required name="inStock" id="active" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductFormRight">
          <div className="addProductUpload">
            <label htmlFor="file">
              <Publish className="addProductFormIcon" />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setImgFile(e.target.files[0])}
            />
          </div>
          {error && (
            <span className="error">Please fill in all fields marked *</span>
          )}
          {success && !error && (
            <span className="success">New product created</span>
          )}
          <button className="addProductButton" onClick={handleClick}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
