import React from 'react';
import "./topbar.css";
import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <Link to="/" className='link'>
                    <span className="logo">mickadmin</span>
                </Link>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings />
                </div>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" className="topAvatar" />
            </div>
        </div>
    </div>
  )
}

export default Topbar