import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';


const EmbarkedChart = () => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetch('dataset.json')
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
        console.log(data);
      });
  }, []);

  const countEmbarked = () => {
    let embarkedCounts = {
      C: 0,
      Q: 0,
      S: 0,
    };

    infos.forEach((info) => {
      if (info.Embarked === 'C') {
        embarkedCounts.C++;
      } else if (info.Embarked === 'Q') {
        embarkedCounts.Q++;
      } else if (info.Embarked === 'S') {
        embarkedCounts.S++;
      }
    });

    return embarkedCounts;
  };

  const embarkedData = countEmbarked();

  const data = [
    { embarked: 'Cherbourg', count: embarkedData.C },
    { embarked: 'Queenstown', count: embarkedData.Q },
    { embarked: 'Southampton', count: embarkedData.S },
  ];

  return (
    <div style={{ height: '400px' }}>
        <p className='w-10/12 mx-auto text-3xl font-bold text-blue-700'>This graph show how many people will embarked of each three place</p>
      <ResponsiveBar
        data={data}
        keys={['count']}
        indexBy="embarked"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        colors={['#0088FE', '#00C49F', '#FFBB28']}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Embarked',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Count',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default EmbarkedChart;
