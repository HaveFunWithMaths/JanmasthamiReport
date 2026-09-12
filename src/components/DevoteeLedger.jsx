import React, { useState, useMemo } from 'react';
import { Users, ChevronDown, ChevronUp, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export default function DevoteeLedger({ expenses, totalExpenses }) {
  const [expandedDevotee, setExpandedDevotee] = useState(null);
  const [devoteeSort, setDevoteeSort] = useState('total_desc');
  const [innerSort, setInnerSort] = useState({ field: 'amount', asc: false });

  // Group expenses by devotee
  const devoteeSummary = useMemo(() => {
    const groups = {};
    expenses.forEach(item => {
      const dev = item.devotee || 'Unknown Devotee';
      if (!groups[dev]) {
        groups[dev] = {
          name: dev,
          items: [],
          total: 0
        };
      }
      groups[dev].items.push(item);
      groups[dev].total += item.amount;
    });

    const list = Object.values(groups);
    return list.sort((a, b) => {
      if (devoteeSort === 'total_desc') return b.total - a.total;
      if (devoteeSort === 'total_asc') return a.total - b.total;
      if (devoteeSort === 'name_asc') return a.name.localeCompare(b.name);
      if (devoteeSort === 'items_desc') return b.items.length - a.items.length || b.total - a.total;
      return b.total - a.total;
    });
  }, [expenses, devoteeSort]);

  const toggleExpand = (name) => {
    setExpandedDevotee(expandedDevotee === name ? null : name);
  };

  const handleInnerSort = (field) => {
    setInnerSort(prev => {
      if (prev.field === field) {
        return { field, asc: !prev.asc };
      }
      return { field, asc: field === 'amount' ? false : true };
    });
  };

  return (
    <section id="devotee-ledger-section">
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
            Devotee Expenditure & Reimbursement Ledger
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Summary of out-of-pocket expenses and trust expenditures incurred by festival coordinators. Grand Total: <strong>₹{totalExpenses.toLocaleString('en-IN')}</strong> across {devoteeSummary.length} sevaks and trusts.
          </p>
        </div>

        {/* Devotee Sort Control */}
        <div className="table-sort-control">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Sort Devotees:
          </span>
          <select
            className="table-sort-select"
            value={devoteeSort}
            onChange={(e) => setDevoteeSort(e.target.value)}
            id="devotee-sort-select"
            aria-label="Sort devotees"
          >
            <option value="total_desc">Total Amount (Highest First) ▼</option>
            <option value="total_asc">Total Amount (Lowest First) ▲</option>
            <option value="name_asc">Devotee Name (A to Z)</option>
            <option value="items_desc">Number of Items Handled</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '0.85rem' }}>
        {devoteeSummary.map(dev => {
          const isExpanded = expandedDevotee === dev.name;
          const pct = ((dev.total / totalExpenses) * 100).toFixed(1);

          const sortedItems = [...dev.items].sort((a, b) => {
            if (innerSort.field === 'amount') {
              return innerSort.asc ? a.amount - b.amount : b.amount - a.amount;
            }
            if (innerSort.field === 'title') {
              return innerSort.asc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            }
            if (innerSort.field === 'category') {
              return innerSort.asc ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
            }
            return 0;
          });

          return (
            <div 
              key={dev.name} 
              className="glass-card" 
              style={{ padding: '1.15rem 1.4rem', transition: 'all 0.2s ease' }}
            >
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
                onClick={() => toggleExpand(dev.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpand(dev.name); } }}
                aria-expanded={isExpanded}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: 'var(--gold-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {dev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {dev.name}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {dev.items.length} {dev.items.length === 1 ? 'item' : 'items'} sponsored/managed ({pct}% of expenses)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div className="font-num" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                      ₹{dev.total.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <button 
                    className="btn btn-glass btn-sm" 
                    style={{ padding: '0.35rem' }}
                    aria-label={isExpanded ? "Collapse ledger items" : "Expand ledger items"}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-glass)', paddingTop: '0.85rem' }}>
                  <table className="data-table" style={{ fontSize: '0.85rem' }}>
                    <thead>
                      <tr>
                        <th 
                          className="sortable-th" 
                          onClick={() => handleInnerSort('title')}
                          title="Click to sort by Item Description"
                        >
                          <div className="sort-th-content">
                            <span>Item Description</span>
                            {innerSort.field === 'title' ? (
                              innerSort.asc ? <ArrowUp size={13} className="sort-icon-active" /> : <ArrowDown size={13} className="sort-icon-active" />
                            ) : (
                              <ArrowUpDown size={13} className="sort-icon-idle" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="sortable-th" 
                          onClick={() => handleInnerSort('category')}
                          title="Click to sort by Category"
                        >
                          <div className="sort-th-content">
                            <span>Category</span>
                            {innerSort.field === 'category' ? (
                              innerSort.asc ? <ArrowUp size={13} className="sort-icon-active" /> : <ArrowDown size={13} className="sort-icon-active" />
                            ) : (
                              <ArrowUpDown size={13} className="sort-icon-idle" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="sortable-th" 
                          style={{ textAlign: 'right' }} 
                          onClick={() => handleInnerSort('amount')}
                          title="Click to sort by Amount"
                        >
                          <div className="sort-th-content right">
                            <span>Amount (₹)</span>
                            {innerSort.field === 'amount' ? (
                              innerSort.asc ? <ArrowUp size={13} className="sort-icon-active" /> : <ArrowDown size={13} className="sort-icon-active" />
                            ) : (
                              <ArrowUpDown size={13} className="sort-icon-idle" />
                            )}
                          </div>
                        </th>
                        <th>Remarks / Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedItems.map(item => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 500 }}>{item.title}</td>
                          <td>
                            <span className="pill pill-gold" style={{ fontSize: '0.72rem' }}>
                              {item.category}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: 700 }} className="font-num">
                            ₹{item.amount.toLocaleString('en-IN')}
                          </td>
                          <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            {item.comments || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
