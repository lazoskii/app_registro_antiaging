import { useState } from 'react';
import Navbar from './components/Navbar';
import Supplements from './pages/Supplements';
import CheckIn from './pages/CheckIn';
import Calendar from './pages/Calendar';
import './App.css';

export default function App() {
  const [page, setPage] = useState('checkin');

  return (
    <div className="app">
      <header>
        <h1>🐭 Mouse Supplements</h1>
      </header>
      <main>
        {page === 'supplements' && <Supplements />}
        {page === 'checkin' && <CheckIn />}
        {page === 'calendar' && <Calendar />}
      </main>
      <Navbar page={page} setPage={setPage} />
    </div>
  );
}