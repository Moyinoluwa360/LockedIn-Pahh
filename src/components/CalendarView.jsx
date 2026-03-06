import React, { useMemo, useState } from 'react';
import { useAppData, getLocalDateString } from '../context/AppDataContext';
import StatCard from './StatCard';

const CalendarView = () => {
    const { activityLogs, currentStreak, longestStreak } = useAppData();

    // Track currently viewed month
    const [viewDate, setViewDate] = useState(new Date());

    const calendarDays = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        // First day of selected month
        const firstDay = new Date(year, month, 1);
        const startingDayOfWeek = firstDay.getDay(); // 0 is Sunday

        // Total days in month
        const totalDays = new Date(year, month + 1, 0).getDate();

        // Generate empty padding for start of month
        const blanks = Array.from({ length: startingDayOfWeek }, () => null);

        // Generate real dates
        const days = Array.from({ length: totalDays }, (_, i) => {
            const dayNum = i + 1;
            // build YYYY-MM-DD string
            const strDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            return strDate;
        });

        return [...blanks, ...days];
    }, [viewDate]);

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    }

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Calendar Tracker</h2>
            </div>

            <section style={{ border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                <StatCard title="Current Streak 🔥" value={`${currentStreak} Days`} />
                <StatCard title="Longest Streak 💪" value={`${longestStreak} Days`} />
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <button className="btn" style={{ width: 'auto', padding: '0 12px', background: 'var(--surface-color)', color: 'var(--text-primary)' }} onClick={handlePrevMonth}>&larr;</button>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</h3>
                    <button className="btn" style={{ width: 'auto', padding: '0 12px', background: 'var(--surface-color)', color: 'var(--text-primary)' }} onClick={handleNextMonth}>&rarr;</button>
                </div>

                {/* Days of Week Header */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px', textAlign: 'center' }}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{day}</div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                    {calendarDays.map((dateStr, index) => {
                        if (!dateStr) {
                            return <div key={`blank-${index}`} style={{ aspectRatio: '1/1', background: 'transparent' }} />;
                        }

                        const isActive = activityLogs.includes(dateStr);
                        const dayNum = parseInt(dateStr.split('-')[2], 10);

                        // Check if today
                        const todayStr = getLocalDateString();
                        const isToday = dateStr === todayStr;

                        return (
                            <div key={dateStr} style={{
                                aspectRatio: '1/1',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: isActive ? 'var(--success)' : 'var(--bg-secondary)',
                                color: isActive ? '#000000' : 'var(--text-primary)',
                                fontWeight: isActive ? 600 : 400,
                                fontSize: '0.9rem',
                                borderRadius: 'calc(var(--radius-sm) - 2px)',
                                border: isToday ? '2px solid var(--text-primary)' : '1px solid transparent',
                            }}>
                                {dayNum}
                            </div>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'var(--spacing-lg)', justifyContent: 'center' }}>
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--success)', borderRadius: '2px' }}></span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Activity Logged</span>
                </div>
            </section>

        </div>
    );
};

export default CalendarView;
