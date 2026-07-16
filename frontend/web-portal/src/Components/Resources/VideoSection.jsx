function VideoSection({ videos }) {
  return (
    <section style={{ margin: '40px 0' }}>
      <h2 style={sectionTitle}>
        <span style={{ background: '#0d9488', width: '10px', height: '10px', borderRadius: '2px', display: 'inline-block', marginRight: '10px' }}></span>
        Learn Through Videos
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          {videos.map((v, i) => (
            <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < videos.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
              <div style={{ width: '40px', height: '30px', background: '#e5e7eb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>▶</div>
              <span style={{ flex: 1, fontSize: '14px' }}>{v.title}</span>
              <span style={{ fontSize: '13px', color: '#888', whiteSpace: 'nowrap' }}>{v.duration}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#f0fdfa', border: '1px solid #d1fae5', borderRadius: '12px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '48px' }}>🖥️</div>
          <button style={{ background: '#0d9488', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>Watch Videos</button>
        </div>
      </div>
    </section>
  );
}

const sectionTitle = { fontSize: '20px', fontWeight: '600', marginBottom: '20px', paddingLeft: '4px' };

export default VideoSection;