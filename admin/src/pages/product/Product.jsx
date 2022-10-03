import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const [productStats, setProductStats] = useState([]);
  const [inputs, setInputs] = useState({
    title: product.title,
    desc: product.desc,
    price: product.price,
    inStock: product.inStock,
  });
  const [imgFile, setImgFile] = useState(product.img);
  const [cat, setCat] = useState(product.categories);
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const [isUpdated, setIsUpdated] = useState(false);
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
    if (cat.includes(e.target.name)) {
      setCat(cat.filter((x) => x !== e.target.name));
    } else {
      setCat((prev) => {
        return [...prev, e.target.name];
      });
    }
  };

  const handleSize = (e) => {
    if (size.includes(e.target.name)) {
      setSize(cat.filter((x) => x !== e.target.name));
    } else {
      setSize((prev) => {
        return [...prev, e.target.name];
      });
    }
  };

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
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        setProductStats(list.map(item => {
          return { name: MONTHS[item._id - 1], "Sales": item.total}
        }))
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleClick = (e) => {
    e.preventDefault();
    setIsUpdated(true);
    if (typeof imgFile === "string") {
      const updatedProduct = {
        ...inputs,
        _id: productId,
        img: imgFile,
        categories: cat,
        color: color,
        size: size,
      };
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
            const updatedProduct = {
              ...inputs,
              _id: productId,
              img: downloadURL,
              categories: cat,
              color: color,
              size: size,
            };
            updateProduct(updatedProduct, dispatch);
          });
        }
      );
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/products/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={productStats}
            dataKey="Sales"
            title="Sales Performance"
          />
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
            <input
              type="text"
              placeholder={product.title}
              name="title"
              onChange={handleChange}
            />
            <label>Product Description</label>
            <textarea
              type="textarea"
              placeholder={product.desc}
              name="desc"
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="number"
              placeholder={product.price}
              name="price"
              onChange={handleChange}
            />
            <label>Color</label>
            <input
              type="text"
              placeholder={product.color}
              onChange={handleColor}
            />
            <label>Categories*</label>
            <div className="addProductFormCategory">
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="featured"
                  name="featured"
                  onClick={handleCat}
                />
                <label for="featured">Featured</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="women"
                  name="women"
                  onClick={handleCat}
                />
                <label for="women">Women</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="men"
                  name="men"
                  onClick={handleCat}
                />
                <label for="men">Men</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="shirts"
                  name="shirts"
                  onClick={handleCat}
                />
                <label for="shirts">Shirts</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="pants"
                  name="pants"
                  onClick={handleCat}
                />
                <label for="pants">Pants</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="jackets"
                  name="jackets"
                  onClick={handleCat}
                />
                <label for="jackets">Jackets</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="accessories"
                  name="accessories"
                  onClick={handleCat}
                />
                <label for="accessories">Accessories</label>
              </div>
            </div>

            <label>Size*</label>
            <div className="addProductFormCategory">
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="xs"
                  name="xs"
                  onClick={handleSize}
                />
                <label for="xs">XS</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="s"
                  name="s"
                  onClick={handleSize}
                />
                <label for="s">S</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="m"
                  name="m"
                  onClick={handleSize}
                />
                <label for="m">M</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="l"
                  name="l"
                  onClick={handleSize}
                />
                <label for="l">L</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="XL"
                  name="xl"
                  onClick={handleSize}
                />
                <label for="XL">XL</label>
              </div>
              <div>
                <input
                  className="addProductRadioInput"
                  type="checkbox"
                  id="oneSize"
                  name="oneSize"
                  onClick={handleSize}
                />
                <label for="oneSize">One Size</label>
              </div>
            </div>
            <label>In Stock</label>
            <select name="inStock" id="active" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <input
                type="file"
                id="file"
                onChange={(e) => setImgFile(e.target.files[0])}
              />
            </div>
            <div className="productUpdateButtonContainer">
              {isUpdated && <span className="success">Product updated</span>}
              <button className="productUpdateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
