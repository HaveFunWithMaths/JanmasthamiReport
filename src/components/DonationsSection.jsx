import React, { useState, useMemo } from 'react';
import { Search, HeartHandshake, Award, Coins } from 'lucide-react';

export default function DonationsSection({ donationsData, totalDonations }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return donationsData.filter(item => {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q);
    });
  }, [donationsData, searchQuery]);

  const filteredTotal = filteredData.reduce((acc, curr) => acc + curr.amount, 0);

  // Identify special entries
  const hundiEntry = donationsData.find(d => d.name.toLowerCase().includes('hundi'));
  const topDonors = [...donationsData]
    .filter(d => !d.name.toLowerCase().includes('hundi'))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  return (
    <section id="donations-section">
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
          General Festival Donations & Hundi
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Voluntary festival contributions and altar Hundi collections. Total General Donations: <strong>₹{totalDonations.toLocaleString('en-IN')}</strong> ({donationsData.length} records).
        </p>
      </div>

      {/* Highlights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        {/* Top Donors */}
        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--gold-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--gold-light)' }}>
            <Award size={18} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Major Contributors</h4>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {topDonors.map((d, i) => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                <span style={{ color: 'var(--text-main)' }}>{i + 1}. {d.name}</span>
                <strong className="font-num" style={{ color: 'var(--gold-light)' }}>₹{d.amount.toLocaleString('en-IN')}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Hundi Box Highlight */}
        {hundiEntry && (
          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--emerald-success)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--emerald-light)' }}>
              <Coins size={18} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Festival Altar Hundi</h4>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Anonymous cash offerings deposited directly into the Sri Radha Krishna festival collection box.
            </p>
            <div className="font-num" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--emerald-light)' }}>
              ₹{hundiEntry.amount.toLocaleString('en-IN')}
            </div>
          </div>
        )}
      </div>

      {/* Search Toolbar */}
      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            id="donation-search-input"
            className="search-input"
            placeholder="Search donor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredData.length}</strong> records • Subtotal: <strong className="font-num" style={{ color: 'var(--gold-light)' }}>₹{filteredTotal.toLocaleString('en-IN')}</strong>
        </div>
      </div>

      {/* Donations Table */}
      <div className="table-container glass-card">
        <table className="data-table" id="donations-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Donor Name / Reference</th>
              <th style={{ textAlign: 'right' }}>Amount (₹)</th>
              <th style={{ textAlign: 'center' }}>Type</th>
              <th style={{ textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  No donations found matching "{searchQuery}".
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => {
                const isHundi = item.name.toLowerCase().includes('hundi');
                return (
                  <tr key={item.id} id={`don-row-${item.id}`}>
                    <td style={{ color: 'var(--text-subtle)' }} className="font-num">{index + 1}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      {item.name}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }} className="font-num">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`pill ${isHundi ? 'pill-green' : 'pill-gold'}`}>
                        {isHundi ? 'Cash Hundi Box' : 'Direct Donation'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ color: 'var(--emerald-light)', fontSize: '0.8rem', fontWeight: 600 }}>
                        ✓ Received
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
