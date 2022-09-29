import "./topbar.css";
import { NotificationsNone, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';

const Topbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/login", { replace: true })
    dispatch(logout())
  };

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
                    <span className="topIconBadge"></span>
                </div>
                <div className="topbarIconContainer" onClick={handleLogout}>
                    <Logout />
                    <span className="topIconBadge"></span>
                </div>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" className="topAvatar" />
            </div>
        </div>
    </div>
  )
}

export default Topbar