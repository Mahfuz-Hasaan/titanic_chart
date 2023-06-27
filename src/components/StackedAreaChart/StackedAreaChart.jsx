import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedAreaChart = () => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetch('dataset.json')
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
      });
  }, []);

  const getAgeData = () => {
    const ageData = Array.from({ length: 101 }, (_, index) => ({
      age: index,
      male: 0,
      female: 0,
    }));

    infos.forEach((info) => {
      const age = info.Age;

      if (age !== null && age !== undefined) {
        const ageIndex = Math.floor(age);

        if (ageIndex >= 0 && ageIndex <= 100) {
          if (info.Sex === 'male') {
            ageData[ageIndex].male++;
          } else if (info.Sex === 'female') {
            ageData[ageIndex].female++;
          }
        }
      }
    });

    return ageData;
  };

  const ageData = getAgeData();

  return (
    <div>
      <div className='text-3xl font-bold text-blue-700 w-fit mx-auto py-5'>
        <p>This Stacked Area Chart is showing male and female died according the age</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={ageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="male" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="female" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedAreaChart;
