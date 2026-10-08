import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'info' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  style,
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 500,
    borderRadius: 'var(--radius-full)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    transition: 'all var(--transition-fast)',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '3px 8px',
      fontSize: '0.6875rem',
    },
    md: {
      padding: '4px 10px',
      fontSize: '0.75rem',
    },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--bg-surface-elevated)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-subtle)',
    },
    accent: {
      backgroundColor: 'var(--accent-subtle)',
      color: 'var(--accent-text)',
      border: '1px solid var(--accent-border)',
    },
    success: {
      backgroundColor: 'var(--color-success-subtle)',
      color: 'var(--color-success)',
      border: '1px solid rgba(16, 185, 129, 0.25)',
    },
    warning: {
      backgroundColor: 'var(--color-warning-subtle)',
      color: 'var(--color-warning)',
      border: '1px solid rgba(245, 158, 11, 0.25)',
    },
    info: {
      backgroundColor: 'var(--color-info-subtle)',
      color: 'var(--color-info)',
      border: '1px solid rgba(56, 189, 248, 0.25)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-default)',
    },
  };

  return (
    <span
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      className={`ai11-badge ${className}`}
    >
      {children}
    </span>
  );
};
