function LatestArticles({ articles }) {
  return (
    <section style={{ margin: '40px 0' }}>
      <h2 style={sectionTitle}>Latest Articles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
        {articles.map(a => (
          <div key={a.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={a.image} alt={a.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '16px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '15px', lineHeight: '1.4' }}>{a.title}</h4>
              <p style={{ fontSize: '13px', color: '#777', margin: '0 0 12px' }}>{a.excerpt}</p>
              <a href="#!" style={{ color: '#0d9488', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>Read More →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const sectionTitle = { fontSize: '20px', fontWeight: '600', marginBottom: '20px', borderLeft: '4px solid #0d9488', paddingLeft: '12px' };

export default LatestArticles;