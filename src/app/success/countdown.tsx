"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Countdown({ closeLink }: { closeLink: string }) {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Close the window/tab
          router.push(closeLink);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [closeLink, router]);

  const handleCloseNow = () => {
    router.push(closeLink);
  };

  return (
    <div className="text-center">
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        This page will close automatically in{" "}
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {countdown}
        </span>{" "}
        second{countdown !== 1 ? "s" : ""}.
      </p>
      <button
        onClick={handleCloseNow}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
      >
        Close Now
      </button>
    </div>
  );
}
