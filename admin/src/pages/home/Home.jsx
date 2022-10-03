import React, { useMemo, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { getOrderStats } from "../../redux/apiCalls";

const Home = () => {
  const [userStats, setUserStats] = useState();

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
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        const list = res.data.sort((a, b) => a._id - b._id)
        setUserStats(list.map(item => {
          return { name: MONTHS[item._id - 1], "Users": item.total}
        }))
      } catch {}
    };
    getStats();
  }, [MONTHS]);



  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Stats" grid dataKey="Users" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
