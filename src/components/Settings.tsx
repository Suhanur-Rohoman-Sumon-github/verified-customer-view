import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  useChangeEmailMutation,
  useChangePasswordMutation,
} from "@/redux/fetures/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "./Navbar";
import { useLoadUserFromCookie } from "@/utils/useLoadUserFromCookie";

interface SettingsFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EmailFormValues {
  email: string;
}

// Mock transaction history (replace with API data)
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

export default function SettingsPage() {
  const navigate = useNavigate();
  const user = useLoadUserFromCookie();

  const [activeTab, setActiveTab] = useState<"history" | "password" | "email">(
    "password"
  );

  // Password
  const [changePassword] = useChangePasswordMutation();
  const [updateEmail] = useChangeEmailMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SettingsFormValues>();
  const newPassword = watch("newPassword");

  const handlePasswordSubmit = async (data: SettingsFormValues) => {
    try {
      await changePassword({
        userId: user?._id || "",
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
        email: user?.email || "",
      }).unwrap();
      toast.success("Password updated successfully!");
      reset();
    } catch {
      toast.error("Failed to update password");
    }
  };

  // Email
  // const [updateEmail] = useUpdateEmailMutation();
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
    reset: resetEmail,
  } = useForm<EmailFormValues>({
    defaultValues: { email: user?.email || "" },
  });

  const handleEmailUpdate = async (data: EmailFormValues) => {
    try {
      await updateEmail({
        userId: user?._id || "",
        email: data.email,
      }).unwrap();
      toast.success("Email updated successfully!");
      resetEmail({ email: data.email });
    } catch {
      toast.error("Failed to update email");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      {/* Back to Home */}
      <Navbar />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 mt-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "password"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Update Password
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "email"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("email")}
        >
          Update Email
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {/* Update Password */}
        {activeTab === "password" && (
          <form
            onSubmit={handleSubmit(handlePasswordSubmit)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                type="password"
                id="oldPassword"
                placeholder="Enter old password"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-sm">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#006bff] hover:bg-[#0056cc] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        )}

        {/* Update Email */}
        {activeTab === "email" && (
          <form
            onSubmit={handleEmailSubmit(handleEmailUpdate)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter new email"
                {...registerEmail("email", { required: "Email is required" })}
              />
              {emailErrors.email && (
                <p className="text-red-500 text-sm">
                  {emailErrors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#006bff] hover:bg-[#0056cc] text-white"
            >
              Update Email
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
