import React, { useState, useMemo } from 'react';
import { Search, Flame, HeartHandshake, Coins, Sparkles, Filter, ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';

export default function DonationsAndAbhishekam({ 
  abhishekamData = [], 
  donationsData = [], 
  totalAbhishekam = 0, 
  totalDonations = 0,
  totalInflow = 0 
}) {
  // Tab filter: 'ALL' | 'ABHISHEKAM' | 'DONATIONS'
  const [viewFilter, setViewFilter] = useState('ALL');
  const [selectedSeva, setSelectedSeva] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sorting: 'amount_desc' (Default: Highest amount first) | 'amount_asc' | 'name_asc'
  const [sortBy, setSortBy] = useState('amount_desc');

  // Extract unique seva types from Abhishekam data, sorted by highest seva tier amount descending
  const sevaTypes = useMemo(() => {
    const stats = {};
    abhishekamData.forEach(item => {
      const s = item.seva || 'Gotra Nama';
      if (!stats[s]) stats[s] = { count: 0, maxAmount: 0 };
      stats[s].count += 1;
      if (item.amount > stats[s].maxAmount) stats[s].maxAmount = item.amount;
    });
    return Object.keys(stats).sort((a, b) => stats[b].maxAmount - stats[a].maxAmount);
  }, [abhishekamData]);

  // Combine datasets with clear discriminator
  const combinedList = useMemo(() => {
    const list = [];
    
    abhishekamData.forEach(item => {
      list.push({
        id: item.id,
        name: item.name,
        type: 'Abhishekam',
        category: item.seva || 'Gotra Nama',
        amount: item.amount,
        badgeClass: item.seva?.includes('Laddu Gopal') 
          ? 'pill-green' 
          : item.seva?.includes('Radha Krsna') 
            ? 'pill-purple' 
            : 'pill-gold'
      });
    });

    donationsData.forEach(item => {
      const isHundi = item.name.toLowerCase().includes('hundi');
      list.push({
        id: item.id,
        name: item.name,
        type: isHundi ? 'Hundi' : 'Donation',
        category: isHundi ? 'Festival Altar Hundi' : 'General Donation',
        amount: item.amount,
        badgeClass: isHundi ? 'pill-green' : 'pill-gold'
      });
    });

    return list;
  }, [abhishekamData, donationsData]);

  // Filter combined list based on active tab, sub-category, and search query
  const filteredList = useMemo(() => {
    const filtered = combinedList.filter(item => {
      // Main view filter
      if (viewFilter === 'ABHISHEKAM' && item.type !== 'Abhishekam') return false;
      if (viewFilter === 'DONATIONS' && item.type !== 'Donation' && item.type !== 'Hundi') return false;

      // Sub-filter for seva type if looking at Abhishekam or All
      if (selectedSeva !== 'ALL') {
        if (item.type === 'Abhishekam' && item.category !== selectedSeva) return false;
        if (item.type !== 'Abhishekam') return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesType = item.type.toLowerCase().includes(q);
        return matchesName || matchesCat || matchesType;
      }

      return true;
    });

    // Sort by requested order (default: descending by amount)
    return filtered.sort((a, b) => {
      if (sortBy === 'amount_desc') {
        return b.amount - a.amount || a.name.localeCompare(b.name);
      }
      if (sortBy === 'amount_asc') {
        return a.amount - b.amount || a.name.localeCompare(b.name);
      }
      if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name_desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === 'type_asc') {
        const c = a.type.localeCompare(b.type);
        return c !== 0 ? c : b.amount - a.amount;
      }
      if (sortBy === 'type_desc') {
        const c = b.type.localeCompare(a.type);
        return c !== 0 ? c : b.amount - a.amount;
      }
      if (sortBy === 'category_asc') {
        const c = a.category.localeCompare(b.category);
        return c !== 0 ? c : b.amount - a.amount;
      }
      if (sortBy === 'category_desc') {
        const c = b.category.localeCompare(a.category);
        return c !== 0 ? c : b.amount - a.amount;
      }
      if (sortBy === 'id_asc') {
        const idA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
        const idB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
        return idA - idB;
      }
      return b.amount - a.amount;
    });
  }, [combinedList, viewFilter, selectedSeva, searchQuery, sortBy]);

  const filteredTotal = useMemo(() => {
    return filteredList.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredList]);

  const handleHeaderSort = (field) => {
    if (field === 'amount') {
      setSortBy(prev => prev === 'amount_desc' ? 'amount_asc' : 'amount_desc');
    } else if (field === 'name') {
      setSortBy(prev => prev === 'name_asc' ? 'name_desc' : 'name_asc');
    } else if (field === 'type') {
      setSortBy(prev => prev === 'type_asc' ? 'type_desc' : 'type_asc');
    } else if (field === 'category') {
      setSortBy(prev => prev === 'category_asc' ? 'category_desc' : 'category_asc');
    } else if (field === 'id') {
      setSortBy(prev => prev === 'id_asc' ? 'amount_desc' : 'id_asc');
    }
  };

  return (
    <section id="donations-abhishekam-section">
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
          Donations & Abhishekam Sevas
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Consolidated record of all sacred Abhishekam sponsorships and general festival donations, arranged in descending order of offering amount. Total Inflow: <strong>₹{totalInflow.toLocaleString('en-IN')}</strong> ({combinedList.length} offerings).
        </p>
      </div>

      {/* 3 Quick Overview Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1rem', 
        marginBottom: '1.5rem' 
      }}>
        {/* Total Inflow */}
        <div className="glass-card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--gold-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Inflow</span>
            <Sparkles size={18} color="var(--gold-light)" />
          </div>
          <div className="font-num" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gold-light)', marginTop: '0.25rem' }}>
            ₹{totalInflow.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
            {combinedList.length} Total Offerings
          </span>
        </div>

        {/* Abhishekam Sevas */}
        <div className="glass-card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid #ec4899' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Abhishekam Sevas</span>
            <Flame size={18} color="#ec4899" />
          </div>
          <div className="font-num" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ec4899', marginTop: '0.25rem' }}>
            ₹{totalAbhishekam.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
            {abhishekamData.length} Devotee Sevas
          </span>
        </div>

        {/* General Donations */}
        <div className="glass-card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Donations & Hundi</span>
            <HeartHandshake size={18} color="#10b981" />
          </div>
          <div className="font-num" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#10b981', marginTop: '0.25rem' }}>
            ₹{totalDonations.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
            {donationsData.length} Records (incl. Altar Hundi)
          </span>
        </div>
      </div>

      {/* Primary Category Selector Pills */}
      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={() => { setViewFilter('ALL'); setSelectedSeva('ALL'); }}
          className={`btn btn-sm ${viewFilter === 'ALL' ? 'btn-gold' : 'btn-glass'}`}
          id="inflow-filter-all"
        >
          <span>All Contributions ({combinedList.length})</span>
        </button>

        <button
          onClick={() => { setViewFilter('ABHISHEKAM'); setSelectedSeva('ALL'); }}
          className={`btn btn-sm ${viewFilter === 'ABHISHEKAM' ? 'btn-gold' : 'btn-glass'}`}
          id="inflow-filter-abhishekam"
        >
          <Flame size={14} />
          <span>Abhishekam Sevas ({abhishekamData.length})</span>
        </button>

        <button
          onClick={() => { setViewFilter('DONATIONS'); setSelectedSeva('ALL'); }}
          className={`btn btn-sm ${viewFilter === 'DONATIONS' ? 'btn-gold' : 'btn-glass'}`}
          id="inflow-filter-donations"
        >
          <HeartHandshake size={14} />
          <span>Donations & Hundi ({donationsData.length})</span>
        </button>
      </div>

      {/* Sub-filters for Seva tiers if Abhishekam or All is active */}
      {viewFilter !== 'DONATIONS' && (
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          flexWrap: 'wrap', 
          marginBottom: '1.25rem',
          padding: '0.65rem 0.85rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-glass)'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.35rem' }}>
            <Filter size={13} /> Seva Tier:
          </span>

          <button
            onClick={() => setSelectedSeva('ALL')}
            className={`btn btn-sm ${selectedSeva === 'ALL' ? 'btn-gold' : 'btn-glass'}`}
            style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
          >
            All Tiers
          </button>

          {sevaTypes.map(seva => (
            <button
              key={seva}
              onClick={() => setSelectedSeva(seva)}
              className={`btn btn-sm ${selectedSeva === seva ? 'btn-gold' : 'btn-glass'}`}
              style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
            >
              {seva}
            </button>
          ))}
        </div>
      )}

      {/* Search Toolbar & Sort Controls */}
      <div className="search-filter-bar" style={{ flexWrap: 'wrap', gap: '0.85rem' }}>
        <div className="search-input-wrapper" style={{ flex: '1 1 280px' }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            id="inflow-search-input"
            className="search-input"
            placeholder="Search by devotee/donor name or seva category..."
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
            id="inflow-sort-select"
            aria-label="Sort inflow contributions table"
          >
            <option value="amount_desc">Amount (Highest First) ▼</option>
            <option value="amount_asc">Amount (Lowest First) ▲</option>
            <option value="name_asc">Devotee Name (A to Z)</option>
            <option value="name_desc">Devotee Name (Z to A)</option>
            <option value="type_asc">Offering Type (Abhishekam / Donation)</option>
            <option value="category_asc">Seva / Offering Name (A to Z)</option>
            <option value="id_asc">Default Order (# 1 to 87)</option>
          </select>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          Showing <strong>{filteredList.length}</strong> records • Subtotal: <strong className="font-num" style={{ color: 'var(--gold-light)' }}>₹{filteredTotal.toLocaleString('en-IN')}</strong>
        </div>
      </div>

      {/* Combined Table */}
      <div className="table-container glass-card">
        <table className="data-table" id="inflow-table">
          <thead>
            <tr>
              <th 
                style={{ width: '55px' }}
                className="sortable-th"
                onClick={() => handleHeaderSort('id')}
                title="Click to sort by serial number"
                role="columnheader"
                aria-sort={sortBy === 'id_asc' ? 'ascending' : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('id'); } }}
              >
                <div className="sort-th-content">
                  <span>#</span>
                  {sortBy === 'id_asc' ? (
                    <ArrowUp size={13} className="sort-icon-active" />
                  ) : (
                    <ArrowUpDown size={13} className="sort-icon-idle" />
                  )}
                </div>
              </th>
              <th 
                className="sortable-th"
                onClick={() => handleHeaderSort('name')}
                title="Click to sort by Devotee Name"
                role="columnheader"
                aria-sort={sortBy === 'name_asc' ? 'ascending' : sortBy === 'name_desc' ? 'descending' : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('name'); } }}
              >
                <div className="sort-th-content">
                  <span>Devotee / Donor Name</span>
                  {sortBy === 'name_asc' && <ArrowUp size={14} className="sort-icon-active" />}
                  {sortBy === 'name_desc' && <ArrowDown size={14} className="sort-icon-active" />}
                  {sortBy !== 'name_asc' && sortBy !== 'name_desc' && <ArrowUpDown size={14} className="sort-icon-idle" />}
                </div>
              </th>
              <th
                className="sortable-th"
                onClick={() => handleHeaderSort('type')}
                title="Click to sort by Offering Type"
                role="columnheader"
                aria-sort={sortBy === 'type_asc' ? 'ascending' : sortBy === 'type_desc' ? 'descending' : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('type'); } }}
              >
                <div className="sort-th-content">
                  <span>Type</span>
                  {sortBy === 'type_asc' && <ArrowUp size={14} className="sort-icon-active" />}
                  {sortBy === 'type_desc' && <ArrowDown size={14} className="sort-icon-active" />}
                  {sortBy !== 'type_asc' && sortBy !== 'type_desc' && <ArrowUpDown size={14} className="sort-icon-idle" />}
                </div>
              </th>
              <th
                className="sortable-th"
                onClick={() => handleHeaderSort('category')}
                title="Click to sort by Seva Offering Details"
                role="columnheader"
                aria-sort={sortBy === 'category_asc' ? 'ascending' : sortBy === 'category_desc' ? 'descending' : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('category'); } }}
              >
                <div className="sort-th-content">
                  <span>Seva / Offering Details</span>
                  {sortBy === 'category_asc' && <ArrowUp size={14} className="sort-icon-active" />}
                  {sortBy === 'category_desc' && <ArrowDown size={14} className="sort-icon-active" />}
                  {sortBy !== 'category_asc' && sortBy !== 'category_desc' && <ArrowUpDown size={14} className="sort-icon-idle" />}
                </div>
              </th>
              <th 
                style={{ textAlign: 'right' }}
                className="sortable-th"
                onClick={() => handleHeaderSort('amount')}
                title="Click to sort by Amount"
                role="columnheader"
                aria-sort={sortBy === 'amount_asc' ? 'ascending' : sortBy === 'amount_desc' ? 'descending' : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('amount'); } }}
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
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  No contributions found matching your search or filter.
                </td>
              </tr>
            ) : (
              filteredList.map((item, index) => (
                <tr key={item.id} id={`inflow-row-${item.id}`}>
                  <td style={{ color: 'var(--text-subtle)' }} className="font-num">{index + 1}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                    {item.name}
                  </td>
                  <td>
                    {item.type === 'Abhishekam' && (
                      <span className="pill pill-gold" style={{ fontSize: '0.75rem' }}>
                        <Flame size={12} color="#ec4899" />
                        <span>Abhishekam</span>
                      </span>
                    )}
                    {item.type === 'Donation' && (
                      <span className="pill pill-green" style={{ fontSize: '0.75rem' }}>
                        <HeartHandshake size={12} />
                        <span>Donation</span>
                      </span>
                    )}
                    {item.type === 'Hundi' && (
                      <span className="pill pill-purple" style={{ fontSize: '0.75rem' }}>
                        <Coins size={12} />
                        <span>Hundi Box</span>
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {item.category}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
