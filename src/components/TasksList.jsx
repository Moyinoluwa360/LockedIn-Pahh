import React, { useState, useMemo } from 'react';
import { useAppData } from '../context/AppDataContext';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';

const TasksList = () => {
    const { tasks } = useAppData();
    const [activeFilter, setActiveFilter] = useState('daily'); // daily, weekly, duration
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter tasks based on selected sub-tab
    const filteredTasks = useMemo(() => {
        return tasks.filter(t => t.type === activeFilter || (!t.type && activeFilter === 'daily'));
    }, [tasks, activeFilter]);

    const activeTasks = filteredTasks.filter(t => !t.completed);
    const completedTasks = filteredTasks.filter(t => t.completed);

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Tasks</h2>
                <button className="btn btn-primary" style={{ width: 'auto', padding: '0 var(--spacing-md)' }} onClick={() => setIsModalOpen(true)}>
                    New Task
                </button>
            </div>

            {/* Modern segmented control for sub-tabs */}
            <div style={{ display: 'flex', padding: '4px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                {['daily', 'weekly', 'duration'].map(filter => (
                    <button
                        key={filter}
                        className="btn"
                        onClick={() => setActiveFilter(filter)}
                        style={{
                            flex: 1,
                            minHeight: '36px',
                            background: activeFilter === filter ? 'var(--text-primary)' : 'transparent',
                            color: activeFilter === filter ? 'var(--bg-primary)' : 'var(--text-secondary)',
                            borderRadius: 'calc(var(--radius-md) - 4px)',
                            textTransform: 'capitalize',
                            fontWeight: activeFilter === filter ? 600 : 400
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <section>
                <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)', letterSpacing: '0.05em' }}>
                    Active
                </h3>
                {activeTasks.length === 0 ? (
                    <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--surface-border)', borderRadius: 'var(--radius-md)' }}>
                        No active {activeFilter} tasks.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {activeTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </section>

            {completedTasks.length > 0 && (
                <section>
                    <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)', letterSpacing: '0.05em' }}>
                        Completed
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {completedTasks.map((task) => (
                            <TaskItem key={task.id} task={task} isCompleted />
                        ))}
                    </div>
                </section>
            )}

            {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} defaultType={activeFilter} />}
        </div>
    );
};

export default TasksList;
