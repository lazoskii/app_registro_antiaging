import { useState, useEffect } from 'react';
import db from '../db/database';

export default function Supplements() {
  const [supplements, setSupplements] = useState([]);
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [notes, setNotes] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadSupplements();
  }, []);

  async function loadSupplements() {
    const all = await db.supplements.toArray();
    setSupplements(all);
  }

  async function saveSupplement() {
    if (!name.trim()) return;
    if (editingId !== null) {
      await db.supplements.update(editingId, { name, dose, notes });
      setEditingId(null);
    } else {
      await db.supplements.add({ name, dose, notes });
    }
    setName(''); setDose(''); setNotes('');
    loadSupplements();
  }

  function startEdit(s) {
    setEditingId(s.id);
    setName(s.name);
    setDose(s.dose || '');
    setNotes(s.notes || '');
  }

  function cancelEdit() {
    setEditingId(null);
    setName(''); setDose(''); setNotes('');
  }

  async function deleteSupplement(id) {
    await db.supplements.delete(id);
    loadSupplements();
  }

  return (
    <div className="page">
      <h2>{editingId ? 'Editar suplemento' : 'Suplementos'}</h2>
      <div className="form">
        <input placeholder="Nome do suplemento" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Dose (ex: 0.1mg)" value={dose} onChange={e => setDose(e.target.value)} />
        <input placeholder="Observações" value={notes} onChange={e => setNotes(e.target.value)} />
        <button onClick={saveSupplement}>{editingId ? 'Salvar alterações' : 'Adicionar'}</button>
        {editingId && <button className="cancel-btn" onClick={cancelEdit}>Cancelar</button>}
      </div>
      <ul>
        {supplements.map(s => (
          <li key={s.id}>
            <div>
              <strong>{s.name}</strong>
              {s.dose && <span> — {s.dose}</span>}
              {s.notes && <p>{s.notes}</p>}
            </div>
            <div className="actions">
              <button onClick={() => startEdit(s)}>✏️</button>
              <button onClick={() => deleteSupplement(s.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}