// src/utils/useLoadUserFromCookie.ts
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/hook";
import { logOut, setUser } from "@/redux/fetures/auth/auth.slice";

type DecodedToken = {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  profilePicture: string;
  myChanel: string;
  currentStep:string
  certifications:string
  progressStatus:string
};

export function useLoadUserFromCookie() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) return;

    try {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);

      const user = {
   _id: decodedToken._id,
    name: decodedToken.name,
    role: decodedToken.role,
    email: decodedToken.email,
    currentStep: decodedToken.currentStep,
    certifications: decodedToken.certifications,
    progressStatus: decodedToken.progressStatus,
      };

      dispatch(setUser({ user, token: accessToken }));
    } catch (err) {
      console.error("Invalid token", err);
      dispatch(logOut())
    }
  }, [dispatch]);
}