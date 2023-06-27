import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const EmbarkedMapChart = () => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetch('dataset.json')
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
        console.log(data);
      });
  }, []);

  const countPassengerByClassAndEmbarked = () => {
    const embarkedData = {
      C: { '1': 0, '2': 0, '3': 0 },
      Q: { '1': 0, '2': 0, '3': 0 },
      S: { '1': 0, '2': 0, '3': 0 },
    };

    infos.forEach((info) => {
      const embarked = info.Embarked;
      const passengerClass = info.Pclass.toString();

      if (embarkedData[embarked] && embarkedData[embarked][passengerClass] !== undefined) {
        embarkedData[embarked][passengerClass]++;
      }
    });

    return embarkedData;
  };

  const embarkedData = countPassengerByClassAndEmbarked();

  const data = Object.keys(embarkedData).map((embarked) => ({
    embarked: embarked === 'C' ? 'Cherbourg' : embarked === 'Q' ? 'Queenstown' : 'Southampton',
    'First Class': embarkedData[embarked]['1'],
    'Second Class': embarkedData[embarked]['2'],
    'Third Class': embarkedData[embarked]['3'],
  }));

  const colors = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className='py-20'>
        <div style={{ height: '400px' }}>
        <p className='w-10/12 mx-auto text-3xl font-bold text-blue-700'>This graph represents the embarktion for each class</p>
      <ResponsiveBar
        data={data}
        keys={['First Class', 'Second Class', 'Third Class']}
        indexBy="embarked"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={colors}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Embarked',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Count',
          legendPosition: 'middle',
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
    </div>
  );
};

export default EmbarkedMapChart;
