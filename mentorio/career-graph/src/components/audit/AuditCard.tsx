import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface AuditCardProps {
  title: string;
  value: string | number;
  status: 'good' | 'warning' | 'error' | 'neutral';
  description?: string;
  onActionClick?: () => void;
  actionLabel?: string;
}

export const AuditCard: React.FC<AuditCardProps> = ({
  title,
  value,
  status,
  description,
  onActionClick,
  actionLabel
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'var(--success)';
      case 'warning': return 'var(--warning)';
      case 'error': return 'var(--node-career)';
      default: return 'var(--text-main)';
    }
  };

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--spacing-xs)' }}>
        {title}
      </h3>
      
      <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: getStatusColor(), marginBottom: 'var(--spacing-sm)' }}>
        {value}
      </div>

      {description && (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)', flexGrow: 1 }}>
          {description}
        </p>
      )}

      {onActionClick && actionLabel && (
        <Button variant="outline" size="sm" onClick={onActionClick} style={{ marginTop: 'auto' }}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};
