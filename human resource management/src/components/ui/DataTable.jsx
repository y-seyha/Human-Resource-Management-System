import React from "react";

const DataTable = ({ title, columns, data, top = 5, statusColors }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {title} (Top {top})
      </h2>
      <table className="min-w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="p-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, top).map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {columns.map((col, j) => {
                const value = row[col.toLowerCase()] || row[col]; // handle dynamic keys
                const colorClass =
                  statusColors && statusColors[value]
                    ? statusColors[value]
                    : "";
                return (
                  <td key={j} className={`p-3 font-semibold ${colorClass}`}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
