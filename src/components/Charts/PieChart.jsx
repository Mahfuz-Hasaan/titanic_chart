import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const PieChartComponent = () => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetch("dataset.json")
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
        console.log(data);
      });
  }, []);

  const countSurvivalByGender = () => {
    let maleSurvived = 0;
    let femaleSurvived = 0;
    let maleNonSurvived = 0;
    let femaleNonSurvived = 0;

    infos.forEach((info) => {
      if (info.Sex === "male" && info.Survived === 1) {
        maleSurvived++;
      } else if (info.Sex === "female" && info.Survived === 1) {
        femaleSurvived++;
      } else if (info.Sex === "male" && info.Survived === 0) {
        maleNonSurvived++;
      } else if (info.Sex === "female" && info.Survived === 0) {
        femaleNonSurvived++;
      }
    });

    return [
      { name: "Male Survived", value: maleSurvived },
      { name: "Female Survived", value: femaleSurvived },
      { name: "Male Non-Survived", value: maleNonSurvived },
      { name: "Female Non-Survived", value: femaleNonSurvived },
    ];
  };

  const data = countSurvivalByGender();

  // Define custom colors for the pie chart
  const colors = ["#8884d8", "#82ca9d", "#ff7f50", "#ff6347"];

  const renderActiveShape = (props) => {
    const { payload } = props;

    return (
      <div>
        {payload.map((entry) => (
          <p key={entry.name}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="py-20">
      <div className="w-fit mx-auto">
        <p className="w-10/12 mx-auto text-3xl font-bold text-blue-700">
          This Pie chart graph shows how many male and female died and survived
          at titanic accident
        </p>
      </div>
      <PieChart width={400} height={400} className="w-fit mx-auto">
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          activeShape={renderActiveShape}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
