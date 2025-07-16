import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
}

const WISCARRadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const chartData = [
    {
      dimension: 'Will',
      value: data.will,
      fullMark: 100,
    },
    {
      dimension: 'Interest',
      value: data.interest,
      fullMark: 100,
    },
    {
      dimension: 'Skill',
      value: data.skill,
      fullMark: 100,
    },
    {
      dimension: 'Cognitive',
      value: data.cognitive,
      fullMark: 100,
    },
    {
      dimension: 'Ability',
      value: data.ability,
      fullMark: 100,
    },
    {
      dimension: 'Real-World',
      value: data.realWorld,
      fullMark: 100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="dimension" />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name="WISCAR Score"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default WISCARRadarChart;