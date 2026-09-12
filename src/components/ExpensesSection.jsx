import React, { useState, useMemo } from 'react';
import {
  Search, Tent, Flower2, Utensils, Gift, Printer, ShieldCheck,
  Filter, ChevronRight, CheckCircle2, Info, X, Check, ArrowRight,
  ArrowUpDown, ArrowUp, ArrowDown
} from 'lucide-react';

const iconMap = {
  "Setup": Tent,
  "Diety": Flower2,
  "Prasadam & Bhoga": Utensils,
  "Gifts": Gift,
  "Printing (Posters and invite)": Printer,
  "Others": ShieldCheck
};

const colorMap = {
  "Setup": "#f59e0b",
  "Diety": "#ec4899",
  "Prasadam & Bhoga": "#10b981",
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
    "Diety",
    "Prasadam & Bhoga",
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
      if (sortBy === 'id') {
        const idA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
        const idB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
        return sortAsc ? idA - idB : idB - idA;
      }
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
        const cmp = a.devotee.localeCompare(b.devotee);
        return sortAsc ? cmp : -cmp;
      }
      if (sortBy === 'title') {
        const cmp = a.title.localeCompare(b.title);
        return sortAsc ? cmp : -cmp;
      }
      return 0;
    });
  }, [expenses, selectedCategory, searchQuery, sortBy, sortAsc]);

  const handleHeaderSort = (field, defaultAsc = true) => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(defaultAsc);
    }
  };

  const currentFilteredTotal = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const isAnyCategorySelected = selectedCategory !== 'ALL';

  return (
    <section id="expenses-section">
      {/* Category Overview Header */}
      <div className="expenses-cat-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h3 className="font-devotional" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', margin: 0 }}>
              Categorized Expenditures
            </h3>
            {isAnyCategorySelected && (
              <span className="pill pill-gold" style={{ fontSize: '0.75rem' }}>
                Filter Active
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Total Festival Expenses: <strong>₹{totalExpenses.toLocaleString('en-IN')}</strong> across 6 predefined seva categories
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAnyCategorySelected ? (
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className="btn btn-warning btn-sm"
              id="clear-category-filter-header-btn"
              title="Clear category filter and show all expenses"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontWeight: 600,
                boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)'
              }}
            >
              <X size={15} />
              <span>Show All Categories ({expenses.length})</span>
            </button>
          ) : (
            <div className="category-all-active-pill">
              <CheckCircle2 size={15} style={{ color: 'var(--emerald-light)' }} />
              <span>Showing All 6 Categories</span>
            </div>
          )}
        </div>
      </div>

      {/* Category Overview Cards */}
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
              className={`category-card glass-card ${isSelected ? 'selected' : ''} ${isAnyCategorySelected && !isSelected ? 'dimmed' : ''}`}
              onClick={() => setSelectedCategory(isSelected ? 'ALL' : cat.name)}
              id={`cat-card-${cat.id}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCategory(isSelected ? 'ALL' : cat.name);
                }
              }}
              title={isSelected ? `Click to unselect "${cat.name}" and view all expenses` : `Click to filter by "${cat.name}"`}
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

                <div style={{ textAlign: 'right' }}>
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

              {/* Explicit Visual Affordance for Selection & Unselection */}
              {isSelected ? (
                <div className="category-card-footer active" style={{ borderColor: `${catColor}40` }}>
                  <span className="footer-status-pill" style={{ color: catColor }}>
                    <CheckCircle2 size={13} />
                    <span>Active Filter</span>
                  </span>
                  <span className="footer-action-hint">
                    <span>Click card to unselect</span>
                    <X size={13} />
                  </span>
                </div>
              ) : (
                <div className="category-card-footer idle">
                  <span className="footer-idle-text">
                    {isAnyCategorySelected ? 'Click to switch filter' : 'Click to filter line items'}
                  </span>
                  <ArrowRight size={13} className="footer-idle-icon" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Category Filter Bar */}
      <div className="category-quick-pills-bar">
        <div className="quick-pills-label">
          <Filter size={13} />
          <span>Category Filter:</span>
        </div>

        <div className="quick-pills-list">
          <button
            type="button"
            className={`quick-pill-btn ${selectedCategory === 'ALL' ? 'active-all' : ''}`}
            onClick={() => setSelectedCategory('ALL')}
            id="quick-pill-all"
            title="View all categories"
          >
            <span>All Categories</span>
            <span className="pill-count">{expenses.length}</span>
          </button>

          {categoryOrder.map(catName => {
            const stats = categoryStats[catName] || { count: 0 };
            const isCatSelected = selectedCategory === catName;
            const catColor = colorMap[catName] || '#f59e0b';

            return (
              <button
                type="button"
                key={catName}
                className={`quick-pill-btn ${isCatSelected ? 'active-cat' : ''}`}
                style={isCatSelected ? {
                  borderColor: catColor,
                  background: `${catColor}25`,
                  color: '#ffffff',
                  boxShadow: `0 0 10px ${catColor}35`
                } : {}}
                onClick={() => setSelectedCategory(isCatSelected ? 'ALL' : catName)}
                id={`quick-pill-${catName.split(' ')[0].toLowerCase()}`}
                title={isCatSelected ? `Click to unselect ${catName} (Show all)` : `Filter by ${catName}`}
              >
                <span className="pill-dot" style={{ backgroundColor: catColor }} />
                <span>{catName}</span>
                <span className="pill-count">{stats.count}</span>
                {isCatSelected && (
                  <span className="pill-remove-icon" title="Clear filter">
                    <X size={12} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
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

        {/* Sort Select Option in Toolbar */}
        <div className="table-sort-control">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Sort:
          </span>
          <select
            className="table-sort-select"
            value={`${sortBy}_${sortAsc ? 'asc' : 'desc'}`}
            onChange={(e) => {
              const val = e.target.value;
              const [field, dir] = val.split('_');
              setSortBy(field);
              setSortAsc(dir === 'asc');
            }}
            id="expenses-sort-select"
            aria-label="Sort expenses table"
          >
            <option value="category_asc">Category (Default) • A-Z</option>
            <option value="category_desc">Category • Z-A</option>
            <option value="amount_desc">Amount (Highest First) ▼</option>
            <option value="amount_asc">Amount (Lowest First) ▲</option>
            <option value="devotee_asc">Devotee Name (A to Z)</option>
            <option value="devotee_desc">Devotee Name (Z to A)</option>
            <option value="title_asc">Item Description (A to Z)</option>
            <option value="title_desc">Item Description (Z to A)</option>
            <option value="id_asc">Default Order (# 1 to 37)</option>
          </select>
        </div>

        {isAnyCategorySelected && (
          <div className="table-active-filter-badge" id="table-category-filter-badge">
            <span className="table-filter-label">
              Category: <strong style={{ color: colorMap[selectedCategory] || 'var(--gold-light)' }}>{selectedCategory}</strong>
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className="table-clear-filter-btn"
              title="Remove category filter and show all items"
            >
              <X size={13} />
              <span>Show All ({expenses.length})</span>
            </button>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredExpenses.length}</strong> {isAnyCategorySelected ? `of ${expenses.length}` : ''} items • Subtotal: <strong className="font-num" style={{ color: 'var(--gold-light)' }}>₹{currentFilteredTotal.toLocaleString('en-IN')}</strong>
          </span>
        </div>
      </div>

      {/* Itemized Table */}
      <div className="table-container glass-card">
        <table className="data-table" id="expenses-table">
          <thead>
            <tr>
              <th
                style={{ width: '55px' }}
                className="sortable-th"
                onClick={() => handleHeaderSort('id', true)}
                title="Click to sort by serial number / ID"
                role="columnheader"
                aria-sort={sortBy === 'id' ? (sortAsc ? 'ascending' : 'descending') : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('id', true); } }}
              >
                <div className="sort-th-content">
                  <span>#</span>
                  {sortBy === 'id' ? (
                    sortAsc ? <ArrowUp size={13} className="sort-icon-active" /> : <ArrowDown size={13} className="sort-icon-active" />
                  ) : (
                    <ArrowUpDown size={13} className="sort-icon-idle" />
                  )}
                </div>
              </th>
              <th
                className="sortable-th"
                onClick={() => handleHeaderSort('devotee', true)}
                title="Click to sort by Devotee name"
                role="columnheader"
                aria-sort={sortBy === 'devotee' ? (sortAsc ? 'ascending' : 'descending') : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('devotee', true); } }}
              >
                <div className="sort-th-content">
                  <span>Devotee / Submitter</span>
                  {sortBy === 'devotee' ? (
                    sortAsc ? <ArrowUp size={14} className="sort-icon-active" /> : <ArrowDown size={14} className="sort-icon-active" />
                  ) : (
                    <ArrowUpDown size={14} className="sort-icon-idle" />
                  )}
                </div>
              </th>
              <th
                className="sortable-th"
                onClick={() => handleHeaderSort('title', true)}
                title="Click to sort by Item Description"
                role="columnheader"
                aria-sort={sortBy === 'title' ? (sortAsc ? 'ascending' : 'descending') : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('title', true); } }}
              >
                <div className="sort-th-content">
                  <span>Title / Item Description</span>
                  {sortBy === 'title' ? (
                    sortAsc ? <ArrowUp size={14} className="sort-icon-active" /> : <ArrowDown size={14} className="sort-icon-active" />
                  ) : (
                    <ArrowUpDown size={14} className="sort-icon-idle" />
                  )}
                </div>
              </th>
              <th
                className="sortable-th"
                style={sortBy === 'category' ? { color: 'var(--gold-light)' } : undefined}
                onClick={() => handleHeaderSort('category', true)}
                title="Click to sort by Category"
                role="columnheader"
                aria-sort={sortBy === 'category' ? (sortAsc ? 'ascending' : 'descending') : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('category', true); } }}
              >
                <div className="sort-th-content">
                  <span>Category</span>
                  {sortBy === 'category' ? (
                    <>
                      {sortAsc ? <ArrowUp size={14} className="sort-icon-active" /> : <ArrowDown size={14} className="sort-icon-active" />}
                      <span style={{ fontSize: '0.65rem', marginLeft: '4px', opacity: 0.85, textTransform: 'none' }}>
                        (Default)
                      </span>
                    </>
                  ) : (
                    <ArrowUpDown size={14} className="sort-icon-idle" />
                  )}
                </div>
              </th>
              <th
                className="sortable-th"
                style={{ textAlign: 'right' }}
                onClick={() => handleHeaderSort('amount', false)}
                title="Click to sort by Amount"
                role="columnheader"
                aria-sort={sortBy === 'amount' ? (sortAsc ? 'ascending' : 'descending') : 'none'}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHeaderSort('amount', false); } }}
              >
                <div className="sort-th-content right">
                  <span>Amount (₹)</span>
                  {sortBy === 'amount' ? (
                    sortAsc ? <ArrowUp size={14} className="sort-icon-active" /> : <ArrowDown size={14} className="sort-icon-active" />
                  ) : (
                    <ArrowUpDown size={14} className="sort-icon-idle" />
                  )}
                </div>
              </th>
              <th>Notes / Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    No matching expenses found
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    {searchQuery && isAnyCategorySelected
                      ? `No items matching "${searchQuery}" in "${selectedCategory}".`
                      : searchQuery
                        ? `No items matching "${searchQuery}".`
                        : `No items found in "${selectedCategory}".`}
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {isAnyCategorySelected && (
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('ALL')}
                        className="btn btn-warning btn-sm"
                      >
                        <X size={14} />
                        <span>Show All Categories</span>
                      </button>
                    )}
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="btn btn-glass btn-sm"
                      >
                        Clear Search Query
                      </button>
                    )}
                  </div>
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
