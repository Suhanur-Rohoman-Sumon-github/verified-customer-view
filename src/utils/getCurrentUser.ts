// hooks/useCurrentUser.ts
import { currentUser } from "@/redux/fetures/auth/auth.slice";
import { useAppSelector } from "@/redux/hook";

export function useCurrentUser() {
  const user = useAppSelector(currentUser);
 
  return user;
}