import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Supplements from './pages/Supplements';
import CheckIn from './pages/CheckIn';
import Calendar from './pages/Calendar';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="app">
      <header>
        <h1>🐭 Mouse Supplements</h1>
      </header>
      <main>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'supplements' && <Supplements />}
        {page === 'checkin' && <CheckIn />}
        {page === 'calendar' && <Calendar />}
      </main>
      <Navbar page={page} setPage={setPage} />
    </div>
  );
}