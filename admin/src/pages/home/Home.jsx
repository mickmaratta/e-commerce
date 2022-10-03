import React, { useMemo, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";

const Home = () => {
  const [orderStats, setOrderStats] = useState([]);

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

  useEffect(() => {
    const getIncome = async () => {
        try {
            const res = await userRequest.get("orders/income");
            res.data.sort((a, b) => a._id-b._id)
            setOrderStats(res.data.map(item => {
              return {name: MONTHS[item._id-1], "Total Sales": item.total.toFixed(2)} 
            }))
        } catch (error) {
            console.log(error)
        }
    }
    getIncome()
  }, [MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={orderStats} title="Sales" grid dataKey="Total Sales" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
