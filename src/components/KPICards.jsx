import React from 'react';
import { IndianRupee, HeartHandshake, Flame, TrendingUp, PiggyBank, ArrowUpRight } from 'lucide-react';

export default function KPICards({ totalAbhishekam, totalDonations, totalExpenses, totalInflow, netSurplus }) {
  const surplusPercent = ((netSurplus / totalInflow) * 100).toFixed(1);
  const expensePercent = ((totalExpenses / totalInflow) * 100).toFixed(1);

  return (
    <section id="kpi-overview-section">
      <div className="hero-banner">
        <div className="hero-tag">
          <span>✨</span>
          <span>Official Festival Financial Audit</span>
        </div>
        <h2 className="hero-title">Sri Krishna Janmashtami Report</h2>
        <p className="hero-description">
          A completely transparent account of all sacred donations, Abhishekam sponsorships, and festival expenditures organized by GNH.
        </p>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="kpi-grid">
        {/* Total Abhishekam */}
        <div className="kpi-card glass-card" style={{ '--card-accent': '#ec4899' }}>
          <div className="kpi-header">
            <span className="kpi-label">Total Abhishekam</span>
            <div className="kpi-icon-badge" style={{ color: '#ec4899', background: 'rgba(236, 72, 153, 0.12)' }}>
              <Flame size={20} />
            </div>
          </div>
          <div className="kpi-value font-num">
            ₹{totalAbhishekam.toLocaleString('en-IN')}
          </div>
          <div className="kpi-subtext">
            <span>66 Devotee Sevas (4 Seva Tiers)</span>
          </div>
        </div>

        {/* Total Donations */}
        <div className="kpi-card glass-card" style={{ '--card-accent': '#10b981' }}>
          <div className="kpi-header">
            <span className="kpi-label">Total Donations</span>
            <div className="kpi-icon-badge" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.12)' }}>
              <HeartHandshake size={20} />
            </div>
          </div>
          <div className="kpi-value font-num">
            ₹{totalDonations.toLocaleString('en-IN')}
          </div>
          <div className="kpi-subtext">
            <span>20 Devotees + Festival Hundi</span>
          </div>
        </div>

        {/* Total Combined Receipts */}
        <div className="kpi-card glass-card" style={{ '--card-accent': '#f59e0b' }}>
          <div className="kpi-header">
            <span className="kpi-label">Total Receipts (Inflow)</span>
            <div className="kpi-icon-badge" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)' }}>
              <IndianRupee size={20} />
            </div>
          </div>
          <div className="kpi-value font-num">
            ₹{totalInflow.toLocaleString('en-IN')}
          </div>
          <div className="kpi-subtext">
            <span>87 Total Festival Contributions</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="kpi-card glass-card" style={{ '--card-accent': '#ef4444' }}>
          <div className="kpi-header">
            <span className="kpi-label">Total Expenses</span>
            <div className="kpi-icon-badge" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.12)' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="kpi-value font-num">
            ₹{totalExpenses.toLocaleString('en-IN')}
          </div>
          <div className="kpi-subtext">
            <span>37 Items across 6 Categories</span>
          </div>
        </div>

        {/* Net Surplus / Balance */}
        <div className="kpi-card glass-card" style={{ '--card-accent': '#38bdf8' }}>
          <div className="kpi-header">
            <span className="kpi-label">Net Surplus (Balance)</span>
            <div className="kpi-icon-badge" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)' }}>
              <PiggyBank size={20} />
            </div>
          </div>
          <div className="kpi-value font-num" style={{ color: 'var(--emerald-light)' }}>
            +₹{netSurplus.toLocaleString('en-IN')}
          </div>
          <div className="kpi-subtext">
            <span style={{ color: 'var(--emerald-light)', fontWeight: 600 }}>{surplusPercent}% retained for future seva</span>
          </div>
        </div>
      </div>

      {/* Inflow vs Outflow Visual Balance Cushion */}
      <div className="surplus-highlight-bar">
        <div>
          <div className="surplus-info-title">
            <span>🌿 Festival Financial Health: Healthy Surplus</span>
          </div>
          <p className="surplus-info-desc">
            Sacred contributions comfortably funded all festival arrangements with a surplus of <strong>₹{netSurplus.toLocaleString('en-IN')}</strong> preserved for upcoming deity sevas and temple maintenance.
          </p>
        </div>

        <div className="balance-meter">
          <div className="balance-meter-labels">
            <span>Spent: <strong>{expensePercent}%</strong> (₹{totalExpenses.toLocaleString('en-IN')})</span>
            <span style={{ color: 'var(--emerald-light)' }}>Retained: <strong>{surplusPercent}%</strong> (₹{netSurplus.toLocaleString('en-IN')})</span>
          </div>
          <div className="balance-meter-track">
            <div className="balance-meter-spent" style={{ width: `${expensePercent}%` }} title={`Spent: ₹${totalExpenses.toLocaleString('en-IN')}`}></div>
            <div className="balance-meter-saved" style={{ width: `${surplusPercent}%` }} title={`Retained: ₹${netSurplus.toLocaleString('en-IN')}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
