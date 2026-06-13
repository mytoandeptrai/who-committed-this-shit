import type { FC, ReactNode } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart as LineChartComponent,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  type XAxisProps,
  YAxis,
  type YAxisProps,
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { CurveType } from 'recharts/types/shape/Curve';
import type { TickProp } from 'recharts/types/util/types';

export type ChartDataPoint = Record<string, number | string | ReactNode>;

export interface LineConfig {
  dataKey: keyof ChartDataPoint & string;
  stroke: string;
  strokeWidth?: number;
  dot?: boolean;
  type?: CurveType;
  name?: string;
}

export interface LineChartXAxisConfig extends XAxisProps {}

export interface LineChartYAxisConfig extends YAxisProps {}

interface LineChartProps {
  data: ChartDataPoint[];
  lines: LineConfig[];
  xAxisKey: keyof ChartDataPoint & string;
  isShowVerticalGrid?: boolean;
  isShowHorizontalGrid?: boolean;
  height?: number;
  aspect?: number;
  customTooltip?: TooltipProps<ValueType, NameType>['content'];
  isShowXAxis?: boolean;
  customXAxisTick?: TickProp;
  xAxisConfig?: LineChartXAxisConfig;
  isShowYAxis?: boolean;
  yAxisConfig?: LineChartYAxisConfig;
}

const LineChart: FC<LineChartProps> = ({
  data,
  lines,
  xAxisKey,
  isShowVerticalGrid = false,
  isShowHorizontalGrid = true,
  height,
  aspect = 16 / 9,
  customTooltip,
  isShowXAxis = true,
  customXAxisTick,
  xAxisConfig,
  isShowYAxis = false,
  yAxisConfig,
}) => {
  return (
    <ResponsiveContainer width='100%' height={height} aspect={aspect} maxHeight={500}>
      <LineChartComponent
        data={data}
        margin={{
          right: 4,
          left: 24,
          top: 12,
        }}
      >
        <CartesianGrid
          stroke='#F5F5F5'
          strokeDasharray='0 0'
          vertical={isShowVerticalGrid}
          horizontal={isShowHorizontalGrid}
        />
        {isShowXAxis && (
          <XAxis
            {...xAxisConfig}
            tickLine={xAxisConfig?.tickLine ?? false}
            axisLine={xAxisConfig?.axisLine ?? false}
            dataKey={xAxisKey}
            tick={customXAxisTick}
            interval={xAxisConfig?.interval ?? 0}
            allowDataOverflow={true}
          />
        )}
        {isShowYAxis && (
          <YAxis
            {...yAxisConfig}
            tickLine={yAxisConfig?.tickLine ?? false}
            axisLine={yAxisConfig?.axisLine ?? false}
            tick={yAxisConfig?.tick ?? false}
            allowDataOverflow={true}
          />
        )}
        <Tooltip content={customTooltip} />

        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type={line.type ?? 'monotone'}
            dataKey={line.dataKey}
            stroke={line.stroke}
            strokeWidth={line.strokeWidth ?? 1}
            dot={line.dot ?? false}
            name={line.name}
          />
        ))}
      </LineChartComponent>
    </ResponsiveContainer>
  );
};

export default LineChart;
