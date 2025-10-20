import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Navbar } from "./Navbar";

type UserProfile = {
  username: string;
  email: string;
  balance: number;
  totalRecharge: number;
  totalSsnBought: number;
  cartItems: number;
  avatarUrl?: string;
};

const mockTransactions = [
  {
    id: 1,
    date: "2025-10-18",
    amount: 100,
    method: "USDT Tron",
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-10-15",
    amount: 250,
    method: "Bitcoin BTC",
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-10-10",
    amount: 500,
    method: "Ethereum ETH",
    status: "Pending",
  },
];

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/user/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Update avatar preview
  useEffect(() => {
    if (!newAvatar) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(newAvatar);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [newAvatar]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const handleAvatarUpload = async () => {
    if (!newAvatar || !user) return;

    const formData = new FormData();
    formData.append("avatar", newAvatar);

    try {
      const res = await axios.patch("/api/v1/user/update-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data); // update user info
      setNewAvatar(null);
      alert("Profile picture updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile picture.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <div className="text-center mt-20 text-red-500">User not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Navbar />
      {/* Back to Home */}

      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 mt-8">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={
                preview ||
                user?.avatarUrl ||
                "https://static.vecteezy.com/system/resources/previews/025/463/773/non_2x/hacker-logo-design-a-mysterious-and-dangerous-hacker-illustration-vector.jpg"
              }
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
            />
            <label
              htmlFor="avatarUpload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700"
            >
              <Upload />
            </label>
            <input
              type="file"
              id="avatarUpload"
              className="hidden"
              onChange={handleAvatarChange}
              accept="image/*"
            />
          </div>
          {newAvatar && (
            <button
              onClick={handleAvatarUpload}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Upload
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-bold text-gray-800">{user?.username}</h1>
          <p className="text-gray-500 mb-4">{user?.email}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <p className="text-xl font-semibold">
                ${user.totalRecharge?.toFixed(2)}
              </p>
              <p className="text-gray-500">Total Recharge</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <p className="text-xl font-semibold">{user?.totalSsnBought}</p>
              <p className="text-gray-500">SSNs Bought</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <p className="text-xl font-semibold">{user?.cartItems}</p>
              <p className="text-gray-500">Items in Cart</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <p className="text-xl font-semibold">
                ${user?.balance?.toFixed(2)}
              </p>
              <p className="text-gray-500">Current Balance</p>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Date</th>
                  <th className="px-4 py-2 border-b text-left">Amount (USD)</th>
                  <th className="px-4 py-2 border-b text-left">Method</th>
                  <th className="px-4 py-2 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{tx.date}</td>
                    <td className="px-4 py-2 border-b">${tx.amount}</td>
                    <td className="px-4 py-2 border-b">{tx.method}</td>
                    <td className="px-4 py-2 border-b">{tx.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
