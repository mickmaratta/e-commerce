import { CalendarToday, MailOutline, PermIdentity, Shield } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { updateClient } from '../../redux/apiCalls';
import "./user.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

const User = () => {
  const location = useLocation()
  const clientId = location.pathname.split("/")[2];
  const client = useSelector((state) => 
    state.client.clients.find(client => client._id === clientId)
  );
  const [inputs, setInputs] = useState({
    name: client.name, 
    username: client.username, 
    email: client.email, 
    isAdmin: client.isAdmin});
  const [imgFile, setImgFile] = useState((client.img || null));
  const [isUpdated, setIsUpdated] = useState(false);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs(prev=> {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    setIsUpdated(true);
    if(!imgFile || (typeof imgFile === "string")) {
      const updatedClient = {
        ...inputs, 
        _id: clientId, 
        img:imgFile, 
      };
      updateClient(updatedClient, dispatch);
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
          const updatedProduct = {...inputs, _id: clientId, img:downloadURL};
          updateClient(updatedProduct, dispatch)
        });
      }
    )};
    }

  return (
    <div className='user'>
        <div className="userTitleContainer">
            <h1 className='userTitle'>Edit User</h1>
            <Link to="/newUser">
                <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src={client.img || "https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG"} alt="" className="userShowImg" />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">{client.name}</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className='userShowIcon'/>
                        <span className="userShowInfoTitle">@{client.username}</span>
                    </div>
                    <div className="userShowInfo">
                        <CalendarToday className='userShowIcon'/>
                        <span className="userShowInfoTitle">Created: {client.createdAt.split("T")[0]}</span>
                    </div>
                    <div className="userShowInfo">
                        <Shield className='userShowIcon'/>
                        <span className="userShowInfoTitle">Admin: {client.isAdmin ? "Yes" : "No"}</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>                  
                    <div className="userShowInfo">
                        <MailOutline className='userShowIcon'/>
                        <span className="userShowInfoTitle">{client.email}</span>
                    </div>                    
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input 
                                type="text" 
                                placeholder={client.username}
                                className='userUpdateInput'
                                name="username"
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                placeholder={client.name}
                                className='userUpdateInput' 
                                name="name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input 
                                type="email" 
                                placeholder={client.email}
                                className='userUpdateInput' 
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Admin</label>
                            <select name="isAdmin" id="active" onChange={handleChange}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>

                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src={client.img || "https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG"} alt="" className="userUpdateImg"  />
                            <input type="file" id="file" onChange={e=>setImgFile(e.target.files[0])}/>
                        </div>
                        <div className='userUpdateButtonContainer'>
                          {isUpdated && <span className='success'>User updated</span>}
                          <button className="userUpdateButton" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default User