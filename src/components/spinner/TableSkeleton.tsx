import React from "react";

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="overflow-x-auto">
      <table className="border border-gray-200">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">ZIP</th>
            <th className="px-4 py-2">DOB</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Add to Cart</th>
            <th className="px-4 py-2">Buy</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, idx) => (
            <tr key={idx} className="border-b border-gray-200">
              {Array.from({ length: 9 }).map((_, cellIdx) => (
                <td key={cellIdx} className="px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
