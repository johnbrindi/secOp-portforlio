import React from 'react';

type RowData = Record<string, unknown>;
export default function AdminTable({ columns, data }: { columns: string[]; data: RowData[] }) {
  const renderValue = (value: unknown) => {
    if (value === null || value === undefined) {
      return '';
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="admin-table min-w-[400px] w-full border mt-4 bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border border-gray-700 px-3 py-2 bg-gray-800 text-cyan-300 font-semibold">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-800 transition-colors">
              {columns.map((col) => (
                <td key={col} className="border border-gray-700 px-3 py-2 text-gray-200">{renderValue(row[col])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
