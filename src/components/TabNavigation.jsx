import React from 'react';
import { Receipt, Flame, HeartHandshake, Users, PieChart } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab, counts }) {
  const tabs = [
    { id: 'expenses', label: 'Expenses Breakdown', icon: Receipt, count: counts.expenses },
    { id: 'abhishekam', label: 'Abhishekam Sevas', icon: Flame, count: counts.abhishekam },
    { id: 'donations', label: 'Donations & Hundi', icon: HeartHandshake, count: counts.donations },
    { id: 'devotees', label: 'Devotee Ledger', icon: Users, count: counts.devotees },
    { id: 'summary', label: 'Audit Summary', icon: PieChart, count: null },
  ];

  return (
    <nav className="tabs-nav no-print" aria-label="Report Sections">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className="tab-count font-num">{tab.count}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
