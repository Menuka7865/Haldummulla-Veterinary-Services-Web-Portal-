function HeroSection() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)', padding: '60px 40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '38px', color: '#134e4a', margin: '0 0 12px' }}>Educational Resources</h1>
        <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.7', marginBottom: '28px' }}>
          Access guides, articles, videos, and veterinary information to improve animal health, livestock management, and farm productivity.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search resources..."
            style={{ padding: '10px 16px', border: '1px solid #ccc', borderRadius: '8px', width: '260px', fontSize: '14px' }}
          />
          <select style={{ padding: '10px 14px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px', background: '#fff' }}>
            <option>All Categories</option>
            <option>Dairy Farming</option>
            <option>Livestock Management</option>
            <option>Vaccination & Prevention</option>
            <option>Animal Health</option>
          </select>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=420&h=260&fit=crop"
        alt="Farm animals"
        style={{ borderRadius: '12px', width: '380px', objectFit: 'cover' }}
      />
    </div>
  );
}

export default HeroSection;