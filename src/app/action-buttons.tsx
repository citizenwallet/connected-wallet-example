"use client";

import { useRouter } from "next/navigation";

interface ActionButtonProps {
  requestTokenLink: string; // navigation to this triggers a request for tokens
  requestCalldataLink: string; // navigation to this trigges a request to execute calldata
  symbol: string;
}

export default function ActionButtons({
  requestTokenLink,
  requestCalldataLink,
  symbol,
}: ActionButtonProps) {
  const router = useRouter();

  const handleTokenLink = () => {
    router.push(requestTokenLink);
  };

  const handleCalldataLink = () => {
    router.push(requestCalldataLink);
  };

  return (
    <div>
      {/* Request Token Button */}
      <div className="mb-6">
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          onClick={handleTokenLink}
        >
          Request 1 {symbol}
        </button>
      </div>

      {/* Request Calldata Button */}
      <div className="mb-6">
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          onClick={handleCalldataLink}
        >
          Request Calldata
        </button>
      </div>
    </div>
  );
}
