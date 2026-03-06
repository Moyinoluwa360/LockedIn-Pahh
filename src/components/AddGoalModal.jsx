import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';

const AddGoalModal = ({ onClose }) => {
    const { addGoal } = useAppData();
    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [unit, setUnit] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !target) return;

        addGoal({
            title,
            target: parseInt(target, 10),
            current: 0,
            unit: unit || 'times',
            completed: false
        });
        onClose();
    };

    return (
        <div className="animate-fade-in" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--bg-primary)',
            zIndex: 200,
            display: 'flex', flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 'var(--spacing-md)', borderBottom: '1px solid var(--surface-border)'
            }}>
                <button className="btn" style={{ width: 'auto', padding: 0, color: 'var(--text-secondary)', background: 'transparent' }} onClick={onClose}>
                    Cancel
                </button>
                <h2 style={{ fontSize: '1rem', margin: 0, fontWeight: 600 }}>New Goal</h2>
                <button className="btn" style={{ width: 'auto', padding: 0, color: 'var(--text-primary)', background: 'transparent' }} onClick={handleSubmit}>
                    Save
                </button>
            </div>

            <div style={{ padding: 'var(--spacing-lg) var(--spacing-md)', flex: 1, overflowY: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Title</label>
                        <input type="text" className="input-field" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Read completely" required autoFocus />
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Target</label>
                            <input type="number" className="input-field" value={target} onChange={e => setTarget(e.target.value)} min="1" placeholder="e.g. 5" required />
                        </div>

                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Unit</label>
                            <input type="text" className="input-field" value={unit} onChange={e => setUnit(e.target.value)} placeholder="e.g. reps, hrs" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--spacing-xl)' }}>
                        Create Goal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddGoalModal;
