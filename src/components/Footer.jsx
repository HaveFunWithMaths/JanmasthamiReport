import React from 'react';
import { Heart, FileSpreadsheet } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-quote">
          हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ।<br />
          हरे राम हरे राम राम राम हरे हरे ॥
        </p>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0.75rem auto 1.5rem' }}>
          We express our heartfelt gratitude to every donor, volunteer, coordinator, and devotee whose selfless seva made the Sri Krishna Janmashtami 2026 celebration a transcendent success.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <a href="/assets/ExpensesReport.xlsx" download className="btn btn-glass btn-sm">
            <FileSpreadsheet size={14} color="#f59e0b" />
            <span>Raw Expenses Report (.xlsx)</span>
          </a>
          <a href="/assets/AbhishekamReport.xlsx" download className="btn btn-glass btn-sm">
            <FileSpreadsheet size={14} color="#ec4899" />
            <span>Raw Abhishekam Report (.xlsx)</span>
          </a>
          <a href="/assets/DonationsReport.xlsx" download className="btn btn-glass btn-sm">
            <FileSpreadsheet size={14} color="#10b981" />
            <span>Raw Donations Report (.xlsx)</span>
          </a>
        </div>

        <div className="footer-sub">
          <span>© 2026 GNH Temple Community • All Sevas Dedicated to Sri Sri Radha Krishna</span>
        </div>
      </div>
    </footer>
  );
}
