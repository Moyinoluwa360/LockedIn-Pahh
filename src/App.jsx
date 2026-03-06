import React, { useState } from 'react';
import { AppDataProvider } from './context/AppDataContext';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TasksList from './components/TasksList';
import CalendarView from './components/CalendarView';
import AchievementsGrid from './components/AchievementsGrid';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <AppDataProvider>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        paddingBottom: '80px', /* space for bottom nav */
      }}>
        <Header />
        <main style={{
          flex: 1,
          padding: 'var(--spacing-md)',
          width: '100%',
          maxWidth: '800px', /* Constrain width on larger screens */
          margin: '0 auto',
        }}>
          <div className="animate-fade-in">
            {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
            {activeTab === 'tasks' && <TasksList />}
            {activeTab === 'calendar' && <CalendarView />}
            {activeTab === 'achievements' && <AchievementsGrid />}
          </div>
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </AppDataProvider>
  );
}

export default App;
