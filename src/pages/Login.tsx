import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Captcha } from "@/components/Captcha";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/fetures/auth/auth.api";
import Cookies from "js-cookie";
import { setUser } from "@/redux/fetures/auth/auth.slice";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
type LoginFormValues = {
  username: string;
  password: string;
};

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const [captchaValid, setCaptchaValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    if (!captchaValid) {
      alert("Please complete the captcha verification.");
      return;
    }

    try {
      const res = await login(data).unwrap();

      Cookies.set("accessToken", res.data.accessToken, {
        expires: 7,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", res.data.refreshToken, {
        expires: 7,
        sameSite: "strict",
      });

      // Assume res.data.user contains full user info including name
      dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));

      toast.success("Login Successful");
    } catch (error) {
      toast.error("Login Failed");
    }

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary flex justify-center items-cente">
            <img
              src="https://i.ibb.co.com/zHGk75Sv/Chat-GPT-Image-Oct-20-2025-10-47-08-AM.png"
              alt=""
              className="h-32 w-full"
            />
          </CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* username Field */}
            <div className="space-y-2">
              <Label htmlFor="username">username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Enter your username"
                {...register("username", {
                  required: "username is required",
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Captcha */}
            <Captcha onValidate={setCaptchaValid} isValid={captchaValid} />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !captchaValid}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
