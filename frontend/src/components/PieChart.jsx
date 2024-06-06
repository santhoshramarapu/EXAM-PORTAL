import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, Label } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const CustomPieChart = ({ data }) => {
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
    maxWidth: '400px',
    height: 'auto',
  };

  return (
    <div style={chartContainerStyle}>
      <PieChart width={400} height={400} style={chartStyle}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120} // Reduced outer radius to prevent label clipping
          fill="#8884d8"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))
          }
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
