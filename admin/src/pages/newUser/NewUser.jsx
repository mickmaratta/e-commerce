import { Publish } from '@mui/icons-material';
import React, { useState } from 'react';
import "./newUser.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addClient } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import app from '../../firebase';

const NewUser = () => {
  const [imgFile, setImgFile] = useState(null);
  const [inputs, setInputs] = useState();
  const {error} = useSelector((state)=> state.client)
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
        return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(!imgFile) {
      const client = {
        ...inputs, 
      };
      addClient(client, dispatch);
      setSuccess(true);
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
          const client = {...inputs, img:downloadURL};
          addClient(client, dispatch);
          setSuccess(true);
        });
      }
    )};
    }

  return (
    <div className='newUser'>
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm">
            <div className="newUserItem">
                <label>Username*</label>
                <input required type="text" placeholder='john123' name="username" onChange={handleChange}/>
            </div>
            <div className="newUserItem">
                <label>Full Name*</label>
                <input required type="text" placeholder='John Smith' name="name" onChange={handleChange}/>
            </div>
            <div className="newUserItem">
                <label>Email*</label>
                <input required type="email" placeholder='johnsmith@gmail.com' name="email" onChange={handleChange} />
            </div>
            <div className="newUserItem">
                <label>Password*</label>
                <input required type="password" placeholder='password' name="password" onChange={handleChange}/>
            </div>
            <div className="newUserItem">
                <label>Admin</label>
                <select name="isAdmin" id="active" className='newUserSelect' onChange={handleChange}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
            </div>
            <div className="newUserUpload">
                <label htmlFor="file">
                    <Publish className='newUserFormIcon' />
                </label>
                <input type="file" id="file" onChange={e=>setImgFile(e.target.files[0])}/>
            </div>
              {error && <span className="error" >Please fill in all fields marked *</span>}
              {(success && !error) && <span className="success">New user created</span>}
              <button className="newUserButton" onClick={handleClick}>Create</button>  
        </form>
    </div>
  )
}

export default NewUser;