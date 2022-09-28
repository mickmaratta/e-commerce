import React, { useMemo, useState } from 'react';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import "./home.css";
import { userData } from "../../dummyData"
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useEffect } from 'react';
import { userRequest } from '../../requestMethods';

const Home = () => {
  const [userOrders, setUserOrders] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const getOrders = async () => {
    try {
      const res = await userRequest.get("/orders");
      setUserOrders(res.data)
    } catch {}
  };

  useEffect(() => {
    getOrders()
  }, [])

  let data = [];
  userOrders.map(order => {
    const newOrder = {name: MONTHS[order.createdAt.split("-")[1] - 1], "Total Sales": order.amount};
    return data.push(newOrder);
  })

  return (
    <div className='home'>
        <FeaturedInfo />
        <Chart 
        data={data}
        title="Sales"
        grid
        dataKey="Total Sales"
        />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
    </div>
  )
}

export default Home