import { useState, useEffect } from 'react';
import db from '../db/database';

export default function Home({ setPage }) {
  const [totalSupplements, setTotalSupplements] = useState(0);
  const [takenToday, setTakenToday] = useState(0);
  const today = new Date().toISOString().split('T')[0];
  const monthName = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const total = await db.supplements.count();
    setTotalSupplements(total);
    const logs = await db.logs.where('date').equals(today).count();
    setTakenToday(logs);
  }

  const pct = totalSupplements > 0 ? Math.round(takenToday / totalSupplements * 100) : 0;

  return (
    <div className="page home">
      <h2>Olá! 🐭</h2>
      <p className="home-date">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>

      <div className="widgets">
        <div className="widget" onClick={() => setPage('checkin')}>
          <div className="widget-icon">✅</div>
          <div className="widget-info">
            <span className="widget-title">Check-in de hoje</span>
            <span className="widget-value">{takenToday}/{totalSupplements} suplementos</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <span className="widget-arrow">›</span>
        </div>

        <div className="widget" onClick={() => setPage('calendar')}>
          <div className="widget-icon">📅</div>
          <div className="widget-info">
            <span className="widget-title">Calendário</span>
            <span className="widget-value" style={{textTransform: 'capitalize'}}>{monthName}</span>
          </div>
          <span className="widget-arrow">›</span>
        </div>

        <div className="widget" onClick={() => setPage('supplements')}>
          <div className="widget-icon">💊</div>
          <div className="widget-info">
            <span className="widget-title">Suplementos</span>
            <span className="widget-value">{totalSupplements} cadastrados</span>
          </div>
          <span className="widget-arrow">›</span>
        </div>
      </div>
    </div>
  );
}