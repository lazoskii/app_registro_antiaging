export default function Navbar({ page, setPage }) {
  return (
    <nav>
      <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>🏠 Início</button>
      <button className={page === 'supplements' ? 'active' : ''} onClick={() => setPage('supplements')}>💊 Suplementos</button>
      <button className={page === 'checkin' ? 'active' : ''} onClick={() => setPage('checkin')}>✅ Check-in</button>
      <button className={page === 'calendar' ? 'active' : ''} onClick={() => setPage('calendar')}>📅 Calendário</button>
    </nav>
  );
}