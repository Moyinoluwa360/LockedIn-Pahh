import React, { useMemo } from 'react';
import { useAppData } from '../context/AppDataContext';

const AchievementsGrid = () => {
    const { longestStreak, tasks } = useAppData();

    const totalCompletedTasks = useMemo(() => {
        return tasks.filter(t => t.completed).length;
    }, [tasks]);

    const STREAK_MILESTONES = [
        { title: "3-Day Streak", requirement: 3, check: longestStreak },
        { title: "7-Day Streak", requirement: 7, check: longestStreak },
        { title: "10-Day Streak", requirement: 10, check: longestStreak },
        { title: "30-Day Streak", requirement: 30, check: longestStreak },
        { title: "50-Day Streak", requirement: 50, check: longestStreak },
        { title: "100-Day Streak", requirement: 100, check: longestStreak },
    ];

    const TASK_MILESTONES = [
        { title: "10 Tasks Complete", requirement: 10, check: totalCompletedTasks },
        { title: "50 Tasks Complete", requirement: 50, check: totalCompletedTasks },
        { title: "100 Tasks Complete", requirement: 100, check: totalCompletedTasks },
    ];

    const renderBadge = (config) => {
        const isUnlocked = config.check >= config.requirement;
        return (
            <div key={config.title} style={{
                padding: 'var(--spacing-md)',
                background: 'var(--bg-secondary)',
                border: isUnlocked ? '1px solid var(--text-primary)' : '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-sm)',
                opacity: isUnlocked ? 1 : 0.5,
                filter: isUnlocked ? 'none' : 'grayscale(100%)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '2rem' }}>
                    {isUnlocked ? '★' : '☆'}
                </div>
                <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {config.title}
                    </div>
                    {!isUnlocked && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {config.check} / {config.requirement}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Achievements</h2>
            </div>

            <section>
                <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)', letterSpacing: '0.05em' }}>
                    Consistency Streaks
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                    {STREAK_MILESTONES.map(renderBadge)}
                </div>
            </section>

            <section>
                <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)', letterSpacing: '0.05em' }}>
                    Task Milestones
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                    {TASK_MILESTONES.map(renderBadge)}
                </div>
            </section>

        </div>
    );
};

export default AchievementsGrid;
