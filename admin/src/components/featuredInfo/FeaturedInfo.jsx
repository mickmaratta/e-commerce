import React, { useEffect, useState } from 'react';
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { userRequest } from '../../requestMethods';

const FeaturedInfo = () => {
  const [ income, setIncome ] = useState([]);
  const [ perc, setPerc ] = useState(0);
  const [ orders, setOrders ] = useState();
  const [ users, setUsers ] = useState();
  
  useEffect(() => {
    const getUsers = async () => {
        try {
            const res = await userRequest.get("users");
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        } 
    }
    getUsers();
  }, []);

  const getOrders = async () => {
    try {
      const res = await userRequest.get("/orders");
      setOrders(res.data.map(order => order.amount))
    } catch {}
  };

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    const getIncome = async () => {
        try {
            const res = await userRequest.get("orders/income");
            res.data.sort((a, b) => b._id-a._id)
            setIncome(res.data);
            setPerc((res.data[0].total*100) / res.data[1].total - 100);
        } catch (error) {
            console.log(error)
        }
    }
    getIncome()
  }, [])

  const totalSales = orders && orders.reduce((a, b) => a + b);

  return (
    <div className='featured'>
        <div className="featuredItem">
            <span className="featuredTitle">Revenue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">${income[0]?.total.toFixed(2)}</span>
                <span className="featuredMoneyRate">
                    %{Math.abs(Math.floor(perc))}{ " " } 
                    {perc < 0 ? (
                        <ArrowDownward className='featuredIcon negative'/>
                    ) : <ArrowUpward className='featuredIcon'/>
                    }
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Total Sales</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">${totalSales?.toFixed(2)}</span>
            </div>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Total Active Users</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">{users && users.length}</span>
            </div>
        </div>
    </div>
  )
}

export default FeaturedInfo