import React, { useState, useMemo } from 'react';
import { Users, ChevronDown, ChevronUp, FileText, CheckCircle } from 'lucide-react';

export default function DevoteeLedger({ expenses, totalExpenses }) {
  const [expandedDevotee, setExpandedDevotee] = useState(null);

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

    return Object.values(groups).sort((a, b) => b.total - a.total);
  }, [expenses]);

  const toggleExpand = (name) => {
    setExpandedDevotee(expandedDevotee === name ? null : name);
  };

  return (
    <section id="devotee-ledger-section">
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
          Devotee Expenditure & Reimbursement Ledger
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Summary of out-of-pocket expenses and trust expenditures incurred by festival coordinators. Grand Total: <strong>₹{totalExpenses.toLocaleString('en-IN')}</strong> across {devoteeSummary.length} sevaks and trusts.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '0.85rem' }}>
        {devoteeSummary.map(dev => {
          const isExpanded = expandedDevotee === dev.name;
          const pct = ((dev.total / totalExpenses) * 100).toFixed(1);

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
                  <button className="btn btn-glass btn-sm" style={{ padding: '0.35rem' }}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-glass)', paddingTop: '0.85rem' }}>
                  <table className="data-table" style={{ fontSize: '0.85rem' }}>
                    <thead>
                      <tr>
                        <th>Item Description</th>
                        <th>Category</th>
                        <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                        <th>Remarks / Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dev.items.map(item => (
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
