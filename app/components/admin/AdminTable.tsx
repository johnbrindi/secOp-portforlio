import React from 'react';

export default function AdminTable({ columns, data }: { columns: string[]; data: any[] }) {
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
                <td key={col} className="border border-gray-700 px-3 py-2 text-gray-200">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
