import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomBarChart = ({ data }) => (
  <BarChart
    width={600}
    height={300}
    data={data}
    margin={{
      top: 20, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="stdname" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="totalmarks" fill="#8884d8" />
  </BarChart>
);

export default CustomBarChart;
