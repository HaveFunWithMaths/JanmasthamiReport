import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import KPICards from './components/KPICards';
import TabNavigation from './components/TabNavigation';
import ExpensesSection from './components/ExpensesSection';
import DonationsAndAbhishekam from './components/DonationsAndAbhishekam';
import AuditSummary from './components/AuditSummary';
import Footer from './components/Footer';

import { 
  abhishekamSevas, 
  generalDonations, 
  festivalExpenses, 
  expenseCategories 
} from './data/festivalData';

export default function App() {
  // Audit Summary is the first and default tab
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState('ALL');

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

  // Handler from Audit Summary to Expenses tab
  const handleNavigateToExpenses = (category = 'ALL') => {
    setSelectedExpenseCategory(category);
    setActiveTab('expenses');
    setTimeout(() => {
      const el = document.getElementById('expenses-section') || document.querySelector('.tabs-nav');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

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
          <span><strong>Total Inflow:</strong> ₹{totalInflow.toLocaleString('en-IN')}</span>
          <span><strong>Total Expenses:</strong> ₹{totalExpenses.toLocaleString('en-IN')}</span>
          <span><strong>Net Surplus:</strong> +₹{netSurplus.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <main className="container" style={{ paddingBottom: '3rem' }}>
        {/* Top KPI Cards */}
        <KPICards 
          totalAbhishekam={totalAbhishekam}
          totalDonations={totalDonations}
          totalExpenses={totalExpenses}
          totalExpenseItems={festivalExpenses.length}
          totalInflow={totalInflow}
          netSurplus={netSurplus}
        />

        {/* Section Navigation Tabs (3 simplified tabs) */}
        <TabNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          counts={{
            expenses: festivalExpenses.length,
            inflow: abhishekamSevas.length + generalDonations.length,
          }}
        />

        {/* Tab Content Display */}
        <div className="tab-content-area">
          {activeTab === 'summary' && (
            <AuditSummary 
              totalInflow={totalInflow}
              totalExpenses={totalExpenses}
              netSurplus={netSurplus}
              expenses={festivalExpenses}
              onNavigateToExpenses={handleNavigateToExpenses}
            />
          )}

          {activeTab === 'expenses' && (
            <ExpensesSection 
              expenses={festivalExpenses}
              categories={expenseCategories}
              totalExpenses={totalExpenses}
              selectedCategory={selectedExpenseCategory}
              setSelectedCategory={setSelectedExpenseCategory}
            />
          )}

          {activeTab === 'inflow' && (
            <DonationsAndAbhishekam 
              abhishekamData={abhishekamSevas}
              donationsData={generalDonations}
              totalAbhishekam={totalAbhishekam}
              totalDonations={totalDonations}
              totalInflow={totalInflow}
            />
          )}
        </div>
      </main>

      {/* Devotional Footer */}
      <Footer />
    </div>
  );
}
