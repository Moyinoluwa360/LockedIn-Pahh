import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'goals', label: 'My Goals', icon: '🎯' },
        { id: 'achievements', label: 'Achievements', icon: '🏆' },
    ];

    return (
        <aside style={{
            width: '250px',
            height: '100vh',
            position: 'fixed',
            background: 'rgba(24, 25, 32, 0.5)',
            backdropFilter: 'var(--glass-blur)',
            borderRight: '1px solid var(--surface-border)',
            padding: 'var(--spacing-xl) var(--spacing-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-xl)',
            zIndex: 10
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', padding: '0 var(--spacing-sm)' }}>
                <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: 'var(--accent-gradient)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', fontSize: '1.2rem', color: 'white'
                }}>
                    P
                </div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ProTracker</h2>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            background: activeTab === item.id ? 'var(--surface-color)' : 'transparent',
                            border: '1px solid',
                            borderColor: activeTab === item.id ? 'var(--surface-border)' : 'transparent',
                            borderRadius: 'var(--radius-md)',
                            color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '1rem',
                            transition: 'all var(--transition-fast)'
                        }}
                        onMouseOver={(e) => {
                            if (activeTab !== item.id) {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                e.currentTarget.style.color = 'var(--text-primary)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (activeTab !== item.id) {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                            }
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', padding: 'var(--spacing-md)', borderTop: '1px solid var(--surface-border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Stay Focused.
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
