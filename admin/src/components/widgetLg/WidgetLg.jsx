import React, { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import "./widgetLg.css";
import {format} from "timeago.js";

const WidgetLg = () => {
  const [orders, setOrders] = useState([]);

  const Button = ({type}) => {
    return <button className={'widgetLgButton ' + type}>{type.toUpperCase()}</button>
  };

  useEffect(() => {
    const getOrders = async () => {
        try {
            const res = await userRequest.get("orders");
            setOrders(res.data)
        } catch (error) {
            console.log(error)
        } 
    }
    getOrders();
  }, []);

  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer ID</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map(order => (
            <tr className="WidgetLgTr" key={order.createdAt}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus"><Button type={order.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WidgetLg