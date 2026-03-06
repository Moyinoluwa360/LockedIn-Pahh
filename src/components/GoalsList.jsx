import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import GoalItem from './GoalItem';
import AddGoalModal from './AddGoalModal';

const GoalsList = () => {
  const { goals } = useAppData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Goals</h2>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '0 var(--spacing-md)' }} onClick={() => setIsModalOpen(true)}>
          New Goal
        </button>
      </div>

      <section>
        <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)', letterSpacing: '0.05em' }}>
          Active
        </h3>

        {activeGoals.length === 0 ? (
          <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--surface-border)', borderRadius: 'var(--radius-md)' }}>
            No active goals.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {activeGoals.map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </section>

      {completedGoals.length > 0 && (
        <section>
          <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)', letterSpacing: '0.05em' }}>
            Completed
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {completedGoals.map((goal) => (
              <GoalItem key={goal.id} goal={goal} isCompleted />
            ))}
          </div>
        </section>
      )}

      {isModalOpen && <AddGoalModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default GoalsList;
