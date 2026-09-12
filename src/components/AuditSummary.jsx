import React from 'react';
import { 
  CheckCircle2, AlertCircle, PieChart, ShieldCheck, Heart, 
  Sparkles, Award, Utensils, Tent, Flower2, Gift, Printer
} from 'lucide-react';

export default function AuditSummary({ 
  totalInflow, totalExpenses, netSurplus, totalAbhishekam, totalDonations 
}) {
  const surplusPct = ((netSurplus / totalInflow) * 100).toFixed(1);
  const abhishekamInflowPct = ((totalAbhishekam / totalInflow) * 100).toFixed(1);
  const donationsInflowPct = ((totalDonations / totalInflow) * 100).toFixed(1);

  return (
    <section id="audit-summary-section">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
          Executive Financial Audit & Seva Insights
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Key highlights, percentage breakdowns, and operational metrics for the 2026 Sri Krishna Janmashtami Festival.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
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

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-glass)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Gross Receipts Collected:</span>
            <strong className="font-num">₹{totalInflow.toLocaleString('en-IN')}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-glass)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Festival Expenditures:</span>
            <strong className="font-num" style={{ color: '#ef4444' }}>- ₹{totalExpenses.toLocaleString('en-IN')}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', marginTop: '0.25rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Net Surplus Balance:</span>
            <strong className="font-num" style={{ color: 'var(--emerald-light)', fontSize: '1.25rem' }}>+ ₹{netSurplus.toLocaleString('en-IN')}</strong>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--emerald-light)' }}>
            ✓ <strong>{surplusPct}% of all collections</strong> preserved safely in temple reserve.
          </div>
        </div>
      </div>

      {/* Audit Checklist & Special Notes */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
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
    </section>
  );
}
