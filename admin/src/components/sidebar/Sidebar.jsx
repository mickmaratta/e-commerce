import React from 'react';
import "./sidebar.css";
import { 
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
} from "@mui/icons-material";

import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const loc = location.pathname.split("/")[1] ? location.pathname.split("/")[1] : "/"

    return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <Link className="link" to="/">
                        <li className={"sidebarListItem " + ((loc==="/" || loc==="login") && "active")} >
                            <LineStyle className='sidebarIcon'/>
                            Home
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                        <Timeline className='sidebarIcon'/>
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <TrendingUp className='sidebarIcon'/>
                        Sales
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick Menu</h3>
                <ul className="sidebarList">
                    <Link className="link" to="/users">
                        <li className={"sidebarListItem " + (loc==="users" && "active")}>
                            <PermIdentity className='sidebarIcon'/>
                            Users
                        </li>
                    </Link>
                    <Link className="link" to="/products">  
                    <li className={"sidebarListItem " + (loc==="products" && "active")}>
                        <Storefront className='sidebarIcon'/>
                        Products
                    </li>
                    </Link>
                    <li className="sidebarListItem">
                        <AttachMoney className='sidebarIcon'/>
                        Transactions
                    </li>
                    <li className="sidebarListItem">
                        <BarChart className='sidebarIcon'/>
                        Reports
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <MailOutline className='sidebarIcon'/>
                        Mail
                    </li>
                    <li className="sidebarListItem">
                        <DynamicFeed className='sidebarIcon'/>
                        Feedback
                    </li>
                    <li className="sidebarListItem">
                        <ChatBubbleOutline className='sidebarIcon'/>
                        Messages
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Staff</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <WorkOutline className='sidebarIcon'/>
                        Manage
                    </li>
                    <li className="sidebarListItem">
                        <Timeline className='sidebarIcon'/>
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <Report className='sidebarIcon'/>
                        Reports
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar