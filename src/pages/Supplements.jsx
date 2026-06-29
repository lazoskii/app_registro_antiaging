import { useState, useEffect } from 'react';
import db from '../db/database';

export default function Supplements() {
  const [supplements, setSupplements] = useState([]);
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadSupplements();
  }, []);

  async function loadSupplements() {
    const all = await db.supplements.toArray();
    setSupplements(all);
  }

  async function addSupplement() {
    if (!name.trim()) return;
    await db.supplements.add({ name, dose, notes });
    setName(''); setDose(''); setNotes('');
    loadSupplements();
  }

  async function deleteSupplement(id) {
    await db.supplements.delete(id);
    loadSupplements();
  }

  return (
    <div className="page">
      <h2>Suplementos</h2>
      <div className="form">
        <input placeholder="Nome do suplemento" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Dose (ex: 0.1mg)" value={dose} onChange={e => setDose(e.target.value)} />
        <input placeholder="Observações" value={notes} onChange={e => setNotes(e.target.value)} />
        <button onClick={addSupplement}>Adicionar</button>
      </div>
      <ul>
        {supplements.map(s => (
          <li key={s.id}>
            <div>
              <strong>{s.name}</strong>
              {s.dose && <span> — {s.dose}</span>}
              {s.notes && <p>{s.notes}</p>}
            </div>
            <button onClick={() => deleteSupplement(s.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}