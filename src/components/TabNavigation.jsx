import React from 'react';
import { Receipt, HeartHandshake, PieChart } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab, counts }) {
  const tabs = [
    { id: 'summary', label: 'Audit Summary', icon: PieChart, count: null },
    { id: 'expenses', label: 'Expenses Breakdown', icon: Receipt, count: counts.expenses },
    { id: 'inflow', label: 'Donations & Abhishekam', icon: HeartHandshake, count: counts.inflow },
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
