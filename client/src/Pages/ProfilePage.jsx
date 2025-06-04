import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
  FaLock,
} from "react-icons/fa";
import { logoutUser } from "../auth";
import { Helmet } from 'react-helmet-async';


export default function ProfilePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) throw new Error("No token found.");

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch profile.");
        }

        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
        localStorage.setItem("user", JSON.stringify({ ...data, token }));
      } catch (err) {
        setFetchError("Session expired. Redirecting...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const validate = () => {
    let valid = true;
    const errs = { name: "" };

    if (!name.trim()) {
      errs.name = "Name cannot be empty.";
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/edit-name`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!res.ok) throw new Error("Failed to update name.");
      const updated = await res.json();
      setName(updated.name);
      localStorage.setItem("user", JSON.stringify({ ...updated, token }));
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setName(storedUser?.name || "");
    setErrors({ name: "" });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/", { replace: true });
  };

  const handleChangePassword = () => {
    navigate("/changepassword");
  };

  return (

    <>
      <Helmet>
        <title>Profile | E-Bookstore | By Aaditya Pal , Rohit Kumar</title>
        <meta name="description" content="Read more about Book Title and buy the best ebooks online." />
        <meta name="keywords" content="Book Title, ebook, buy book, read online, download pdf" />
          <meta name="google-site-verification" content="googlee69265a6530ed2e3" />

      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center pt-16 px-4">
        <section className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-10 sm:p-12 relative">
          {/* Profile Icon */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-28 h-28 rounded-full bg-blue-100 shadow-lg flex items-center justify-center border-4 border-blue-600">
              <span className="text-blue-600 text-5xl font-bold">
                {name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          </div>


          <h1 className="text-3xl font-extrabold text-center mt-20 mb-8 text-gray-900">Your Profile</h1>

          {fetchError ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 text-center font-medium">
              {fetchError}
            </div>
          ) : (
            <>
              {!isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Name</label>
                    <p className="text-xl font-medium text-gray-800">{name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <p className="text-lg text-gray-700 break-words">{email}</p>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label className="font-semibold block mb-1 text-gray-700">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-gray-700">Email</label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-600 border"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="px-5 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100"
                    >
                      <FaTimes className="inline mr-2" /> Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                    >
                      <FaSave className="inline mr-2" />
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              )}

              {/* Change Password & Logout */}
              <div className="mt-10 w-full flex flex-col gap-4">
                <button
                  onClick={handleChangePassword}
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <FaLock /> Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </>

  );
}
