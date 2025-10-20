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
  balance:number
};

export function useLoadUserFromCookie() {
  const dispatch = useAppDispatch();
 const accessToken = Cookies.get("accessToken");
  useEffect(() => {
   
    if (!accessToken) return;

    try {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);

      const user = {
   _id: decodedToken._id,
    username: decodedToken.username,
    role: decodedToken.role,
   balance : decodedToken.balance,
      };

      dispatch(setUser({ user, token: accessToken }));
    } catch (err) {
      console.error("Invalid token", err);
      dispatch(logOut())
    }
  }, [dispatch,
    accessToken
  ]);
  const user = Cookies.get("accessToken") ? jwtDecode<DecodedToken>(accessToken) : null;
  return user;
}