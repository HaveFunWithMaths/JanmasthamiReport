import React from 'react';
import { 
  CheckCircle2, AlertCircle, PieChart, ShieldCheck, Heart, 
  Sparkles, Award, Utensils, Tent, Flower2, Gift, Printer, 
  ArrowRight, ArrowUpRight, Receipt, ChevronRight
} from 'lucide-react';

const categoryDetails = [
  {
    name: "Setup (Generator)",
    amount: 46155,
    count: 6,
    pct: 43.4,
    color: "#f59e0b",
    icon: Tent,
    desc: "Tent, generator, lighting, fans, barricades & seating"
  },
  {
    name: "Deity (Abhishekam, flowers)",
    amount: 23192,
    count: 11,
    pct: 21.8,
    color: "#ec4899",
    icon: Flower2,
    desc: "Altar & arch flowers, conch, brass tray, dresses, milk & fruits"
  },
  {
    name: "Prasadam and Bhoga",
    amount: 17100,
    count: 7,
    pct: 16.1,
    color: "#10b981",
    icon: Utensils,
    desc: "Dinner feast, 56 bhoga, eco plates, spoons, donnas & transport"
  },
  {
    name: "Gifts",
    amount: 11569,
    count: 4,
    pct: 10.9,
    color: "#8b5cf6",
    icon: Gift,
    desc: "Honored guest frames, children storybooks & gift wraps"
  },
  {
    name: "Printing (Posters and invite)",
    amount: 6740,
    count: 7,
    pct: 6.3,
    color: "#3b82f6",
    icon: Printer,
    desc: "Invitations, banners, impact cards, frame prints & passes"
  },
  {
    name: "Others",
    amount: 1544,
    count: 2,
    pct: 1.5,
    color: "#94a3b8",
    icon: ShieldCheck,
    desc: "Festival security guard (₹1,000) & volunteer service badges"
  }
];

export default function AuditSummary({ 
  totalInflow, 
  totalExpenses, 
  netSurplus, 
  totalAbhishekam, 
  totalDonations,
  onNavigateToExpenses = () => {} 
}) {
  const surplusPct = ((netSurplus / totalInflow) * 100).toFixed(1);
  const abhishekamInflowPct = ((totalAbhishekam / totalInflow) * 100).toFixed(1);
  const donationsInflowPct = ((totalDonations / totalInflow) * 100).toFixed(1);

  return (
    <section id="audit-summary-section">
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
            Executive Financial Audit & Seva Insights
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Complete balance sheet overview, percentage distributions, and direct navigation to detailed ledgers.
          </p>
        </div>

        {/* Intuitive Quick Navigation Button to Expenses */}
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

      <div className="kpi-grid" style={{ marginBottom: '2rem' }}>
        {/* Core Financial Ratios */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--gold-light)' }}>
            <PieChart size={20} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Inflow Composition</h4>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
              <span>Abhishekam Sevas (66 Donors)</span>
              <strong className="font-num" style={{ color: '#ec4899' }}>{abhishekamInflowPct}% (₹{totalAbhishekam.toLocaleString('en-IN')})</strong>
            </div>
            <div className="progress-bar-bg" style={{ marginTop: 0 }}>
              <div className="progress-bar-fill" style={{ width: `${abhishekamInflowPct}%`, backgroundColor: '#ec4899' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
              <span>General Donations & Hundi (21 Donors)</span>
              <strong className="font-num" style={{ color: '#10b981' }}>{donationsInflowPct}% (₹{totalDonations.toLocaleString('en-IN')})</strong>
            </div>
            <div className="progress-bar-bg" style={{ marginTop: 0 }}>
              <div className="progress-bar-fill" style={{ width: `${donationsInflowPct}%`, backgroundColor: '#10b981' }} />
            </div>
          </div>
        </div>

        {/* Operating Balance */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--emerald-light)' }}>
            <CheckCircle2 size={20} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Budgetary Health</h4>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: '1px solid var(--border-glass)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Gross Receipts Collected:</span>
            <strong className="font-num">₹{totalInflow.toLocaleString('en-IN')}</strong>
          </div>

          {/* Interactive Line Item redirecting to Expenses */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.45rem 0', 
              borderBottom: '1px solid var(--border-glass)',
              cursor: 'pointer' 
            }}
            onClick={() => onNavigateToExpenses('ALL')}
            title="Click to view full expenses table"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Festival Expenditures:</span>
              <span className="pill pill-gold" style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem' }}>
                View Table <ArrowUpRight size={11} />
              </span>
            </div>
            <strong className="font-num" style={{ color: '#ef4444' }}>- ₹{totalExpenses.toLocaleString('en-IN')}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', marginTop: '0.2rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Net Surplus Balance:</span>
            <strong className="font-num" style={{ color: 'var(--emerald-light)', fontSize: '1.25rem' }}>+ ₹{netSurplus.toLocaleString('en-IN')}</strong>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.55rem 0.8rem', borderRadius: 'var(--radius-sm)', marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--emerald-light)' }}>
            ✓ <strong>{surplusPct}% of all collections</strong> preserved safely in temple reserve.
          </div>
        </div>
      </div>

      {/* Intuitive Category Redirect Grid: Click any category to filter Expenses */}
      <div style={{ marginBottom: '2.5rem' }}>
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

      {/* Audit Checklist & Special Notes */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--gold-light)' }}>
          Audit Highlights & Special Confirmations
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <ShieldCheck size={20} color="var(--emerald-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Festival Security & Safety</strong>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Dedicated festival security guard services (₹1,000) categorized under <strong>Others</strong> ensured safe queue management and peaceful darshan.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Flower2 size={20} color="#ec4899" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Sacred Abhishekam Ingredients</strong>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                4 Litres of sacred milk (Mukesh Prabhuji), brass conch, tender coconuts, honey, and fresh fruits successfully offered to the Lord.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Utensils size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Prasadam & Eco-Friendly Dining</strong>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Over 360 devotees served sumptuous dinner prasadam with biodegradable plates, spoons, and donnas.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Sparkles size={20} color="var(--gold-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Zero Deficit Operation</strong>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Every single line item was verified, with 100% concordance between original receipts, devotee submissions, and trust accounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Redirect Banner */}
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
