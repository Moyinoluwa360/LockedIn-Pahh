import React, { useState, useMemo, useEffect } from 'react';
import { useAppData, getLocalDateString } from '../context/AppDataContext';
import AddTaskModal from './AddTaskModal';

const Dashboard = ({ setActiveTab }) => {
    const { tasks, currentStreak, longestStreak, activityLogs, updateTaskProgress } = useAppData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Daily Quote State
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        const fetchQuote = async () => {
            const todayStr = getLocalDateString();
            const cached = localStorage.getItem('productivity_daily_quote');

            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.date === todayStr) {
                    setQuote(parsed.data);
                    return;
                }
            }

            try {
                const response = await fetch('https://dummyjson.com/quotes/random');
                const data = await response.json();
                setQuote(data);
                localStorage.setItem('productivity_daily_quote', JSON.stringify({ date: todayStr, data }));
            } catch (err) {
                console.error("Failed to fetch daily quote", err);
            }
        };

        fetchQuote();
    }, []);

    // 1. Weekly Mini Calendar Logic
    const weekDays = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayOfWeek = today.getDay(); // 0 is Sunday
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Get Monday of current week
        const monday = new Date(today.setDate(diff));

        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(monday);
            d.setDate(d.getDate() + i);
            const str = getLocalDateString(d);
            return {
                dateStr: str,
                dayName: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
                dayNum: d.getDate(),
                isActive: activityLogs.includes(str),
                isToday: str === getLocalDateString()
            };
        });
    }, [activityLogs]);

    // 2. Today's Tasks
    const todayStr = getLocalDateString();
    const todaysTasks = tasks.filter(t => t.type === 'daily' && t.targetDate === todayStr && !t.completed);

    // 3. Weekly Overview Metrics
    const weekStartStr = weekDays[0].dateStr;
    const weeklyTasksAssigned = tasks.filter(t => t.type === 'weekly' && t.weekStartDate === weekStartStr);
    const weeklyTasksCompleted = weeklyTasksAssigned.filter(t => t.completed).length;

    // 4. Calculate Productivity Percentage safely
    const activeDaysThisWeek = weekDays.filter(d => d.isActive).length;
    // Calculate what day of week it is (1-7, where Monday is 1)
    const today = new Date();
    let currentDayOfWeek = today.getDay();
    currentDayOfWeek = currentDayOfWeek === 0 ? 7 : currentDayOfWeek; // Make Sunday = 7

    // If it's Monday and we have no activity, it should strictly be 0%. 
    // Otherwise, calculate out of 7 days total for the week progress.
    const weekProductivityPercentage = currentDayOfWeek === 1 && activeDaysThisWeek === 0
        ? 0
        : Math.round((activeDaysThisWeek / 7) * 100);

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>

            {/* 0. Daily Quote */}
            {quote && (
                <section style={{ fontStyle: 'italic', color: 'var(--text-secondary)', textAlign: 'center', padding: '0 var(--spacing-md)' }}>
                    "{quote.quote}"
                    <div style={{ fontSize: '0.75rem', marginTop: '8px', color: 'var(--text-muted)' }}>— {quote.author}</div>
                </section>
            )}

            {/* 1. Hero Metrics: Weekly Productivity & Longest Streak */}
            <section style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <div style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--surface-border)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: 'var(--spacing-xs)' }}>Week Productivity</div>
                    <div style={{ fontSize: '2.3rem', fontWeight: 700, lineHeight: 1, color: 'var(--text-primary)' }}>
                        {weekProductivityPercentage}<span style={{ fontSize: '1.5rem', fontWeight: 600 }}>%</span>
                    </div>
                </div>
                <div style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--surface-border)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.70rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: 'var(--spacing-xs)' }}>Longest 💪</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{longestStreak} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>days</span></div>
                </div>
            </section>

            {/* 2. Mini Weekly Calendar */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-md)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>This Week</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', border: '1px solid var(--surface-border)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)' }}>
                    {weekDays.map((day, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: day.isToday ? 600 : 400 }}>{day.dayName}</span>
                            <div style={{
                                width: '32px', height: '32px',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.85rem',
                                border: day.isToday ? '1px solid var(--text-primary)' : '1px solid transparent',
                                color: day.isActive ? '#000' : 'var(--text-primary)',
                                background: day.isActive ? 'var(--success)' : 'transparent',
                                fontWeight: day.isActive ? 600 : 400
                            }}>
                                {day.dayNum}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Today's Core Target */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Due Today ({todaysTasks.length})</h3>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', padding: 'var(--spacing-xs)' }} onClick={() => setActiveTab('tasks')}>View All</button>
                </div>

                {todaysTasks.length === 0 ? (
                    <div style={{ padding: 'var(--spacing-xl) 0', color: 'var(--text-muted)', borderTop: '1px solid var(--surface-border)' }}>
                        <p>You have no pending tasks scheduled for today.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        {todaysTasks.slice(0, 3).map(task => (
                            <div key={task.id} style={{
                                padding: 'var(--spacing-md)',
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--surface-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 'var(--spacing-md)'
                            }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--text-primary)' }}>{task.title}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {task.current} / {task.target} {task.unit || 'times'}
                                    </div>
                                </div>
                                <button
                                    className="btn btn-secondary"
                                    style={{ width: 'auto', minHeight: '36px', fontSize: '0.875rem', padding: '0 var(--spacing-md)' }}
                                    onClick={() => updateTaskProgress(task.id, task.current + 1)}
                                >
                                    +1
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* 4. Quick Action */}
            <section>
                <button className="btn btn-primary" style={{ width: '100%', padding: 'var(--spacing-md)' }} onClick={() => setIsModalOpen(true)}>
                    + Quick Add Task
                </button>
            </section>

            {/* 5. Weekly Overview Summary */}
            {weeklyTasksAssigned.length > 0 && (
                <section style={{ padding: 'var(--spacing-md)', background: 'var(--surface-color)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '8px' }}>Weekly Goals Overview</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 500 }}>Completed</span>
                        <span>{weeklyTasksCompleted} / {weeklyTasksAssigned.length}</span>
                    </div>
                    <div className="progress-container" style={{ marginTop: 0 }}>
                        <div className="progress-bar" style={{ width: `${(weeklyTasksCompleted / weeklyTasksAssigned.length) * 100}%` }}></div>
                    </div>
                </section>
            )}

            {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} defaultType="daily" />}

        </div>
    );
};

export default Dashboard;
