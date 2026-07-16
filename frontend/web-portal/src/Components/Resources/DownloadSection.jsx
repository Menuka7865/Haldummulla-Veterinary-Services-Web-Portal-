function DownloadSection({ downloads }) {
  return (
    <section style={{ margin: '40px 0' }}>
      <h2 style={sectionTitle}>Quick Download Resources</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
        {downloads.map(d => (
          <div key={d.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px' }}>📄</div>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', lineHeight: '1.4' }}>{d.title}</p>
            <button style={{ background: '#fff', border: '1px solid #0d9488', color: '#0d9488', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
              PDF Download
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

const sectionTitle = { fontSize: '20px', fontWeight: '600', marginBottom: '20px', borderLeft: '4px solid #0d9488', paddingLeft: '12px' };

export default DownloadSection;