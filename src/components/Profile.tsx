import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Navbar } from "./Navbar";
import { useLoadUserFromCookie } from "@/utils/useLoadUserFromCookie";
import { useGetMyBalanceQuery } from "@/redux/fetures/auth/auth.api";
import { toast } from "sonner";

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
  const user = useLoadUserFromCookie();
  const { data: balanceData, refetch } = useGetMyBalanceQuery(
    user?._id as string,
    {
      skip: !user?._id,
    }
  );

  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const navigate = useNavigate();

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
    formData.append("profilePicture", newAvatar); // 👈 must match multer field name

    try {
      const res = await axios.post(
        `https://ssnmax.site/api/v1/ssn-user/update-profile/${user._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast("Profile picture updated successfully!");
    } catch (err) {
      console.error(err);
      toast("Failed to update profile picture.");
    }
  };

  if (!user) {
    return <div className="text-center mt-20 text-red-500">User not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 ">
      <Navbar />
      {/* Back to Home */}

      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 mt-8 h-screen">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={
                preview
                  ? preview
                  : balanceData?.data?.profilePicture ||
                    "https://static.vecteezy.com/system/resources/previews/025/463/773/non_2x/hacker-logo-design-a-mysterious-and-dangerous-hacker-illustration-vector.jpg"
              }
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
            />

            <label
              htmlFor="avatarUpload"
              className="absolute bottom-0 right-0 bg-blue-600 bg-[#006bff] text-white p-2 rounded-full cursor-pointer hover:bg-blue-700"
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
              className=" bg-[#006bff] text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Upload
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-bold text-gray-800">{user?.username}</h1>
          <p className=" mb-4">{user?.email}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#006bff] text-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <p className="text-xl font-semibold">
                ${balanceData?.data.totalPayment?.toFixed(2)}
              </p>
              <p className="">Total Recharge</p>
            </div>
            <div className="bg-[#006bff] text-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <p className="text-xl font-semibold">
                {balanceData?.data?.totalSsnBought}
              </p>
              <p className="">SSNs Bought</p>
            </div>
            <div className="bg-[#006bff] text-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <p className="text-xl font-semibold">
                {balanceData?.data?.totalInCart}
              </p>
              <p className="">Items in Cart</p>
            </div>
            <div className="bg-[#006bff] text-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <p className="text-xl font-semibold">
                ${balanceData?.data?.balance?.toFixed(2)}
              </p>
              <p className="">Current Balance</p>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-[#006bff] text-white">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Date</th>
                  <th className="px-4 py-2 border-b text-left">Amount (USD)</th>
                  <th className="px-4 py-2 border-b text-left">Method</th>
                  <th className="px-4 py-2 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {balanceData?.data?.transaction.map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      {new Date(tx.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="px-4 py-2 border-b">${tx.amount}</td>
                    <td className="px-4 py-2 border-b">{tx.coin}</td>
                    <td className="px-4 py-2 border-b text-green-500">
                      {"success"}
                    </td>
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
