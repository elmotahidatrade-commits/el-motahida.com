import React from 'react';

const Table = ({ columns, data, onSort, isLoading = false }) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide border border-borderC rounded-xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead className="bg-background/50 border-b border-borderC">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-4 text-xs font-bold text-textMuted uppercase tracking-wider ${
                  onSort && col.sortable ? 'cursor-pointer hover:text-primary transition-colors' : ''
                }`}
                onClick={() => onSort && col.sortable && onSort(col.key)}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-borderC">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-20 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  <span className="text-sm text-textMuted font-medium">Loading data...</span>
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-background/30 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-textMain">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-20 text-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg">📭</span>
                  <p className="text-sm text-textMuted font-medium">No results found.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
