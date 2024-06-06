import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomBarChart = ({ data }) => {
  const chartContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    minHeight: '400px',
  };

  const chartStyle = {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
  };

  return (
    <div style={chartContainerStyle}>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
        style={chartStyle}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stdname" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalmarks" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default CustomBarChart;
