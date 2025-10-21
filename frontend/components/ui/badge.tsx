import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border-2 px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-slate-900 bg-slate-900 text-white shadow hover:bg-slate-800 hover:border-slate-800',
        secondary:
          'border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 hover:border-slate-300',
        destructive:
          'border-red-600 bg-red-600 text-white shadow hover:bg-red-700 hover:border-red-700',
        outline:
          'text-slate-900 border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
