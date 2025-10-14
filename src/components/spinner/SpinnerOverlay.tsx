// components/SpinnerOverlay.tsx
import React from "react";
import Spinner from "./Spinner";

interface SpinnerOverlayProps {
  message?: string;
}

const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({
  message = "Processing...",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
      <Spinner />
      <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
    </div>
  );
};

export default SpinnerOverlay;
