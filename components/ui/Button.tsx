'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  loading?: boolean;
}

export function Button({ variant = 'primary', children, loading, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        // Base: all buttons
        'relative font-display font-bold uppercase tracking-[0.1em] text-sm',
        'min-h-[44px] min-w-[44px]',
        'transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'cursor-pointer',
        {
          // Primary: acid fill + drop-shadow glow
          'bg-[#c8f000] text-[#2a3400] px-8 py-3 rounded-[2px] hover:bg-[#D4F500] active:scale-[0.98] filter drop-shadow-[0_0_8px_rgba(200,240,0,0.4)] hover:drop-shadow-[0_0_16px_rgba(200,240,0,0.5)]':
            variant === 'primary',

          // Secondary: ghost — no background, outline border
          'bg-transparent text-[#F0EBE0] border border-[#4A6B4C]/30 px-8 py-3 rounded-[2px] hover:border-[#c8f000] hover:text-[#c8f000]':
            variant === 'secondary',

          // Ghost: minimal — used for secondary CTAs like "View Transmission Log"
          'bg-transparent text-[#c8f000] px-4 py-3 hover:underline underline-offset-4':
            variant === 'ghost',

          // Tertiary: underlined serif text
          'bg-transparent text-[#F0EBE0] font-body font-normal text-base normal-case tracking-normal underline underline-offset-4 hover:text-[#c8f000] px-2 py-2':
            variant === 'tertiary',
        },
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
