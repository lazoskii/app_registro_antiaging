import { useState, useEffect } from 'react';
import db from '../db/database';

export default function CheckIn() {
  const [supplements, setSupplements] = useState([]);
  const [logs, setLogs] = useState({});
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const all = await db.supplements.toArray();
    setSupplements(all);
    const todayLogs = await db.logs.where('date').equals(today).toArray();
    const map = {};
    todayLogs.forEach(l => map[l.supplementId] = l);
    setLogs(map);
  }

  async function toggle(supplement) {
    const existing = logs[supplement.id];
    if (existing) {
      await db.logs.delete(existing.id);
    } else {
      await db.logs.add({ date: today, supplementId: supplement.id, taken: true });
    }
    loadData();
  }

  return (
    <div className="page">
      <h2>Check-in de hoje</h2>
      <p className="date">{today}</p>
      {supplements.length === 0 && <p>Nenhum suplemento cadastrado ainda.</p>}
      <ul>
        {supplements.map(s => (
          <li key={s.id} className={logs[s.id] ? 'checked' : ''} onClick={() => toggle(s)}>
            <span>{logs[s.id] ? '✅' : '⬜'} {s.name}</span>
            {s.dose && <span className="dose">{s.dose}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}