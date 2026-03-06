import React from 'react';
import { useAppData } from '../context/AppDataContext';

const Header = () => {
    const { currentStreak } = useAppData();

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--spacing-lg) var(--spacing-md)',
            background: 'var(--bg-primary)',
            borderBottom: '1px solid var(--surface-border)',
            position: 'sticky',
            top: 0,
            zIndex: 50
        }}>
            <div>
                <h1 style={{ fontSize: '1.5rem', letterSpacing: '-0.02em', margin: 0 }}>
                    LockedIn Pah
                </h1>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <div style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: currentStreak > 0 ? 'var(--success)' : 'var(--text-muted)' }}></span>
                    Streak 🔥: <span style={{ color: currentStreak > 0 ? 'var(--success)' : 'var(--text-primary)', fontWeight: 600 }}>{currentStreak}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
