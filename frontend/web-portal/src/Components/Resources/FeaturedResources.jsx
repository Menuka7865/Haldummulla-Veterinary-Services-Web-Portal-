function FeaturedResources({ items }) {
  return (
    <section style={{ margin: '40px 0' }}>
      <h2 style={sectionTitle}>Featured Resources</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
        {items.map(item => (
          <div key={item.id} style={card}>
            <span style={{ fontSize: '32px' }}>{item.icon}</span>
            <h3 style={{ color: '#0d9488', margin: '12px 0 8px', fontSize: '17px' }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', flex: 1 }}>{item.description}</p>
            <button style={btn}>{item.buttonLabel}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

const sectionTitle = { fontSize: '20px', fontWeight: '600', marginBottom: '20px', borderLeft: '4px solid #0d9488', paddingLeft: '12px' };
const card = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '4px' };
const btn = { marginTop: '16px', background: '#0d9488', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', alignSelf: 'flex-start' };

export default FeaturedResources;