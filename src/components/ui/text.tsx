import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

const textVariants = cva('text-general-foreground selection:bg-[#004386] selection:text-white', {
  variants: {
    type: {
      default: 'font-open-sauce-one text-base', // paragraph regular
      h1: 'font-eb-garamond font-medium text-4xl md:text-5xl italic', // heading 1
      h1a: 'font-eb-garamond font-medium text-3xl md:text-4xl', // heading 1a
      h2: 'font-open-sauce-one text-3xl font-medium', // heading 2
      h3: 'font-open-sauce-one text-2xl font-semibold md:text-3xl md:font-medium', // heading 3
      h4: 'font-open-sauce-one text-base font-semibold md:text-xl', // heading 4
    },
    weight: {
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
    },
    size: {
      default: 'text-base',
      xs: 'text-xs  leading-normal',
      sm: 'text-sm  leading-normal',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export interface TextProps extends React.ComponentProps<'p'>, VariantProps<typeof textVariants> {}

const Text: React.FC<TextProps> = ({ children, type, weight, size, className, ...props }) => {
  return (
    <p className={cn(textVariants({ weight, type, size, className }))} {...props}>
      {children}
    </p>
  );
};

export default Text;
