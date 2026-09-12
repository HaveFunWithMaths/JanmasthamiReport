import React from 'react';
import { IndianRupee, HeartHandshake, Flame, TrendingUp, PiggyBank } from 'lucide-react';

export default function KPICards({ totalAbhishekam, totalDonations, totalExpenses, totalInflow, netSurplus }) {
  return (
    <section id="kpi-overview-section">
      <div className="hero-banner" style={{ padding: '2rem 0 1.25rem' }}>
        <div className="hero-tag">
          <span>✨</span>
          <span>Official Festival Financial Audit</span>
        </div>
        <h2 className="hero-title">Sri Krishna Janmashtami Report</h2>
      </div>

      {/* Core Metric Cards */}
      <div className="kpi-grid">
        {/* Total Inflow */}
        <div className="kpi-card glass-card" style={{ '--card-accent': '#f59e0b' }}>
          <div className="kpi-header">
            <span className="kpi-label">Total Inflow</span>
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
            <span>66 Devotee Sevas</span>
          </div>
        </div>

        {/* Total Donations */}
        <div className="kpi-card glass-card" style={{ '--card-accent': '#38bdf8' }}>
          <div className="kpi-header">
            <span className="kpi-label">Total Donations</span>
            <div className="kpi-icon-badge" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)' }}>
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

        {/* Net Surplus / Balance - High Prominence */}
        <div 
          className="kpi-card glass-card" 
          style={{ 
            '--card-accent': '#10b981',
            border: '2px solid rgba(16, 185, 129, 0.55)',
            background: 'linear-gradient(145deg, rgba(22, 30, 52, 0.9), rgba(16, 185, 129, 0.14))',
            boxShadow: '0 8px 30px rgba(16, 185, 129, 0.22)'
          }}
          id="kpi-card-net-surplus"
        >
          <div className="kpi-header">
            <span className="kpi-label" style={{ color: 'var(--emerald-light)', fontWeight: 700, letterSpacing: '0.08em' }}>
              Net Surplus
            </span>
            <div className="kpi-icon-badge" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.25)' }}>
              <PiggyBank size={20} />
            </div>
          </div>
          <div className="kpi-value font-num" style={{ color: 'var(--emerald-light)', fontSize: '2.1rem', fontWeight: 800 }}>
            +₹{netSurplus.toLocaleString('en-IN')}
          </div>
          <div className="kpi-subtext">
            <span className="pill pill-green font-num" style={{ fontSize: '0.72rem', padding: '0.12rem 0.55rem', fontWeight: 700 }}>
              ✓ Verified Positive Balance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
