import React from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyDataFallback = ({
  title = "Oops!",
  description = "No data found",
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="w-64 h-64 mb-6">
        <svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Circle - light gray in light mode, darker gray in dark mode */}
          <circle
            cx="120"
            cy="120"
            r="120"
            className="fill-gray-100 dark:fill-gray-800"
          />

          {/* Empty Box - adjusts color for dark mode */}
          <rect
            x="70"
            y="80"
            width="100"
            height="80"
            rx="8"
            className="fill-gray-200 dark:fill-gray-700"
          />

          {/* Box Content Lines - adjusts color for dark mode */}
          <rect
            x="85"
            y="95"
            width="70"
            height="8"
            rx="4"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <rect
            x="85"
            y="115"
            width="50"
            height="8"
            rx="4"
            className="fill-gray-300 dark:fill-gray-600"
          />

          {/* Floating Elements - adjusts color for dark mode */}
          <circle
            cx="160"
            cy="70"
            r="15"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <circle
            cx="50"
            cy="140"
            r="10"
            className="fill-gray-300 dark:fill-gray-600"
          />
          <circle
            cx="180"
            cy="160"
            r="12"
            className="fill-gray-300 dark:fill-gray-600"
          />

          {/* Dotted Lines - adjusts color for dark mode */}
          <path
            d="M65 90 L45 70"
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M175 90 L195 70"
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>

      <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">{description}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
