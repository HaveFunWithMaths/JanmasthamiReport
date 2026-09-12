import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import KPICards from './components/KPICards';
import TabNavigation from './components/TabNavigation';
import ExpensesSection from './components/ExpensesSection';
import AbhishekamSection from './components/AbhishekamSection';
import DonationsSection from './components/DonationsSection';
import DevoteeLedger from './components/DevoteeLedger';
import AuditSummary from './components/AuditSummary';
import Footer from './components/Footer';

import { 
  abhishekamSevas, 
  generalDonations, 
  festivalExpenses, 
  expenseCategories,
  festivalOverview 
} from './data/festivalData';

export default function App() {
  const [activeTab, setActiveTab] = useState('expenses');

  // Compute Core Financial Figures
  const totalAbhishekam = useMemo(() => {
    return abhishekamSevas.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const totalDonations = useMemo(() => {
    return generalDonations.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const totalInflow = useMemo(() => {
    return totalAbhishekam + totalDonations;
  }, [totalAbhishekam, totalDonations]);

  const totalExpenses = useMemo(() => {
    return festivalExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const netSurplus = useMemo(() => {
    return totalInflow - totalExpenses;
  }, [totalInflow, totalExpenses]);

  // Unique devotees count for ledger
  const uniqueDevoteesCount = useMemo(() => {
    const devs = new Set(festivalExpenses.map(e => e.devotee));
    return devs.size;
  }, []);

  return (
    <div className="app-root">
      {/* Interactive Site Header */}
      <Header />

      {/* Print-Only Header for PDF generation */}
      <div className="print-only-header">
        <h1 style={{ fontSize: '18pt', marginBottom: '4pt' }}>GNH Sri Krishna Janmashtami Festival 2026</h1>
        <h2 style={{ fontSize: '13pt', fontWeight: 'normal', color: '#475569', marginBottom: '8pt' }}>
          Official Seva, Donation & Expenditure Financial Audit Report
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '10pt', borderTop: '1px solid #cbd5e1', paddingTop: '6pt' }}>
          <span><strong>Total Receipts:</strong> ₹{totalInflow.toLocaleString('en-IN')}</span>
          <span><strong>Total Abhishekam:</strong> ₹{totalAbhishekam.toLocaleString('en-IN')}</span>
          <span><strong>Total Donations:</strong> ₹{totalDonations.toLocaleString('en-IN')}</span>
          <span><strong>Total Expenses:</strong> ₹{totalExpenses.toLocaleString('en-IN')}</span>
          <span><strong>Net Surplus:</strong> +₹{netSurplus.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <main className="container" style={{ paddingBottom: '3rem' }}>
        {/* Top KPI Cards & Surplus Meter */}
        <KPICards 
          totalAbhishekam={totalAbhishekam}
          totalDonations={totalDonations}
          totalExpenses={totalExpenses}
          totalInflow={totalInflow}
          netSurplus={netSurplus}
        />

        {/* Section Navigation Tabs */}
        <TabNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          counts={{
            expenses: festivalExpenses.length,
            abhishekam: abhishekamSevas.length,
            donations: generalDonations.length,
            devotees: uniqueDevoteesCount
          }}
        />

        {/* Tab Content Display */}
        <div className="tab-content-area">
          {activeTab === 'expenses' && (
            <ExpensesSection 
              expenses={festivalExpenses}
              categories={expenseCategories}
              totalExpenses={totalExpenses}
            />
          )}

          {activeTab === 'abhishekam' && (
            <AbhishekamSection 
              abhishekamData={abhishekamSevas}
              totalAbhishekam={totalAbhishekam}
            />
          )}

          {activeTab === 'donations' && (
            <DonationsSection 
              donationsData={generalDonations}
              totalDonations={totalDonations}
            />
          )}

          {activeTab === 'devotees' && (
            <DevoteeLedger 
              expenses={festivalExpenses}
              totalExpenses={totalExpenses}
            />
          )}

          {activeTab === 'summary' && (
            <AuditSummary 
              totalInflow={totalInflow}
              totalExpenses={totalExpenses}
              netSurplus={netSurplus}
              totalAbhishekam={totalAbhishekam}
              totalDonations={totalDonations}
            />
          )}
        </div>
      </main>

      {/* Devotional Footer */}
      <Footer />
    </div>
  );
}
