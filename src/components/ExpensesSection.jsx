import React, { useState, useMemo } from 'react';
import {
  Search, Tent, Flower2, Utensils, Gift, Printer, ShieldCheck,
  Filter, ChevronRight, CheckCircle2, Info
} from 'lucide-react';

const iconMap = {
  "Setup": Tent,
  "Deity (Abhishekam, flowers)": Flower2,
  "Prasadam and Bhoga": Utensils,
  "Gifts": Gift,
  "Printing (Posters and invite)": Printer,
  "Others": ShieldCheck
};

const colorMap = {
  "Setup": "#f59e0b",
  "Deity (Abhishekam, flowers)": "#ec4899",
  "Prasadam and Bhoga": "#10b981",
  "Gifts": "#8b5cf6",
  "Printing (Posters and invite)": "#3b82f6",
  "Others": "#94a3b8"
};

export default function ExpensesSection({
  expenses,
  categories,
  totalExpenses,
  selectedCategory = 'ALL',
  setSelectedCategory = () => { }
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('category'); // 'category' is default as requested!
  const [sortAsc, setSortAsc] = useState(true);

  // Category canonical order
  const categoryOrder = [
    "Setup",
    "Deity (Abhishekam, flowers)",
    "Prasadam and Bhoga",
    "Gifts",
    "Printing (Posters and invite)",
    "Others"
  ];

  // Calculate totals per category
  const categoryStats = useMemo(() => {
    const stats = {};
    expenses.forEach(item => {
      if (!stats[item.category]) {
        stats[item.category] = { count: 0, total: 0 };
      }
      stats[item.category].count += 1;
      stats[item.category].total += item.amount;
    });
    return stats;
  }, [expenses]);

  // Filter and sort expenses - sorted by Category by default!
  const filteredExpenses = useMemo(() => {
    const filtered = expenses.filter(item => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.devotee.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.comments && item.comments.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'category') {
        const catCompare = a.category.localeCompare(b.category);
        if (catCompare !== 0) return sortAsc ? catCompare : -catCompare;
        // Secondary sort by amount descending within the same category
        return b.amount - a.amount;
      }
      if (sortBy === 'amount') {
        return sortAsc ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortBy === 'devotee') {
        return sortAsc ? a.devotee.localeCompare(b.devotee) : b.devotee.localeCompare(a.devotee);
      }
      return 0;
    });
  }, [expenses, selectedCategory, searchQuery, sortBy, sortAsc]);

  const currentFilteredTotal = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section id="expenses-section">
      {/* Category Overview Cards */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)' }}>
            Categorized Expenditures
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Total Festival Expenses: <strong>₹{totalExpenses.toLocaleString('en-IN')}</strong> across 6 predefined seva categories
          </p>
        </div>

        {selectedCategory !== 'ALL' && (
          <button
            onClick={() => setSelectedCategory('ALL')}
            className="btn btn-glass btn-sm"
          >
            <Filter size={14} />
            <span>Reset Category Filter</span>
          </button>
        )}
      </div>

      <div className="category-summary-grid">
        {categories.map(cat => {
          const stats = categoryStats[cat.name] || { count: 0, total: 0 };
          const percent = ((stats.total / totalExpenses) * 100).toFixed(1);
          const isSelected = selectedCategory === cat.name;
          const Icon = iconMap[cat.name] || Tent;
          const catColor = colorMap[cat.name] || '#f59e0b';

          return (
            <div
              key={cat.id}
              className={`category-card glass-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(isSelected ? 'ALL' : cat.name)}
              id={`cat-card-${cat.id}`}
            >
              <div className="category-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    padding: '8px',
                    borderRadius: '10px',
                    background: `${catColor}20`,
                    color: catColor
                  }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="category-title">{cat.name}</h4>
                    <p className="category-desc">{cat.description}</p>
                  </div>
                </div>

                <div>
                  <div className="category-amount font-num" style={{ color: catColor }}>
                    ₹{stats.total.toLocaleString('en-IN')}
                  </div>
                  <div className="category-pct font-num">
                    {stats.count} items ({percent}%)
                  </div>
                </div>
              </div>

              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${percent}%`, backgroundColor: catColor }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Table Toolbar */}
      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            id="expense-search-input"
            className="search-input"
            placeholder="Search by devotee, item description, comments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredExpenses.length}</strong> items • Subtotal: <strong className="font-num" style={{ color: 'var(--gold-light)' }}>₹{currentFilteredTotal.toLocaleString('en-IN')}</strong>
          </span>
        </div>
      </div>

      {/* Itemized Table */}
      <div className="table-container glass-card">
        <table className="data-table" id="expenses-table">
          <thead>
            <tr>
              <th style={{ width: '45px' }}>#</th>
              <th
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => {
                  if (sortBy === 'devotee') setSortAsc(!sortAsc);
                  else { setSortBy('devotee'); setSortAsc(true); }
                }}
                title="Click to sort by Devotee"
              >
                Devotee / Submitter {sortBy === 'devotee' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th>Title / Item Description</th>
              <th
                style={{ cursor: 'pointer', userSelect: 'none', color: sortBy === 'category' ? 'var(--gold-light)' : undefined }}
                onClick={() => {
                  if (sortBy === 'category') setSortAsc(!sortAsc);
                  else { setSortBy('category'); setSortAsc(true); }
                }}
                title="Click to sort by Category"
              >
                Category {sortBy === 'category' ? (sortAsc ? '▲' : '▼') : ''}
                {sortBy === 'category' && (
                  <span style={{ fontSize: '0.65rem', marginLeft: '6px', opacity: 0.8, textTransform: 'none' }}>
                    (Default)
                  </span>
                )}
              </th>
              <th
                style={{ textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
                onClick={() => {
                  if (sortBy === 'amount') setSortAsc(!sortAsc);
                  else { setSortBy('amount'); setSortAsc(false); }
                }}
                title="Click to sort by Amount"
              >
                Amount (₹) {sortBy === 'amount' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th>Notes / Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  No matching expenses found. Try adjusting your search query or category filter.
                </td>
              </tr>
            ) : (
              filteredExpenses.map((item, index) => {
                const catColor = colorMap[item.category] || '#f59e0b';
                return (
                  <tr key={item.id} id={`expense-row-${item.id}`}>
                    <td style={{ color: 'var(--text-subtle)' }} className="font-num">{index + 1}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      {item.devotee}
                    </td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{item.title}</span>
                    </td>
                    <td>
                      <span className="pill" style={{
                        background: `${catColor}15`,
                        color: catColor,
                        border: `1px solid ${catColor}40`
                      }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }} className="font-num">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {item.comments ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Info size={14} style={{ color: 'var(--gold-light)', flexShrink: 0 }} />
                          <span>{item.comments}</span>
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-subtle)' }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
