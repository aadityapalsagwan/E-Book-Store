import { useEffect, useState } from 'react';
import { getSalesReport } from '../services/bookAPI';  // Fetch sales report from backend
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const SalesReport = () => {
  const [report, setReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getSalesReport();

        // Sort by date descending (newest first)
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setReport(sortedData);
      } catch (err) {
        console.error('Failed to load sales report', err);
      }
    })();
  }, []);

  // Optional: format date nicely
  const formatDate = (dateStr) => {
    let date = new Date(dateStr);
    if (isNaN(date)) {
      date = parseCustomDate(dateStr);
    }
    if (!date || isNaN(date)) return 'Invalid Date';

    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  function parseCustomDate(dateStr) {
    const parts = dateStr.split(/[-/]/);
    if(parts.length !== 3) return null;
    const [day, month, year] = parts;
    return new Date(`${year}-${month}-${day}T00:00:00`);
  }

  // Filter sales report by search term in buyer name, payment mode, or book titles
  const filteredReport = report.filter((sale) => {
    const term = searchTerm.toLowerCase();
    const booksStr = sale.books.join(', ').toLowerCase();
    return (
      (sale.user && sale.user.toLowerCase().includes(term)) ||
      (sale.paymentMode && sale.paymentMode.toLowerCase().includes(term)) ||
      booksStr.includes(term)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="ml-64 pt-20 p-6 bg-gray-50 min-h-screen">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                📊 Sales Report
              </h2>

              {/* Search bar */}
              <input
                type="text"
                placeholder="Search by buyer, payment mode, or book titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold">📚 Books</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">👤 Buyer</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">💳 Payment Mode</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">📅 Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {filteredReport.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                        No sales data available.
                      </td>
                    </tr>
                  ) : (
                    filteredReport.map((sale, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3">{sale.books.join(', ')}</td>
                        <td className="px-4 py-3">{sale.user}</td>
                        <td className="px-4 py-3">{sale.paymentMethod}</td>
                        <td className="px-4 py-3">{formatDate(sale.date)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesReport;
