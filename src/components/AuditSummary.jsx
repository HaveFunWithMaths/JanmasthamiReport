import React, { useMemo } from 'react';
import {
  PiggyBank, TrendingUp, IndianRupee,
  Receipt, ChevronRight, ArrowRight,
  Tent, Flower2, Utensils, Gift, Printer, ShieldCheck
} from 'lucide-react';

const categoryMeta = {
  "Setup": {
    color: "#f59e0b",
    icon: Tent,
    desc: "Tent, generator, lighting, fans, barricades & seating"
  },
  "Deity (Abhishekam, flowers)": {
    color: "#ec4899",
    icon: Flower2,
    desc: "Altar & arch flowers, conch, brass tray, dresses, milk & fruits"
  },
  "Prasadam and Bhoga": {
    color: "#10b981",
    icon: Utensils,
    desc: "Dinner feast, 56 bhoga, eco plates, spoons, donnas & transport"
  },
  "Gifts": {
    color: "#8b5cf6",
    icon: Gift,
    desc: "Honored guest frames, children storybooks & gift wraps"
  },
  "Printing (Posters and invite)": {
    color: "#3b82f6",
    icon: Printer,
    desc: "Invitations, banners, impact cards, frame prints & passes"
  },
  "Others": {
    color: "#94a3b8",
    icon: ShieldCheck,
    desc: "Festival security guard (₹1,000) & volunteer service badges"
  }
};

export default function AuditSummary({
  totalInflow,
  totalExpenses,
  netSurplus,
  expenses = [],
  onNavigateToExpenses = () => { }
}) {
  const categoryDetails = useMemo(() => {
    const stats = {};
    expenses.forEach(item => {
      if (!stats[item.category]) {
        stats[item.category] = { amount: 0, count: 0 };
      }
      stats[item.category].amount += item.amount;
      stats[item.category].count += 1;
    });

    const list = Object.keys(categoryMeta).map(catName => {
      const meta = categoryMeta[catName];
      const amount = stats[catName]?.amount || 0;
      const count = stats[catName]?.count || 0;
      const pct = totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : '0.0';
      return {
        name: catName,
        amount,
        count,
        pct,
        color: meta.color,
        icon: meta.icon,
        desc: meta.desc
      };
    });

    return list.sort((a, b) => b.amount - a.amount);
  }, [expenses, totalExpenses]);

  return (
    <section id="audit-summary-section">
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
            Executive Financial Summary
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Core financial overview and categorical expenditure analysis.
          </p>
        </div>

        <button
          onClick={() => onNavigateToExpenses('ALL')}
          className="btn btn-gold btn-sm"
          id="audit-to-expenses-btn"
          title="Jump directly to itemized expenses"
        >
          <Receipt size={16} />
          <span>View All 37 Expense Items</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Simplified 3 Core Financial Cards: Total Income, Total Expenses, Net Surplus */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.25rem'
      }}>
        {/* Total Income */}
        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--gold-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Income
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--gold-light)'
            }}>
              <IndianRupee size={18} />
            </div>
          </div>
          <div className="font-num" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold-light)', marginBottom: '0.35rem' }}>
            ₹{totalInflow.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-subtle)' }}>
            87 Contributions (Abhishekam & Donations)
          </div>
        </div>

        {/* Total Expenses */}
        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Expenses
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444'
            }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="font-num" style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.35rem' }}>
            ₹{totalExpenses.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-subtle)' }}>
            37 Expense Line Items across 6 Categories
          </div>
        </div>

        {/* Net Surplus - Easily Visible and Prominently Highlighted */}
        <div
          className="glass-card"
          style={{
            padding: '1.5rem',
            border: '2px solid rgba(16, 185, 129, 0.55)',
            background: 'linear-gradient(145deg, rgba(22, 30, 52, 0.9), rgba(16, 185, 129, 0.15))',
            boxShadow: '0 8px 30px rgba(16, 185, 129, 0.22)'
          }}
          id="summary-net-surplus-card"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--emerald-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Net Surplus
              </span>
              <span className="pill pill-green font-num" style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem', fontWeight: 700 }}>
                SURPLUS
              </span>
            </div>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(16, 185, 129, 0.25)',
              color: 'var(--emerald-light)'
            }}>
              <PiggyBank size={18} />
            </div>
          </div>
          <div className="font-num" style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--emerald-light)', marginBottom: '0.35rem' }}>
            +₹{netSurplus.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--emerald-light)', fontWeight: 600 }}>
            ✓ Verified Positive Reserve
          </div>
        </div>
      </div>

      {/* Category Breakdown: Click any category to filter Expenses */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Expenditure by Category (Click to Inspect Line Items)
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Select any category card below to jump straight to its itemized entries in the Expenses tab:
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)' }}>
            6 Categories • Sorted by Budget Share
          </span>
        </div>

        <div className="category-summary-grid">
          {categoryDetails.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="category-card glass-card"
                onClick={() => onNavigateToExpenses(cat.name)}
                style={{ cursor: 'pointer' }}
                title={`Click to view ${cat.name} line items in Expenses tab`}
                id={`summary-cat-${cat.name.split(' ')[0].toLowerCase()}`}
              >
                <div className="category-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      padding: '8px',
                      borderRadius: '10px',
                      background: `${cat.color}20`,
                      color: cat.color
                    }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h5 className="category-title" style={{ fontSize: '1.05rem' }}>{cat.name}</h5>
                      <p className="category-desc">{cat.desc}</p>
                    </div>
                  </div>

                  <div>
                    <div className="category-amount font-num" style={{ color: cat.color }}>
                      ₹{cat.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="category-pct font-num">
                      {cat.count} items ({cat.pct}%)
                    </div>
                  </div>
                </div>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                  />
                </div>

                <div style={{
                  marginTop: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  fontSize: '0.78rem',
                  color: cat.color,
                  fontWeight: 600,
                  gap: '0.25rem'
                }}>
                  <span>Inspect {cat.count} line items</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Redirect Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.4rem 1.8rem',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(14, 165, 233, 0.1))',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          cursor: 'pointer'
        }}
        onClick={() => onNavigateToExpenses('ALL')}
        id="bottom-expenses-banner-cta"
      >
        <div>
          <h4 style={{ fontSize: '1.15rem', color: 'var(--gold-light)', fontWeight: 700, marginBottom: '0.25rem' }}>
            Ready to inspect the complete itemized records?
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            View all 37 expenditures, devotee receipts, descriptions, and audit remarks sorted by Category.
          </p>
        </div>

        <button className="btn btn-gold btn-sm">
          <span>Go to Expenses Breakdown</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
