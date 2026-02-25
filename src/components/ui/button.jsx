import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold tracking-wide ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:     'bg-primary text-primary-foreground hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)]',
        outline:     'bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/8 hover:-translate-y-0.5',
        success:     'bg-emerald-race text-white hover:bg-emerald-race-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(34,197,94,0.4)]',
        ghost:       'hover:bg-white/8 hover:text-white',
        link:        'text-primary underline-offset-4 hover:underline',
        nav:         'bg-primary text-white px-5 py-2.5 rounded-full hover:bg-orange-dark',
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
