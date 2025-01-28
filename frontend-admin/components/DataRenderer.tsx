import { Children } from "react";

interface DataRendererProps<T> {
  data: T[];
  isLoading?: boolean;
  isError?: boolean;
  fallback: React.ReactNode;
  errorFallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
  render: (data: T, index: number) => React.ReactNode;
}

export const DataRenderer = <T,>({
  data,
  fallback = <div>Data Not Found</div>,
  isLoading = false,
  isError = false,
  errorFallback = <div>Error</div>,
  loadingFallback = <div>Loading...</div>,
  render,
}: DataRendererProps<T>) => {
  if (!data) return fallback;
  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (isError) {
    return <>{errorFallback}</>;
  }

  if (!data || data.length === 0) {
    return <>{fallback}</>;
  }

  return Children.toArray(data.map((item, index) => render(item, index)));
};
