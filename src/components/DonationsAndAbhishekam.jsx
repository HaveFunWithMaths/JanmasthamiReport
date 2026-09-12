import React, { useState, useMemo } from 'react';
import { Search, Flame, HeartHandshake, Coins, Sparkles, Filter } from 'lucide-react';

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

  // Extract unique seva types from Abhishekam data
  const sevaTypes = useMemo(() => {
    const set = new Set(abhishekamData.map(item => item.seva || 'Gotra Nama'));
    return Array.from(set);
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
    return combinedList.filter(item => {
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
  }, [combinedList, viewFilter, selectedSeva, searchQuery]);

  const filteredTotal = useMemo(() => {
    return filteredList.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredList]);

  return (
    <section id="donations-abhishekam-section">
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
          Donations & Abhishekam Sevas
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Consolidated record of all sacred Abhishekam sponsorships and general festival donations. Total Inflow: <strong>₹{totalInflow.toLocaleString('en-IN')}</strong> ({combinedList.length} offerings).
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

      {/* Search Toolbar */}
      <div className="search-filter-bar">
        <div className="search-input-wrapper">
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

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredList.length}</strong> records • Subtotal: <strong className="font-num" style={{ color: 'var(--gold-light)' }}>₹{filteredTotal.toLocaleString('en-IN')}</strong>
        </div>
      </div>

      {/* Combined Table */}
      <div className="table-container glass-card">
        <table className="data-table" id="inflow-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Devotee / Donor Name</th>
              <th>Type</th>
              <th>Seva / Offering Details</th>
              <th style={{ textAlign: 'right' }}>Amount (₹)</th>
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
