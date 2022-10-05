import "./app.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Error from "./pages/error/Error";
import OrderList from "./pages/orderList/OrderList";


function App() {
  const currentUser = useSelector(state=>state.user.currentUser)
  const isAdmin = currentUser ? currentUser.isAdmin : false
  
  return (
    <Router className="App">
      <Routes>
        {!isAdmin && <>
          <Route path="/" element={<Login />}/>
          <Route path="*" element={<Error />} />
        </>}
      </Routes>

      {isAdmin && <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/users" element={<UserList />}/>  
            <Route path="/users/:userId" element={<User />}/> 
          <Route path="/newUser" element={<NewUser />}/>
          <Route path="/products" element={<ProductList />}/>
            <Route path="/products/:productId" element={<Product />}/>
          <Route path="/newProduct" element={<NewProduct />}/>
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </div>
      </>}

    </Router>
  );
}

export default App;
