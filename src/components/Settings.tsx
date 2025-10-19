import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/fetures/auth/auth.api";
import { useCurrentUser } from "@/utils/getCurrentUser";

interface SettingsFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const user = useCurrentUser();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SettingsFormValues>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      await changePassword({
        userId: user?._id || "",
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        email: user?.email || "",
      }).unwrap();
      toast.success("Password updated successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-[#006bff]">Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
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
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
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
    </div>
  );
}
