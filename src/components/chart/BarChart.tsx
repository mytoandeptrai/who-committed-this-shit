import { cn } from '@/lib/utils';
import { type FC, type ReactNode, useId } from 'react';
import {
  Bar,
  BarChart as BarChartComponent,
  type BarProps,
  CartesianGrid,
  Label,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  type XAxisProps,
  YAxis,
  type YAxisProps,
} from 'recharts';
import type { BarRectangleItem } from 'recharts/types/cartesian/Bar';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { LabelPosition } from 'recharts/types/component/Label';

export type ChartDataPoint = Record<string, number | string | boolean>;

export interface BarConfig {
  dataKey: keyof ChartDataPoint & string;
  fill: string;
  stackId?: string;
  name?: string;
  barSize?: number;
  radius?: number;
}

export interface BarChartXAxisConfig extends XAxisProps {
  xAxisLabel?: string;
  xAxisLabelPosition?: LabelPosition;
  xAxisLabelClassName?: string;
}
export interface BarChartYAxisConfig extends YAxisProps {}

interface BarChartProps extends Pick<BarProps, 'activeBar' | 'shape'> {
  data: ChartDataPoint[];
  bars: BarConfig[];
  xAxisKey: keyof ChartDataPoint & string;
  isShowVerticalGrid?: boolean;
  isShowHorizontalGrid?: boolean;
  isShowXAxis?: boolean;
  isShowYAxis?: boolean;
  isShowTooltip?: boolean;
  aspect?: number;
  maxHeight?: number;
  isStacked?: boolean;
  xAxisConfig?: BarChartXAxisConfig;
  yAxisConfig?: BarChartYAxisConfig;
  customTooltip?: TooltipProps<ValueType, NameType>['content'];
  gradientColor?: boolean;
  customGradientBar?: ReactNode;
  isBarGradient?: boolean;
}

export interface BarGradientProps extends BarRectangleItem {
  isGradient?: boolean;
}

export function BarGradient(props?: BarGradientProps) {
  const id = useId();
  const gradientId = `gradient-${id}`;
  const clipPathId = `clipPath-${id}`;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='100%'>
          <stop offset='0%' stopColor={`${props?.fill}40`} />
          <stop offset='100%' stopColor={props?.isGradient ? '#fff' : `${props?.fill}40`} />
        </linearGradient>

        <clipPath id={clipPathId}>
          <Rectangle fill={props?.isGradient ? '#fff' : `${props?.fill}40`} {...props} />
        </clipPath>
      </defs>

      <rect
        x={props?.x}
        y={props?.background?.y ? Number(props.background?.y) : undefined}
        width={props?.width}
        height={props?.background?.height}
        fill={`url(#${gradientId})`}
        clipPath={`url(#${clipPathId})`}
      />
      <g>
        <rect x={props?.x} y={props?.y} width={props?.width} height={2} stroke='none' fill={props?.fill} />
      </g>
    </>
  );
}

const BarChart: FC<BarChartProps> = ({
  data,
  bars,
  xAxisKey,
  isShowVerticalGrid = false,
  isShowHorizontalGrid = true,
  isShowYAxis = false,
  isShowXAxis = true,
  isShowTooltip = true,
  aspect = 1.618,
  maxHeight = 500,
  isStacked = false,
  xAxisConfig,
  yAxisConfig,
  customTooltip,
  gradientColor = true,
  activeBar,
  shape,
  isBarGradient = true,
}) => {
  return (
    <ResponsiveContainer width='100%' aspect={aspect} maxHeight={maxHeight} className={'h-fit'}>
      <BarChartComponent data={data} barCategoryGap={20}>
        <CartesianGrid
          stroke='#F5F5F5'
          strokeDasharray='0 0'
          vertical={isShowVerticalGrid}
          horizontal={isShowHorizontalGrid}
        />
        {isShowXAxis && (
          <XAxis
            {...xAxisConfig}
            tickLine={xAxisConfig?.tickLine || false}
            axisLine={xAxisConfig?.axisLine || false}
            dataKey={xAxisKey}
          >
            {xAxisConfig?.xAxisLabel && (
              <Label
                value={xAxisConfig?.xAxisLabel}
                position={xAxisConfig?.xAxisLabelPosition ?? 'insideBottomRight'}
                offset={12}
                className={cn(
                  'z-50 hidden fill-general-primary font-medium font-open-sauce-one text-xs md:block',
                  xAxisConfig?.xAxisLabelClassName
                )}
              />
            )}
          </XAxis>
        )}
        {isShowYAxis && <YAxis {...yAxisConfig} />}
        {isShowTooltip && (
          <Tooltip content={customTooltip} cursor={{ fill: 'transparent' }} wrapperStyle={{ zIndex: 999999 }} />
        )}
        {/* <Legend /> */}

        {bars.map((bar, index) => (
          <Bar
            key={`${index}-${bar.dataKey}`}
            dataKey={bar.dataKey}
            fill={gradientColor ? undefined : bar.fill}
            stackId={isStacked ? 'stack' : bar.stackId}
            name={bar.name}
            barSize={bar.barSize}
            radius={bar.radius}
            activeBar={
              activeBar
                ? activeBar
                : // biome-ignore lint/style/noNestedTernary: <explanation>
                  gradientColor
                  ? (props: any) => <BarGradient {...props} isGradient={isBarGradient} fill={bar.fill} />
                  : undefined
            }
            shape={
              shape
                ? shape
                : // biome-ignore lint/style/noNestedTernary: <explanation>
                  gradientColor
                  ? (props: any) => <BarGradient {...props} isGradient={isBarGradient} fill={bar.fill} />
                  : undefined
            }
          />
        ))}
      </BarChartComponent>
    </ResponsiveContainer>
  );
};

export default BarChart;
