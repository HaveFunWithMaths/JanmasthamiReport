import React, { useState, useMemo } from 'react';
import { Search, HeartHandshake, Award, Coins, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export default function DonationsSection({ donationsData, totalDonations }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('amount_desc');

  const filteredData = useMemo(() => {
    const list = donationsData.filter(item => {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q);
    });

    return list.sort((a, b) => {
      if (sortBy === 'amount_desc') return b.amount - a.amount || a.name.localeCompare(b.name);
      if (sortBy === 'amount_asc') return a.amount - b.amount || a.name.localeCompare(b.name);
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
      return b.amount - a.amount;
    });
  }, [donationsData, searchQuery, sortBy]);

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

        {/* Sort Selector */}
        <div className="table-sort-control">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Sort:
          </span>
          <select 
            className="table-sort-select" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="donations-sort-select"
            aria-label="Sort donations table"
          >
            <option value="amount_desc">Amount (Highest First) ▼</option>
            <option value="amount_asc">Amount (Lowest First) ▲</option>
            <option value="name_asc">Donor Name (A to Z)</option>
            <option value="name_desc">Donor Name (Z to A)</option>
          </select>
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
              <th 
                className="sortable-th"
                onClick={() => setSortBy(prev => prev === 'name_asc' ? 'name_desc' : 'name_asc')}
                title="Click to sort by Donor Name"
              >
                <div className="sort-th-content">
                  <span>Donor Name / Reference</span>
                  {sortBy === 'name_asc' && <ArrowUp size={14} className="sort-icon-active" />}
                  {sortBy === 'name_desc' && <ArrowDown size={14} className="sort-icon-active" />}
                  {sortBy !== 'name_asc' && sortBy !== 'name_desc' && <ArrowUpDown size={14} className="sort-icon-idle" />}
                </div>
              </th>
              <th 
                style={{ textAlign: 'right' }}
                className="sortable-th"
                onClick={() => setSortBy(prev => prev === 'amount_desc' ? 'amount_asc' : 'amount_desc')}
                title="Click to sort by Amount"
              >
                <div className="sort-th-content right">
                  <span>Amount (₹)</span>
                  {sortBy === 'amount_desc' && <ArrowDown size={14} className="sort-icon-active" />}
                  {sortBy === 'amount_asc' && <ArrowUp size={14} className="sort-icon-active" />}
                  {sortBy !== 'amount_desc' && sortBy !== 'amount_asc' && <ArrowUpDown size={14} className="sort-icon-idle" />}
                </div>
              </th>
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
