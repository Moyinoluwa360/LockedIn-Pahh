import React, { useState } from 'react';
import { useAppData, getLocalDateString } from '../context/AppDataContext';

const AddTaskModal = ({ onClose, defaultType = 'daily' }) => {
    const { addTask } = useAppData();

    const [type, setType] = useState(defaultType);
    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [unit, setUnit] = useState('');

    // Specific constraints
    const [targetDate, setTargetDate] = useState(() => getLocalDateString());
    const [weekStartDate, setWeekStartDate] = useState(() => {
        const d = new Date();
        const day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // get Monday
        d.setDate(diff);
        return getLocalDateString(d);
    });
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !target) return;

        addTask({
            type,
            title,
            target: parseInt(target, 10),
            current: 0,
            unit: unit || 'times',
            completed: false,
            // Pass constraints dynamically
            targetDate: type === 'daily' ? targetDate : null,
            weekStartDate: type === 'weekly' ? weekStartDate : null,
            startDate: type === 'duration' ? targetDate : null,
            endDate: type === 'duration' ? endDate : null,
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
                <h2 style={{ fontSize: '1rem', margin: 0, fontWeight: 600 }}>New Task</h2>
                <button className="btn" style={{ width: 'auto', padding: 0, color: 'var(--text-primary)', background: 'transparent' }} onClick={handleSubmit}>
                    Save
                </button>
            </div>

            <div style={{ padding: 'var(--spacing-lg) var(--spacing-md)', flex: 1, overflowY: 'auto' }}>
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label className="input-label">Task Type</label>
                        <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
                            <option value="daily">Daily Task</option>
                            <option value="weekly">Weekly Goal</option>
                            <option value="duration">Long-term Duration</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Title</label>
                        <input type="text" className="input-field" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Read 20 pages" required autoFocus />
                    </div>

                    {/* Dynamic Context Fields based on Type */}
                    {type === 'daily' && (
                        <div className="input-group">
                            <label className="input-label">Date</label>
                            <input type="date" className="input-field" value={targetDate} onChange={e => setTargetDate(e.target.value)} required />
                        </div>
                    )}

                    {type === 'weekly' && (
                        <div className="input-group">
                            <label className="input-label">Week Start Date (Monday)</label>
                            <input type="date" className="input-field" value={weekStartDate} onChange={e => setWeekStartDate(e.target.value)} required />
                        </div>
                    )}

                    {type === 'duration' && (
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label className="input-label">Start Date</label>
                                <input type="date" className="input-field" value={targetDate} onChange={e => setTargetDate(e.target.value)} required />
                            </div>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label className="input-label">End Date</label>
                                <input type="date" className="input-field" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Target</label>
                            <input type="number" className="input-field" value={target} onChange={e => setTarget(e.target.value)} min="1" placeholder="e.g. 1" required />
                        </div>

                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Unit</label>
                            <input type="text" className="input-field" value={unit} onChange={e => setUnit(e.target.value)} placeholder="e.g. times" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--spacing-xl)' }}>
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
