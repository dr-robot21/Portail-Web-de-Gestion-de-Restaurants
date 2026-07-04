import React, { useState } from 'react';
import './DataTable.css';

/* ─── Pagination Component ───────────────────────────────────── */
const Pagination = ({ currentPage, totalPages, totalItems, pageSize, onPageChange }) => {
  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    // Always show first, last, current, and neighbours
    const delta = 1;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift('...');
    if (currentPage + delta < totalPages - 1) range.push('...');
    return [1, ...range, totalPages];
  };

  return (
    <div className="ui-dt-pagination">
      <span className="ui-dt-pag-info">
        Affichage de {from} à {to} sur {totalItems} entrées
      </span>
      <div className="ui-dt-pag-controls">
        <button
          className="ui-dt-pag-btn ui-dt-pag-nav"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Précédent
        </button>

        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={`dots-${idx}`} className="ui-dt-pag-dots">...</span>
          ) : (
            <button
              key={page}
              className={`ui-dt-pag-btn ui-dt-pag-page ${currentPage === page ? 'ui-dt-pag-page--active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className="ui-dt-pag-btn ui-dt-pag-nav"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

/* ─── DataTable Component ────────────────────────────────────── */
const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'Aucune donnée disponible',
  selectable = false,
  onRowSelect,
  pagination = false,
  pageSize = 10,
  searchable = false,
  onSearch,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    if (onSearch) onSearch(value);
  };

  const filteredData = onSearch
    ? data
    : data.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedData = pagination
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredData;

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const toggleRowSelection = (id) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedRows(newSelection);
    if (onRowSelect) onRowSelect(Array.from(newSelection));
  };

  const toggleAllSelection = (e) => {
    if (e.target.checked) {
      const allIds = paginatedData.map((row, index) => row.id || index);
      setSelectedRows(new Set(allIds));
      if (onRowSelect) onRowSelect(allIds);
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) onRowSelect([]);
    }
  };

  const isAllSelected = paginatedData.length > 0 &&
    paginatedData.every((row, index) => selectedRows.has(row.id || index));

  return (
    <div className={`ui-datatable-wrapper ${className}`}>
      {searchable && (
        <div className="ui-datatable-toolbar">
          <input
            type="text"
            className="ui-datatable-search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      )}

      <div className="ui-datatable-container">
        <table className="ui-datatable">
          <thead>
            <tr>
              {selectable && (
                <th className="ui-datatable-th ui-datatable-checkbox-col">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleAllSelection}
                  />
                </th>
              )}
              {columns.map((col, index) => (
                <th key={index} className="ui-datatable-th" style={{ width: col.width }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="ui-datatable-loading">
                  Chargement...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="ui-datatable-empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowId = row.id || rowIndex;
                const isSelected = selectedRows.has(rowId);
                return (
                  <tr
                    key={rowId}
                    className={`ui-datatable-row ${isSelected ? 'ui-datatable-row--selected' : ''}`}
                  >
                    {selectable && (
                      <td className="ui-datatable-td ui-datatable-checkbox-col">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRowSelection(rowId)}
                        />
                      </td>
                    )}
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="ui-datatable-td">
                        {col.render ? col.render(row) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default DataTable;
