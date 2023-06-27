import React, { useEffect, useState } from "react";
import PieChart from "../Charts/PieChart";

const Dashboard = () => {
  const [infos, setInfos] = useState([]);
  useEffect(() => {
    fetch("dataset.json")
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      {infos && infos.map((info) => <PieChart key={info.PassengerId} info={info}>
       
      </PieChart>)}
    </div>
  );
};

export default Dashboard;
