import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const DiedByEmbarkedChart = () => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetch('dataset.json')
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
        console.log(data);
      });
  }, []);

  const countPassengersDiedByEmbarked = () => {
    const embarkedData = {
      'Cherbourg': 0,
      'Queenstown': 0,
      'Southampton': 0,
    };

    infos.forEach((info) => {
      const embarked = getEmbarkedFullName(info.Embarked);
      const isSurvived = info.Survived === 0;

      if (embarkedData[embarked] !== undefined) {
        if (isSurvived) {
          embarkedData[embarked]++;
        }
      }
    });

    return embarkedData;
  };

  const getEmbarkedFullName = (embarkedCode) => {
    switch (embarkedCode) {
      case 'C':
        return 'Cherbourg';
      case 'Q':
        return 'Queenstown';
      case 'S':
        return 'Southampton';
      default:
        return '';
    }
  };

  const embarkedData = countPassengersDiedByEmbarked();

  const data = Object.keys(embarkedData).map((embarked) => ({
    embarked,
    value: embarkedData[embarked],
  }));

  return (
    <div style={{ height: '400px' }}>
        <p className="w-10/12 mx-auto text-3xl font-bold text-blue-700">
        This graph show how many people were dead of each embarked place
      </p>
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="embarked"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={['#ff0000']}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Embarkation',
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
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default DiedByEmbarkedChart;
