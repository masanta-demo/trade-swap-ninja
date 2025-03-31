
import { useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface PriceChartProps {
  data: number[];
  color?: string;
  height?: number;
  showTooltip?: boolean;
  showAxis?: boolean;
  fullWidth?: boolean;
}

const PriceChart = ({ 
  data, 
  color = "#8B5CF6", 
  height = 60, 
  showTooltip = false,
  showAxis = false,
  fullWidth = false
}: PriceChartProps) => {
  
  const chartData = useMemo(() => {
    return data.map((value, index) => ({
      value,
      timestamp: index // In a real app, this would be actual timestamps
    }));
  }, [data]);

  const isPositive = data[0] <= data[data.length - 1];
  const gradientColor = isPositive ? color : "#EF4444";
  
  return (
    <ResponsiveContainer width={fullWidth ? "100%" : "100%"} height={height}>
      <AreaChart
        data={chartData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        {showAxis && (
          <>
            <XAxis 
              dataKey="timestamp" 
              hide={!showAxis} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
            />
            <YAxis 
              hide={!showAxis} 
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
          </>
        )}
        
        {showTooltip && (
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: 'none',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
            labelFormatter={() => ''}
          />
        )}
        
        <defs>
          <linearGradient id={`colorGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <Area
          type="monotone"
          dataKey="value"
          stroke={gradientColor}
          strokeWidth={2}
          fill={`url(#colorGradient-${color})`}
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
