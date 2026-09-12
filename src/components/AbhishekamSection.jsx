import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Filter } from 'lucide-react';

export default function AbhishekamSection({ abhishekamData, totalAbhishekam }) {
  const [selectedSeva, setSelectedSeva] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Seva groups summary
  const sevaStats = useMemo(() => {
    const map = {};
    abhishekamData.forEach(item => {
      const s = item.seva || 'Gotra Nama';
      if (!map[s]) map[s] = { count: 0, total: 0 };
      map[s].count += 1;
      map[s].total += item.amount;
    });
    return map;
  }, [abhishekamData]);

  const sevaTypes = Object.keys(sevaStats);

  const filteredData = useMemo(() => {
    return abhishekamData.filter(item => {
      const matchesSeva = selectedSeva === 'ALL' || item.seva === selectedSeva;
      const q = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(q) || item.seva.toLowerCase().includes(q);
      return matchesSeva && matchesSearch;
    });
  }, [abhishekamData, selectedSeva, searchQuery]);

  const filteredTotal = filteredData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section id="abhishekam-section">
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
          Sacred Abhishekam Sevas
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Lord Sri Krishna & Radha Rani Abhishekam Seva offerings by devoted families. Total Sevas: <strong>₹{totalAbhishekam.toLocaleString('en-IN')}</strong> ({abhishekamData.length} devotees).
        </p>
      </div>

      {/* Seva Tier Quick Pills */}
      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setSelectedSeva('ALL')}
          className={`btn btn-sm ${selectedSeva === 'ALL' ? 'btn-gold' : 'btn-glass'}`}
          id="seva-filter-all"
        >
          <span>All Sevas ({abhishekamData.length})</span>
        </button>

        {sevaTypes.map(seva => {
          const stats = sevaStats[seva];
          const isSelected = selectedSeva === seva;
          return (
            <button
              key={seva}
              onClick={() => setSelectedSeva(seva)}
              className={`btn btn-sm ${isSelected ? 'btn-gold' : 'btn-glass'}`}
              id={`seva-filter-${seva.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span>{seva}</span>
              <span className="pill pill-gold font-num" style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem' }}>
                ₹{stats.total.toLocaleString('en-IN')} ({stats.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Toolbar */}
      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            id="abhishekam-search-input"
            className="search-input"
            placeholder="Search devotee name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredData.length}</strong> devotees • Subtotal: <strong className="font-num" style={{ color: 'var(--gold-light)' }}>₹{filteredTotal.toLocaleString('en-IN')}</strong>
        </div>
      </div>

      {/* Abhishekam Table */}
      <div className="table-container glass-card">
        <table className="data-table" id="abhishekam-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Devotee Name</th>
              <th>Seva Category</th>
              <th style={{ textAlign: 'right' }}>Amount (₹)</th>
              <th style={{ textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  No devotees found matching "{searchQuery}".
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => {
                let badgeClass = 'pill-gold';
                if (item.seva.includes('Laddu Gopal')) badgeClass = 'pill-green';
                if (item.seva.includes('Radha Krsna')) badgeClass = 'pill-purple';

                return (
                  <tr key={item.id} id={`abh-row-${item.id}`}>
                    <td style={{ color: 'var(--text-subtle)' }} className="font-num">{index + 1}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      {item.name}
                    </td>
                    <td>
                      <span className={`pill ${badgeClass}`}>
                        <Flame size={12} />
                        <span>{item.seva}</span>
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }} className="font-num">
                      ₹{item.amount.toLocaleString('en-IN')}
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
