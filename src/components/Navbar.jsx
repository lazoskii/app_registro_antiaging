export default function Navbar({ page, setPage }) {
  if (page === 'home') return null;

  return (
    <nav className="back-nav">
      <button onClick={() => setPage('home')}>‹ Voltar</button>
    </nav>
  );
}