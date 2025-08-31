
import { useEffect, useState } from 'react';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/schools');
      const data = await res.json();
      setSchools(Array.isArray(data) ? data : []);
    })();
  }, []);

  return (
    <div className="container">
      <h1>Schools</h1>
      <div className="grid">
        {schools.map((s) => (
          <div key={s.id} className="card">
            <img className="img" src={s.image || '/schoolImages/placeholder.jpg'} alt={s.name} />
            <div className="title">{s.name}</div>
            <div className="sub">{s.address}</div>
            <div className="sub">{s.city}</div>
          </div>
        ))}
        {schools.length === 0 && (
          <p className="note">No schools yet. Add one from the <a href="/addSchool">Add School</a> page.</p>
        )}
      </div>
    </div>
  );
}
