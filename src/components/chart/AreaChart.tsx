import type { FC, ReactNode } from 'react';
import {
  Area,
  AreaChart as AreaChartComponent,
  CartesianGrid,
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

export interface AreaConfig {
  dataKey: keyof ChartDataPoint & string;
  stroke: string;
  strokeWidth?: number;
  dot?: boolean;
  type?: CurveType;
  name?: string;
}

export interface AreaChartXAxisConfig extends XAxisProps {}

export interface AreaChartYAxisConfig extends YAxisProps {}

interface Props {
  data: ChartDataPoint[];
  areas: AreaConfig[];
  height?: number;
  maxHeight?: number;
  aspect?: number;
  xAxisKey: keyof ChartDataPoint & string;
  isShowVerticalGrid?: boolean;
  isShowHorizontalGrid?: boolean;
  customTooltip?: TooltipProps<ValueType, NameType>['content'];
  isShowXAxis?: boolean;
  xAxisConfig?: AreaChartXAxisConfig;
  customXAxisTick?: TickProp;
  isShowYAxis?: boolean;
  yAxisConfig?: AreaChartYAxisConfig;
  isShowTooltip?: boolean;
  isShowGrid?: boolean;
}

const AreaChart: FC<Props> = ({
  areas,
  data,
  height,
  maxHeight = 500,
  aspect,
  isShowVerticalGrid = false,
  isShowHorizontalGrid = true,
  customTooltip,
  xAxisKey,
  isShowXAxis = true,
  customXAxisTick,
  xAxisConfig,
  isShowYAxis = false,
  yAxisConfig,
  isShowTooltip = true,
  isShowGrid = true,
}) => (
  <ResponsiveContainer width='100%' height={height} aspect={aspect} maxHeight={maxHeight}>
    <AreaChartComponent
      data={data}
      margin={{
        right: 4,
        left: 24,
        top: 12,
      }}
    >
      {isShowGrid && (
        <CartesianGrid
          stroke='#F5F5F5'
          strokeDasharray='0 0'
          vertical={isShowVerticalGrid}
          horizontal={isShowHorizontalGrid}
        />
      )}
      <defs>
        {areas.map((a, index) => (
          <linearGradient key={index} id={`color-${a?.dataKey}-${index}`} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={`${a.stroke}40`} stopOpacity={0.8} />
            <stop offset='100%' stopColor={a.stroke} stopOpacity={0.03} />
          </linearGradient>
        ))}
      </defs>

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

      {areas.map((a, index) => (
        <Area
          key={a.dataKey}
          type={a.type ?? 'monotone'}
          dataKey={a.dataKey}
          stroke={a.stroke}
          fillOpacity={1}
          fill={`url(#color-${a.dataKey}-${index})`}
          name={a.name}
          isAnimationActive
        />
      ))}

      {isShowTooltip && <Tooltip content={customTooltip} />}
    </AreaChartComponent>
  </ResponsiveContainer>
);

export default AreaChart;
