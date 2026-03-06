import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export const getLocalDateString = (d = new Date()) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const AppDataContext = createContext();

export const useAppData = () => useContext(AppDataContext);

export const AppDataProvider = ({ children }) => {
    // We'll migrate the old `goals` list to a unified `tasks` list.
    const [tasks, setTasks] = useState(() => {
        // Attempt to migrate old goals if they exist, else load tasks.
        const savedTasks = localStorage.getItem('productivity_tasks');
        if (savedTasks) return JSON.parse(savedTasks);

        // Migration fallback
        const savedGoals = localStorage.getItem('productivity_goals');
        if (savedGoals) {
            return JSON.parse(savedGoals).map(g => ({
                ...g,
                type: 'daily', // assign existing to daily by default
                targetDate: getLocalDateString()
            }));
        }
        return [];
    });

    const [activityLogs, setActivityLogs] = useState(() => {
        const saved = localStorage.getItem('productivity_activity_logs');
        return saved ? JSON.parse(saved) : [];
    });

    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('productivity_stats');
        const parsed = saved ? JSON.parse(saved) : null;
        return {
            totalPoints: parsed?.totalPoints || 0,
            longestStreak: parsed?.longestStreak || 0
        };
    });

    useEffect(() => {
        localStorage.setItem('productivity_tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('productivity_activity_logs', JSON.stringify(activityLogs));
    }, [activityLogs]);

    useEffect(() => {
        localStorage.setItem('productivity_stats', JSON.stringify(stats));
    }, [stats]);

    const logActivityForToday = () => {
        const today = getLocalDateString();
        setActivityLogs(prev => {
            if (!prev.includes(today)) {
                return [...prev, today].sort();
            }
            return prev;
        });
    };

    const addTask = (taskData) => {
        // taskData needs to include type ('daily', 'weekly', 'duration')
        setTasks([...tasks, { ...taskData, id: Date.now().toString(), createdAt: new Date().toISOString() }]);
    };

    const updateTaskProgress = (id, progress) => {
        setTasks(prevTasks => {
            let isActivityLogged = false;
            const updated = prevTasks.map(t => {
                if (t.id === id) {
                    const newProgress = Math.min(t.target, progress);
                    const completed = t.completed || newProgress >= t.target;

                    if (completed && !t.completed) {
                        setStats(s => ({ ...s, totalPoints: s.totalPoints + 100 }));
                        isActivityLogged = true; // Only log activity precisely when a task is fully completed
                    }

                    return { ...t, current: newProgress, completed };
                }
                return t;
            });

            if (isActivityLogged) {
                logActivityForToday();
            }

            return updated;
        });
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    }

    // Calculate strict streaks dynamically from activityLogs
    const currentStreak = useMemo(() => {
        if (activityLogs.length === 0) return 0;

        const todayObj = new Date();
        todayObj.setHours(0, 0, 0, 0); // normalize time

        let streak = 0;
        let checkDate = new Date(todayObj);

        // See if today is in log
        const todayStr = getLocalDateString(checkDate);
        if (activityLogs.includes(todayStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            // If not today, maybe yesterday?
            const yesterday = new Date(checkDate);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = getLocalDateString(yesterday);
            if (activityLogs.includes(yesterdayStr)) {
                // Streak is alive from yesterday
                checkDate = yesterday;
            } else {
                return 0; // Missed yesterday and today
            }
        }

        // Now count backwards
        while (true) {
            const checkStr = getLocalDateString(checkDate);
            if (activityLogs.includes(checkStr) && checkStr !== todayStr) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }, [activityLogs]);

    // Track all-time longest streak
    useEffect(() => {
        if (currentStreak > stats.longestStreak) {
            setStats(prev => ({ ...prev, longestStreak: currentStreak }));
        }
    }, [currentStreak, stats.longestStreak]);

    const value = {
        tasks,
        activityLogs,
        stats,
        currentStreak,
        longestStreak: stats.longestStreak,
        addTask,
        updateTaskProgress,
        deleteTask
    };

    return (
        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    );
};
