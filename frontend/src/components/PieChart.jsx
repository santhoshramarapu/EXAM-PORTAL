// src/components/PieChart.js
import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const CustomPieChart = ({ data }) => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      dataKey="total"
      nameKey="stdname"
      cx="50%"
      cy="50%"
      outerRadius={150}
      fill="#8884d8"
      label
    >
      {
        data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))
      }
    </Pie>
    <Tooltip />
  </PieChart>
);

export default CustomPieChart;
