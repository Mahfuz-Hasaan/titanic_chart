import React from "react";
import PieChart from "../Charts/PieChart";
import StackedAreaChart from "../StackedAreaChart/StackedAreaChart";
import CustomActiveShapePieChart from "../CustomActiveShapePieChart/CustomActiveShapePieChart";
import NonSurvivedPclass from "../Charts/NonsurvivedPclass/NonsurvivedPclass";
import EmbarkedChart from "../Charts/EmbarkedChart/EmbarkedChart";
import EmbarkedMapChart from "../Charts/EmbarkedMapCart/EmbarkedMapCart";
import FunnelGraphAlive from "../Charts/FunnelGraphAlive/FunnelGraphAlive";
import DiedByEmbarkedChart from "../Charts/DiedByEmbarkedChart/DiedByEmbarkedChart";

const Home = () => {
  return (
    <div>
      <PieChart></PieChart>
      <StackedAreaChart></StackedAreaChart>
      <div className="flex justify-center gap-20">
        <CustomActiveShapePieChart></CustomActiveShapePieChart>
        <NonSurvivedPclass></NonSurvivedPclass>
      </div>
      <EmbarkedChart></EmbarkedChart>
      <EmbarkedMapChart></EmbarkedMapChart>
      <div className="grid md:grid-cols-2">
        <FunnelGraphAlive></FunnelGraphAlive>
        <DiedByEmbarkedChart></DiedByEmbarkedChart>
      </div>
    </div>
  );
};

export default Home;
