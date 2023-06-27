import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const NonSurvivedPclass = () => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetch('dataset.json')
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
        console.log(data);
      });
  }, []);

  const countNonSurvivedByPclass = () => {
    let firstClassNonSurvived = 0;
    let secondClassNonSurvived = 0;
    let thirdClassNonSurvived = 0;

    infos.forEach((info) => {
      if (info.Survived === 0) {
        if (info.Pclass === 1) {
          firstClassNonSurvived++;
        } else if (info.Pclass === 2) {
          secondClassNonSurvived++;
        } else if (info.Pclass === 3) {
          thirdClassNonSurvived++;
        }
      }
    });

    return [
      { name: 'First Class', value: firstClassNonSurvived },
      { name: 'Second Class', value: secondClassNonSurvived },
      { name: 'Third Class', value: thirdClassNonSurvived },
    ];
  };

  const data = countNonSurvivedByPclass();

  // Define custom colors for the pie chart
  const colors = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="py-20">
      <div className="w-fit mx-auto">
        <p className="w-10/12 mx-auto text-3xl font-bold text-blue-700">
        This Pie chart shows the number of non-survivors according to First Class,Second Class and Third Class
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

export default NonSurvivedPclass;
