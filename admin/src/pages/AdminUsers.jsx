import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/users`);
            setUsers(res.data.users);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    // Filter users based on search term (name or email)
    const filteredUsers = users.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            user.name?.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term)
        );
    });

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar fixed on left */}
            <Sidebar className="fixed top-0 left-0 h-full z-30" />

            {/* Main content */}
            <div className="flex flex-col flex-grow ml-64">
                {/* Header fixed on top */}
                <Header className="fixed top-0 left-64 right-0 z-40" />

                {/* Content area */}
                <main className="flex-grow p-6 pt-20 bg-gray-50 min-h-screen overflow-auto">
                    {/* Heading and Search */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                            👥 All Users
                        </h1>

                        <div className="relative max-w-sm w-full">
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <MagnifyingGlassIcon
                                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    {/* Users grid */}
                    {!filteredUsers || filteredUsers.length === 0 ? (
                        <div className="text-gray-500">No users found.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user._id}
                                    className="bg-white border border-gray-200 shadow-md rounded-xl p-5 transition duration-300 hover:shadow-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                                            {user.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                <strong>Name:</strong> {user.name || "Unnamed User"}
                                            </h2>
                                            <p className="text-gray-600 text-sm">
                                                <strong>Email:</strong> {user.email || "N/A"}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                <strong>Password:</strong> Hidden for security
                                            </p>

                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm text-gray-700">
                                        <p>
                                            <strong>Orders:</strong> {user.orders?.length || 0}
                                        </p>
                                        <p>
                                            <strong>Cart:</strong> {user.cart?.length || 0}
                                        </p>
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
