import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@/utils/getCurrentUser";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = Cookies.get("accessToken");
  
 

  if (!accessToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">
          Please login to access this page.
        </p>
        <Navigate to="/login" replace />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
