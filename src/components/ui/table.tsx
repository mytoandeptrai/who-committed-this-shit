'use client';

import type * as React from 'react';

import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import { HStack } from '../utilities';
import { Skeleton } from './skeleton';
import { Tooltip } from './tooltip';

interface TableProps extends React.ComponentProps<'table'> {
  containerRef?: React.Ref<HTMLDivElement>;
}

function Table({
  className,
  containerRef,
  containerClassName,
  ...props
}: TableProps & { containerClassName?: string }) {
  return (
    <div
      ref={containerRef}
      data-slot='table-container'
      className={cn('relative max-h-120 w-full overflow-auto rounded-md', containerClassName)}
    >
      <table data-slot='table' className={cn('relative w-full caption-bottom text-sm', className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot='table-header'
      className={cn(
        'sticky top-0 z-50 bg-background',
        'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-general-border', // border-bottom
        '[&_tr:first-child_th:first-child]:rounded-tl-md [&_tr:first-child_th:last-child]:rounded-tr-md', // rounded top corners
        className
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot='table-body' className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot='table-footer'
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot='table-row'
      className={cn(
        'border-b border-b-general-border transition-colors hover:bg-muted data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  );
}

interface TableHeadProps extends React.ComponentProps<'th'> {
  tooltip?: string | React.ReactNode;
  tooltipSide?: 'left' | 'right' | 'top' | 'bottom' | undefined;
  tooltipClassName?: string;
  wrapperClassName?: string;
}

function TableHead({
  className,
  children,
  tooltip,
  tooltipSide = 'right',
  tooltipClassName,
  wrapperClassName,
  ...props
}: TableHeadProps) {
  return (
    <th
      data-slot='table-head'
      className={cn(
        'h-9 whitespace-nowrap px-2 text-left align-middle font-medium font-open-sauce-one text-general-foreground text-sm [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    >
      <HStack noWrap spacing={8} className={cn('w-fit flex-none', wrapperClassName)}>
        {children}

        {tooltip && (
          <Tooltip
            side={tooltipSide}
            content={tooltip as string | React.ReactNode}
            textClassName='md:max-w-125'
            className={tooltipClassName}
          >
            <Icons.info className='size-4 text-general-muted-foreground' />
          </Tooltip>
        )}
      </HStack>
    </th>
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot='table-cell'
      className={cn(
        'whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption data-slot='table-caption' className={cn('mt-4 text-muted-foreground text-sm', className)} {...props} />
  );
}

const TableLoading = ({
  cols,
  rows,
  skeletonClassName,
}: {
  cols: number;
  rows: number;
  skeletonClassName?: string;
}) => {
  return Array.from({ length: rows }).map((_, index) => (
    <TableRow key={index}>
      {Array.from({ length: cols }).map((_, index) => (
        <TableCell key={index}>
          <Skeleton className={cn('h-6 w-full min-w-10', skeletonClassName)} />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableLoading, TableRow };
