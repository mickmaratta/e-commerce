import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { userRequest } from '../requestMethods';

const Button = styled.button`
  padding: 10px;
  margin: 20px;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dcd7d7
  }
`
const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total.toFixed(2),
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch(err) {console.log(err)}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  console.log(location)
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
    </div>
  );
};


export default Success