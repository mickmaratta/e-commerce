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
    AddCircleOutline,
    PersonAddAlt1,
    LocalShipping,
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
                    <Link className="link" to="/newUser">
                        <li className={"sidebarListItem " + (loc==="newUser" && "active")}>
                            <PersonAddAlt1 className='sidebarIcon'/>
                            Create User
                        </li>
                    </Link>
                    <Link className="link" to="/products">  
                        <li className={"sidebarListItem " + (loc==="products" && "active")}>
                            <Storefront className='sidebarIcon'/>
                            Products
                        </li>
                    </Link>
                    <Link className='link' to="/newProduct">
                        <li className={"sidebarListItem " + (loc==="newProduct" && "active")}>
                            <AddCircleOutline className='sidebarIcon'/>
                            Add Product
                        </li>
                    </Link>
                    <Link className='link' to="/orders">
                        <li className={"sidebarListItem " + (loc==="orders" && "active")}>
                            <LocalShipping className='sidebarIcon'/>
                            Orders
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem disabled">
                        <MailOutline className='sidebarIcon'/>
                        Mail
                    </li>
                    <li className="sidebarListItem disabled">
                        <DynamicFeed className='sidebarIcon'/>
                        Feedback
                    </li>
                    <li className="sidebarListItem disabled">
                        <ChatBubbleOutline className='sidebarIcon'/>
                        Messages
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Staff</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem disabled">
                        <WorkOutline className='sidebarIcon'/>
                        Manage
                    </li>
                    <li className="sidebarListItem disabled">
                        <Timeline className='sidebarIcon'/>
                        Analytics
                    </li>
                    <li className="sidebarListItem disabled">
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