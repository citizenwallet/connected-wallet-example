import Countdown from "./countdown";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { close: string };
}) {
  const { close } = await searchParams;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-semibold">Success</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Success Content */}
        <div className="p-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Action Successful!</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Your transaction has been completed successfully.
            </p>
          </div>

          {/* Countdown */}
          <Countdown closeLink={close} />
        </div>
      </div>
    </div>
  );
}
