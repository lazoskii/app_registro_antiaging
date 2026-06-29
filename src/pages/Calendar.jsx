import { useState, useEffect } from 'react';
import db from '../db/database';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [logsMap, setLogsMap] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayDetail, setDayDetail] = useState([]);

  useEffect(() => {
    loadMonthLogs();
  }, [currentDate]);

  async function loadMonthLogs() {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const prefix = `${year}-${month}`;
    const logs = await db.logs.filter(l => l.date.startsWith(prefix)).toArray();
    const map = {};
    logs.forEach(l => {
      if (!map[l.date]) map[l.date] = 0;
      map[l.date]++;
    });
    setLogsMap(map);
  }

  async function selectDay(dateStr) {
    setSelectedDay(dateStr);
    const logs = await db.logs.where('date').equals(dateStr).toArray();
    const supplements = await db.supplements.toArray();
    const detail = logs.map(l => supplements.find(s => s.id === l.supplementId)).filter(Boolean);
    setDayDetail(detail);
  }

  function getDaysInMonth() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDay; i++) days.push(null);
    const total = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= total; d++) days.push(d);
    return days;
  }

  function changeMonth(dir) {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
    setSelectedDay(null);
  }

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const monthName = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="page">
      <h2>Calendário</h2>
      <div className="month-nav">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <span>{monthName}</span>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>
      <div className="calendar-grid">
        {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d => <div key={d} className="day-label">{d}</div>)}
        {getDaysInMonth().map((day, i) => {
          const dateStr = day ? `${year}-${month}-${String(day).padStart(2, '0')}` : null;
          const hasLog = dateStr && logsMap[dateStr];
          return (
            <div
              key={i}
              className={`day-cell ${hasLog ? 'has-log' : ''} ${selectedDay === dateStr ? 'selected' : ''} ${!day ? 'empty' : ''}`}
              onClick={() => day && selectDay(dateStr)}
            >
              {day}
            </div>
          );
        })}
      </div>
      {selectedDay && (
        <div className="day-detail">
          <h3>{selectedDay}</h3>
          {dayDetail.length === 0
            ? <p>Nenhum suplemento registrado.</p>
            : <ul>{dayDetail.map(s => <li key={s.id}>✅ {s.name} {s.dose && `— ${s.dose}`}</li>)}</ul>
          }
        </div>
      )}
    </div>
  );
}