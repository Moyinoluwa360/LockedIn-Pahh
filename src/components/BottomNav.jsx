import React from 'react';

const BottomNav = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'dashboard', label: 'Home', icon: '⌂' },
        { id: 'tasks', label: 'Tasks', icon: '≡' },
        { id: 'calendar', label: 'Calendar', icon: '☐' },
        { id: 'achievements', label: 'Awards', icon: '★' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '64px',
            background: 'var(--bg-primary)',
            borderTop: '1px solid var(--surface-border)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: 'env(safe-area-inset-bottom)', /* For iPhone home indicator */
            zIndex: 100
        }}>
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        background: 'transparent',
                        border: 'none',
                        color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-sans)',
                        cursor: 'pointer',
                        padding: 'var(--spacing-xs)'
                    }}
                >
                    <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{item.icon}</span>
                    {item.label}
                </button>
            ))}
        </nav>
    );
};

export default BottomNav;
