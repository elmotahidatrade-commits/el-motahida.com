import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  onClick,
  children,
  disabled,
  type = 'button',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
    secondary: 'bg-white text-textMain border border-borderC hover:bg-background',
    danger: 'bg-danger text-white hover:bg-danger/90',
    ghost: 'bg-transparent text-textMain hover:bg-background',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center rounded-lg font-semibold transition-all 
        active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses} ${sizeClasses} ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : Icon ? (
        <span className="mr-2">{Icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
