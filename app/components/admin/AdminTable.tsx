"use client";

import React from 'react';

type RowData = Record<string, unknown>;

interface AdminTableProps {
  columns: string[];
  data: RowData[];
  actions?: (row: RowData) => React.ReactNode;
}

export default function AdminTable({ columns, data, actions }: AdminTableProps) {
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
              <th key={col} className="border border-gray-700 px-3 py-2 bg-gray-800 text-cyan-300 font-semibold text-left">{col}</th>
            ))}
            {actions && <th className="border border-gray-700 px-3 py-2 bg-gray-800 text-cyan-300 font-semibold text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-800 transition-colors">
              {columns.map((col) => (
                <td key={col} className="border border-gray-700 px-3 py-2 text-gray-200 align-top">{renderValue(row[col])}</td>
              ))}
              {actions && <td className="border border-gray-700 px-3 py-2 text-gray-200 align-top">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
