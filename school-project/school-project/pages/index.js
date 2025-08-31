
import Link from 'next/link';

export default function Home() {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>School Directory</h1>
      <div style={styles.links}>
        <Link href="/addSchool" style={styles.linkBtn}>Add School</Link>
        <Link href="/showSchools" style={styles.linkBtn}>Show Schools</Link>
      </div>
      <p style={styles.note}>
        Tip: run the SQL in <code>schema.sql</code> to create the table.
      </p>
    </main>
  );
}

const styles = {
  main: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', padding: 20, fontFamily: 'system-ui, Arial' },
  h1: { fontSize: 36, marginBottom: 20 },
  links: { display: 'flex', gap: 16 },
  linkBtn: { padding: '12px 18px', background: '#111827', color: 'white', borderRadius: 10, textDecoration: 'none' },
  note: { marginTop: 16, color: '#555' }
};
