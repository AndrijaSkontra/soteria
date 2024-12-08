export default function TableSkeletonTenRows() {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="p-2 bg-gray-200 border border-gray-300 w-1/4">
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            </th>
            <th className="hidden xl:table-cell p-2 bg-gray-200 border border-gray-300 w-1/4">
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            </th>
            <th className="hidden xl:table-cell p-2 bg-gray-200 border border-gray-300 w-1/4">
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            </th>
            <th className="p-2 bg-gray-200 border border-gray-300 w-1/4">
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, idx) => (
            <tr key={idx} className="border border-gray-300">
              <td className="p-2">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
              </td>
              <td className="p-2">
                <div className="hidden xl:table-cell w-32 h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
              </td>
              <td className="p-2">
                <div className="hidden xl:table-cell w-32 h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
              </td>
              <td className="p-2">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
