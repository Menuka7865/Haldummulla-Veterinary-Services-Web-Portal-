function ResourceCategories({ categories }) {
  return (
    <section style={{ margin: '40px 0' }}>
      <h2 style={sectionTitle}>Resource Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
        {categories.map(cat => (
          <div key={cat.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
              🐄
            </div>
            <div>
              <h4 style={{ margin: '0 0 10px', color: cat.iconColor, fontSize: '15px' }}>{cat.title}</h4>
              {cat.items.map(item => (
                <p key={item} style={{ margin: '4px 0', fontSize: '13px', color: '#555', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#0d9488' }}>✓</span> {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const sectionTitle = { fontSize: '20px', fontWeight: '600', marginBottom: '20px', borderLeft: '4px solid #0d9488', paddingLeft: '12px' };

export default ResourceCategories;