import React from 'react';

const StatCard = ({ title, value, subtitle }) => {
    return (
        <div className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--spacing-md)',
            borderBottom: '1px solid var(--surface-border)', // Simple list item style separator
            borderRadius: 0,
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            background: 'transparent'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {title}
                </h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                    {value}
                </div>
            </div>
            {subtitle && (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'var(--spacing-xs)' }}>
                    {subtitle}
                </div>
            )}
        </div>
    );
};

export default StatCard;
