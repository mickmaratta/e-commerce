import React from 'react';
import "./newUser.css"

const NewUser = () => {
  return (
    <div className='newUser'>
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm">
            <div className="newUserItem">
                <label>Username</label>
                <input type="text" placeholder='john123' />
            </div>
            <div className="newUserItem">
                <label>Full Name</label>
                <input type="text" placeholder='John Smith' />
            </div>
            <div className="newUserItem">
                <label>Email</label>
                <input type="email" placeholder='johnsmith@gmail.com' />
            </div>
            <div className="newUserItem">
                <label>Password</label>
                <input type="password" placeholder='password' />
            </div>
            <div className="newUserItem">
                <label>Phone Number</label>
                <input type="text" placeholder='123 454 7890' />
            </div>
            <div className="newUserItem">
                <label>Address</label>
                <input type="text" placeholder='New York, USA' />
            </div>
            <div className="newUserItem">
                <label>Active</label>
                <select name="active" id="active" className='newUserSelect'>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <button className="newUserButton">Create</button>
        </form>
    </div>
  )
}

export default NewUser