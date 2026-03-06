import React from 'react';
import { useAppData } from '../context/AppDataContext';

const TaskItem = ({ task, isCompleted }) => {
    const { updateGoalProgress, updateTaskProgress, deleteTask } = useAppData();
    // Fallback for older interface compatibility during refactor
    const progressUpdater = updateTaskProgress || updateGoalProgress;

    const progressPercentage = (task.current / task.target) * 100;

    const handleAddProgress = () => {
        if (!isCompleted) {
            progressUpdater(task.id, task.current + 1);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Delete this task?')) {
            deleteTask(task.id);
        }
    }

    // Format the specific date constraint depending on type
    const renderConstraint = () => {
        if (task.type === 'daily' && task.targetDate) return `Due: ${task.targetDate}`;
        if (task.type === 'weekly' && task.weekStartDate) return `Week of: ${task.weekStartDate}`;
        if (task.type === 'duration' && task.startDate && task.endDate) return `${task.startDate} - ${task.endDate}`;
        return null;
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            padding: 'var(--spacing-md)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            opacity: isCompleted ? 0.6 : 1
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                <div>
                    <h4 style={{ fontSize: '1rem', margin: '0 0 4px 0', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {task.title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Target: {task.target} {task.unit || 'times'}
                        {renderConstraint() && ` • ${renderConstraint()}`}
                    </span>
                </div>

                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {task.current} / {task.target}
                </div>
            </div>

            <div className="progress-container" style={{ marginBottom: 'var(--spacing-md)' }}>
                <div className="progress-bar" style={{
                    width: `${Math.min(progressPercentage, 100)}%`,
                    background: isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)'
                }}></div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <button className="btn btn-secondary" style={{ flex: 1, minHeight: '36px', fontSize: '0.875rem' }} onClick={handleDelete}>
                    Delete
                </button>
                {!isCompleted && (
                    <button className="btn btn-primary" style={{ flex: 2, minHeight: '36px', fontSize: '0.875rem' }} onClick={handleAddProgress}>
                        +1 Progress
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
