import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");  // Added status filter state

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/orders`);
      // Sort orders by date descending (newest first)
      const sortedOrders = res.data.orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryStatus: newStatus }),
      });
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Filter orders by user name, email, orderId and delivery status
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order.userId?.name?.toLowerCase().includes(term) ||
      order.userId?.email?.toLowerCase().includes(term) ||
      (order.orderId && order.orderId.toLowerCase().includes(term)) ||
      (order._id && order._id.toLowerCase().includes(term));

    const matchesStatus =
      statusFilter === "All" || (order.deliveryStatus || "Processing") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fixed on left */}
      <Sidebar className="fixed top-0 left-0 h-full z-30" />

      {/* Main content wrapper */}
      <div className="flex flex-col flex-grow ml-64">
        {/* Header fixed at top */}
        <Header className="fixed top-0 left-64 right-0 z-40" />

        {/* Content area below header, scrollable */}
        <main className="flex-grow p-6 pt-20 bg-gray-50 min-h-screen overflow-auto">
          {/* Heading, Search bar and Status filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              📦 All Orders
            </h1>

            <div className="flex gap-4 w-full max-w-md">
              {/* Search input */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by user, email, or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MagnifyingGlassIcon
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Status filter dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {!filteredOrders || filteredOrders.length === 0 ? (
            <div className="text-gray-500">No orders found.</div>
          ) : (
            <div className="space-y-6 max-w-full">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row md:justify-between mb-4">
                    <div className="space-y-1 text-sm text-gray-700 max-w-md">
                      <p>
                        <strong>Order ID:</strong> #{order.orderId || order._id}
                      </p>
                      <p>
                        <strong>User:</strong> {order.userId?.name || "Unknown"}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.userId?.email || "N/A"}
                      </p>
                      <p>
                        <strong>Pincode:</strong> {order.pincode || "N/A"}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.address || "N/A"}
                      </p>
                      <p>
                        <strong>Mobile Number:</strong> {order.mobile || "N/A"}
                      </p>
                      <p>
                        <strong>Total Money:</strong> ₹{order.total || "N/A"}
                      </p>
                      <p>
                        <strong>Payment:</strong> {order.paymentMethod || "N/A"}
                      </p>
                      <p>
                        <strong>Delivery Date:</strong>{" "}
                        {order.deliveryDate
                          ? new Date(order.deliveryDate).toLocaleDateString()
                          : "Pending"}
                      </p>
                      <p className="text-xs text-gray-400 italic">
                        {order.createdAt
                          ? `Ordered ${formatDistanceToNow(new Date(order.createdAt), {
                              addSuffix: true,
                            })}`
                          : ""}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0 flex items-center gap-2">
                      <label
                        htmlFor={`status-select-${order._id}`}
                        className="font-medium text-gray-600 cursor-pointer"
                      >
                        Status:
                      </label>
                      <select
                        id={`status-select-${order._id}`}
                        value={order.deliveryStatus || "Processing"}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm bg-gray-50 hover:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                    {order.books?.map(({ book, quantity }) => (
                      <div
                        key={book._id}
                        className="flex items-center gap-4 border rounded-md p-4 hover:bg-gray-50"
                      >
                        <img
                          src={book.image || "/placeholder.png"}
                          alt={book.title || "Book Cover"}
                          className="w-16 h-20 object-cover rounded border"
                          loading="lazy"
                        />
                        <div className="text-sm text-gray-700">
                          <h3 className="font-semibold text-gray-800">
                            {book.title || "Untitled"}
                          </h3>
                          <p>Price: ₹{book.price ?? "N/A"}</p>
                          <p>Qty: {quantity ?? 0}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
