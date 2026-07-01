import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data available',
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

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Local filtering if no external search handler is provided
  const filteredData = onSearch 
    ? data 
    : data.filter(row => 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = pagination 
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredData;

  // Selection logic
  const toggleRowSelection = (id) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRows(newSelection);
    if (onRowSelect) {
      onRowSelect(Array.from(newSelection));
    }
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

  const isAllSelected = paginatedData.length > 0 && paginatedData.every((row, index) => selectedRows.has(row.id || index));

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
                  Loading data...
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

      {pagination && totalPages > 1 && (
        <div className="ui-datatable-pagination">
          <button 
            className="ui-datatable-page-btn" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span className="ui-datatable-page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="ui-datatable-page-btn" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
