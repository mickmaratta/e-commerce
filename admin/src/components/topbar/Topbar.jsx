import "./topbar.css";
import { NotificationsNone, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';

const Topbar = () => {
  const adminId = useSelector(state=>state.user.currentUser._id)
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
                    <span className="logo">carlosadmin</span>
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
                <Link to={`/users/${adminId}`}>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" className="topAvatar" />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Topbar