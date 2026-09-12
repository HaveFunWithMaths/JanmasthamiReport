import React, { useState } from 'react';
import { Download, Printer, Sparkles, FileSpreadsheet, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Header() {
  const [showDownloads, setShowDownloads] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#0ea5e9', '#ec4899', '#10b981']
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo-wrapper">
          <div className="logo-img-container">
            <img 
              src="/assets/GNHLogo.png" 
              alt="GNH Logo" 
              className="logo-img" 
              id="gnh-logo"
            />
          </div>
          <div>
            <h1 className="brand-title">GNH Temple Community</h1>
            <div className="brand-subtitle">
              <span>Sri Krishna Janmashtami 2026</span>
              <span>•</span>
              <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Financial & Seva Audit</span>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <button 
            onClick={triggerConfetti} 
            className="btn btn-glass btn-sm"
            title="Hare Krishna Celebration!"
            id="celebrate-btn"
          >
            <Sparkles size={16} color="var(--gold-light)" />
            <span>Radhe Radhe!</span>
          </button>

          <button 
            onClick={handlePrint} 
            className="btn btn-glass btn-sm"
            id="print-report-btn"
          >
            <Printer size={16} />
            <span>Print / PDF</span>
          </button>

          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowDownloads(!showDownloads)} 
              className="btn btn-gold btn-sm"
              id="download-menu-btn"
            >
              <Download size={16} />
              <span>Raw Reports</span>
              <ChevronDown size={14} />
            </button>

            {showDownloads && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem',
                minWidth: '220px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100
              }}>
                <a 
                  href="/assets/ExpensesReport.xlsx" 
                  download 
                  className="btn btn-glass btn-sm"
                  style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.35rem' }}
                  onClick={() => setShowDownloads(false)}
                >
                  <FileSpreadsheet size={14} color="#f59e0b" />
                  <span>Expenses Report (.xlsx)</span>
                </a>
                <a 
                  href="/assets/AbhishekamReport.xlsx" 
                  download 
                  className="btn btn-glass btn-sm"
                  style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.35rem' }}
                  onClick={() => setShowDownloads(false)}
                >
                  <FileSpreadsheet size={14} color="#ec4899" />
                  <span>Abhishekam Report (.xlsx)</span>
                </a>
                <a 
                  href="/assets/DonationsReport.xlsx" 
                  download 
                  className="btn btn-glass btn-sm"
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                  onClick={() => setShowDownloads(false)}
                >
                  <FileSpreadsheet size={14} color="#10b981" />
                  <span>Donations Report (.xlsx)</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
