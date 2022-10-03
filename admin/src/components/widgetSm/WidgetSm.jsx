import { Visibility } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { Link,  } from 'react-router-dom';
import "./widgetSm.css";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
        try {
            const res = await userRequest.get("users/?new=true");
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        } 
    }
    getUsers();
  }, []);

  return (
    <div className='widgetSm'>
        <span className="widgetSmTitle">Newly Joined Members</span>
        <ul className="widgetSmList">
            {users.map(user=> (
            <li className="widgetSmListItem" key={user._id}>
                <img src={user.img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"} alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">{user.name}</span>
                    <span className="widgetSmUserTitle">@{user.username}</span>
                </div>
                <Link className='link' to={`users/${user._id}`}>
                    <button className="widgetSmButton">
                        <Visibility className='widgetSmIcon' />
                        Display
                    </button>
                </Link>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default WidgetSm