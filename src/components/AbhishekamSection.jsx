import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export default function AbhishekamSection({ abhishekamData, totalAbhishekam }) {
  const [selectedSeva, setSelectedSeva] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('amount_desc');

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
    const list = abhishekamData.filter(item => {
      const matchesSeva = selectedSeva === 'ALL' || item.seva === selectedSeva;
      const q = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(q) || item.seva.toLowerCase().includes(q);
      return matchesSeva && matchesSearch;
    });

    return list.sort((a, b) => {
      if (sortBy === 'amount_desc') return b.amount - a.amount || a.name.localeCompare(b.name);
      if (sortBy === 'amount_asc') return a.amount - b.amount || a.name.localeCompare(b.name);
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
      return b.amount - a.amount;
    });
  }, [abhishekamData, selectedSeva, searchQuery, sortBy]);

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

        {/* Sort Selector */}
        <div className="table-sort-control">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Sort:
          </span>
          <select 
            className="table-sort-select" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="abhishekam-sort-select"
            aria-label="Sort abhishekam table"
          >
            <option value="amount_desc">Amount (Highest First) ▼</option>
            <option value="amount_asc">Amount (Lowest First) ▲</option>
            <option value="name_asc">Devotee Name (A to Z)</option>
            <option value="name_desc">Devotee Name (Z to A)</option>
          </select>
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
              <th 
                className="sortable-th"
                onClick={() => setSortBy(prev => prev === 'name_asc' ? 'name_desc' : 'name_asc')}
                title="Click to sort by Devotee Name"
              >
                <div className="sort-th-content">
                  <span>Devotee Name</span>
                  {sortBy === 'name_asc' && <ArrowUp size={14} className="sort-icon-active" />}
                  {sortBy === 'name_desc' && <ArrowDown size={14} className="sort-icon-active" />}
                  {sortBy !== 'name_asc' && sortBy !== 'name_desc' && <ArrowUpDown size={14} className="sort-icon-idle" />}
                </div>
              </th>
              <th>Seva Category</th>
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
