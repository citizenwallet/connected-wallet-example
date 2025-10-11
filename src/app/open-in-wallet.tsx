export default function OpenInWallet() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        {/* Citizen Wallet Logo/Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Citizen Wallet
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Open this example in Citizen Wallet
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-8 text-left">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            How to Open in Citizen Wallet
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Open Citizen Wallet on your mobile device
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Scan the QR code from within the app
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
