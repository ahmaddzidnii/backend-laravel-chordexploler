import React, { Children } from "react";

interface DataRendererProps<T> {
  data: T[] | null | undefined; // Dukung null/undefined untuk kasus loading/error
  isLoading?: boolean;
  isError?: boolean;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
  render: (data: T, index: number) => React.ReactNode;
}

export const DataRenderer = <T,>({
  data,
  isLoading = false,
  isError = false,
  fallback = <div>Data Not Found</div>,
  errorFallback = <div>Error</div>,
  loadingFallback = <div>Loading...</div>,
  render,
}: DataRendererProps<T>) => {
  // Handle loading state
  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  // Handle error state
  if (isError) {
    return <>{errorFallback}</>;
  }

  // Handle empty or invalid data
  if (!Array.isArray(data) || data.length === 0) {
    return <>{fallback}</>;
  }

  // Render the data
  return <>{Children.toArray(data.map((item, index) => render(item, index)))}</>;
};
