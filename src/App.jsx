import { useState } from 'react';
import Home from './pages/Home';
import Supplements from './pages/Supplements';
import CheckIn from './pages/CheckIn';
import Calendar from './pages/Calendar';
import './App.css';

const titles = {
  home: '🐭 Mouse Supplements',
  supplements: '💊 Suplementos',
  checkin: '✅ Check-in',
  calendar: '📅 Calendário',
};

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="app">
      <header>
        {page !== 'home' && (
          <button className="back-btn" onClick={() => setPage('home')}>‹</button>
        )}
        <h1>{titles[page]}</h1>
      </header>
      <main>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'supplements' && <Supplements />}
        {page === 'checkin' && <CheckIn />}
        {page === 'calendar' && <Calendar />}
      </main>
    </div>
  );
}