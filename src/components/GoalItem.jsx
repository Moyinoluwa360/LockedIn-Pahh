import React from 'react';
import { useAppData } from '../context/AppDataContext';

const GoalItem = ({ goal, isCompleted }) => {
    const { updateGoalProgress } = useAppData();
    const progressPercentage = (goal.current / goal.target) * 100;

    const handleAddProgress = () => {
        if (!isCompleted) {
            updateGoalProgress(goal.id, goal.current + 1);
        }
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
                        {goal.title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Target: {goal.target} {goal.unit || 'times'}</span>
                </div>

                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {goal.current} / {goal.target}
                </div>
            </div>

            <div className="progress-container" style={{ marginBottom: 'var(--spacing-md)' }}>
                <div className="progress-bar" style={{
                    width: `${Math.min(progressPercentage, 100)}%`,
                    background: isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)'
                }}></div>
            </div>

            {!isCompleted && (
                <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleAddProgress}>
                    +1 Progress
                </button>
            )}
        </div>
    );
};

export default GoalItem;
