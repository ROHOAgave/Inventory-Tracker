import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BatchInventoryChart = () => {
  // Inventory data - this is what you'll update in GitHub
  const inventoryData = [
    {
      batch: 'Batch 17',
      remaining: 25,
      total: 75
    },
    {
      batch: 'Batch 18',
      remaining: 75,
      total: 75
    },
    {
      batch: 'Batch 19',
      remaining: 80,
      total: 80
    },
    {
      batch: 'Batch 20',
      remaining: 100,
      total: 100
    }
  ];
  
  // Process data to add percentage information
  const processedData = inventoryData.map(item => {
    // Calculate sold number
    const soldCount = item.total - item.remaining;
    
    // Calculate percentages
    const remainingPercentage = Math.round((item.remaining / item.total) * 100);
    const soldPercentage = 100 - remainingPercentage;
    
    return {
      ...item,
      sold: soldCount,
      remainingPercentage,
      soldPercentage
    };
  });

  // Custom tooltip to show more detailed information
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-md" style={{ fontFamily: "'Avenir', 'Avenir Next', 'Futura', sans-serif" }}>
          <p className="font-bold">{label}</p>
          <p className="text-sm">Remaining: {data.remaining} of {data.total} ({data.remainingPercentage}%)</p>
          <p className="text-sm">Sold: {data.sold} of {data.total} ({data.soldPercentage}%)</p>
        </div>
      );
    }
    return null;
  };

  // Simple label component for remaining bottles
  const RemainingLabel = (props) => {
    const { x, y, width, height, value } = props;
    if (width < 30) return null;
    
    // Find the data item for this bar segment
    const index = props.index;
    if (index === undefined || !processedData[index]) return null;
    
    const count = processedData[index].remaining;
    
    return (
      <text 
        x={x + 10} 
        y={y + height / 2} 
        textAnchor="start" 
        dominantBaseline="middle"
        fill="#FFFFFF"
        fontWeight="bold"
      >
        {count}
      </text>
    );
  };

  // Simple label component for sold bottles
  const SoldLabel = (props) => {
    const { x, y, width, height, value } = props;
    if (width < 30) return null;
    
    // Find the data item for this bar segment
    const index = props.index;
    if (index === undefined || !processedData[index]) return null;
    
    const count = processedData[index].sold;
    
    return (
      <text 
        x={x + 10} 
        y={y + height / 2} 
        textAnchor="start" 
        dominantBaseline="middle"
        fill="#FFFFFF"
        fontWeight="bold"
      >
        {count}
      </text>
    );
  };

  return (
    <div className="w-full p-4" style={{ 
      backgroundColor: '#D5D2CD',
      fontFamily: "'Avenir', 'Avenir Next', 'Futura', sans-serif"
    }}>
      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Avenir', 'Avenir Next', 'Futura', sans-serif" }}>Batch Availability</h2>
      <div className="flex justify-center">
        <div className="flex gap-4 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: '#9C8B7E' }}></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: '#C2A998' }}></div>
            <span>Sold</span>
          </div>
        </div>
      </div>
      <div style={{ height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 100]} hide={true} />
            <YAxis 
              dataKey="batch" 
              type="category" 
              width={80} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="remainingPercentage" 
              stackId="a" 
              fill="#9C8B7E" 
              name="Available"
              radius={[0, 0, 0, 0]}
              label={<RemainingLabel />}
            />
            <Bar 
              dataKey="soldPercentage" 
              stackId="a" 
              fill="#C2A998" 
              name="Sold" 
              radius={[0, 0, 0, 0]}
              label={<SoldLabel />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BatchInventoryChart;
