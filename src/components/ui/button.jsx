import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold tracking-wide ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:  'bg-primary text-white hover:bg-orange-dark',
        outline:  'border-2 border-white/40 text-white hover:border-white bg-transparent hover:bg-white/8',
        success:  'bg-emerald-race text-white hover:bg-emerald-race-dark',
        ghost:    'hover:bg-black/6 text-foreground',
        link:     'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-8 py-3',
        sm:      'h-9 px-5 py-2 text-xs',
        lg:      'h-13 px-10 py-4 text-base',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
