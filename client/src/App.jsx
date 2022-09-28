import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
            <Route path="products" element={<ProductList />} />
              <Route path="products/:category" element={<ProductList />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="success" element={<Success />} />
          </Routes>
    </Router>
    
  );
}

export default App;
