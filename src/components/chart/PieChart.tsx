import { multiply } from '@/lib/calc';
import { toFixedDown } from '@/utils/common';
import type { FC, ReactNode } from 'react';
import {
  Cell,
  Pie,
  PieChart as PieChartComponent,
  type PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export type ChartDataPoint = Record<string, number | string | ReactNode>;

interface PieChartProps {
  data: ChartDataPoint[];
  valueKey: keyof ChartDataPoint & string;
  nameKey?: keyof ChartDataPoint & string;
  colors: string[];
  isAnimationActive?: boolean;
  cornerRadius?: string | number;
  paddingAngle?: number;
  aspect?: number;
  maxHeight?: number;
  customTooltip?: TooltipProps<ValueType, NameType>['content'];
  isShowTooltip?: boolean;
  gradientColor?: boolean;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const radius = +innerRadius + (+outerRadius - +innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  if (Number((Number(percent || 0) * 100).toFixed(0)) < 10) {
    return null;
  }

  return (
    <text
      style={{ pointerEvents: 'none' }}
      className='font-medium font-open-sauce-one text-general-primary text-xs opacity-0 transition-opacity duration-100 ease-in-out group-hover:opacity-100'
      x={x}
      y={y}
      textAnchor='middle'
      dominantBaseline='middle'
    >
      {`${toFixedDown(multiply(Number(percent || 0), 100).toNumber(), 2)}%`}
    </text>
  );
};

const PieChart: FC<PieChartProps> = ({
  data,
  valueKey,
  colors,
  isAnimationActive = true,
  aspect = 1,
  maxHeight = 500,
  cornerRadius,
  customTooltip,
  isShowTooltip = true,
  gradientColor = true,
}) => {
  return (
    <ResponsiveContainer width='100%' aspect={aspect} maxHeight={maxHeight}>
      <PieChartComponent>
        <Pie
          className='group'
          label={renderCustomizedLabel}
          labelLine={false}
          data={data}
          stroke=''
          cx='50%'
          cy='50%'
          fill='#8884d8'
          dataKey={valueKey}
          isAnimationActive={isAnimationActive}
          cornerRadius={cornerRadius}
          rootTabIndex={-1}
          style={{ outline: 'none' }}
        >
          {gradientColor &&
            data.map((_entry, index) => (
              <radialGradient key={index} id={`myGradient${index}`}>
                <stop offset='15%' stopColor={'#FFFFFF'} />
                <stop offset='100%' stopColor={colors[index % colors.length]} />
              </radialGradient>
            ))}

          {data.map((_entry, index) => (
            <Cell
              style={{ outline: 'none' }}
              key={`cell-${index}`}
              fill={gradientColor ? `url(#myGradient${index})` : colors[index % colors.length]}
            />
          ))}
        </Pie>
        {isShowTooltip && <Tooltip content={customTooltip} />}
      </PieChartComponent>
    </ResponsiveContainer>
  );
};

export default PieChart;
