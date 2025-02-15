// import { useEffect } from "react";

// import { Button } from "@/components/ui/button";
// import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
// import { Loader2Icon } from "lucide-react";

// interface InfiniteScrollProps {
//   isManual?: boolean;
//   hasNextPage: boolean;
//   isFetchingNextPage: boolean;
//   fetchNextPage: () => void;
// }

// export const InfiniteScroll = ({
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
//   isManual,
// }: InfiniteScrollProps) => {
//   const { targetRef, isIntersecting } = useIntersectionObserver({
//     threshold: 0.5,
//     rootMargin: "100px",
//   });

//   useEffect(() => {
//     if (isIntersecting && !isFetchingNextPage && hasNextPage && !isManual) {
//       fetchNextPage();
//     }
//   }, [isFetchingNextPage, isIntersecting, hasNextPage, isManual, fetchNextPage]);
//   return (
//     <div className="flex flex-col items-center gap-4 p-4">
//       <div
//         ref={targetRef}
//         className="h-1"
//       />
//       {isFetchingNextPage && (
//         <Loader2Icon
//           size={24}
//           className="animate-spin"
//         />
//       )}

//       {hasNextPage && isManual && (
//         <Button
//           variant="secondary"
//           disabled={isFetchingNextPage}
//           onClick={fetchNextPage}
//         >
//           {isFetchingNextPage ? "Loading..." : "Load More"}
//         </Button>
//       )}

//       {!hasNextPage && <p>You have reached end of the list</p>}
//     </div>
//   );
// };

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Loader2Icon } from "lucide-react";

interface InfiniteScrollProps {
  isManual?: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export const InfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isManual,
}: InfiniteScrollProps) => {
  const hasTriggered = useRef(false);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (
      isIntersecting &&
      !isFetchingNextPage &&
      hasNextPage &&
      !isManual &&
      !hasTriggered.current
    ) {
      hasTriggered.current = true;
      fetchNextPage();
    }
  }, [isFetchingNextPage, isIntersecting, hasNextPage, isManual, fetchNextPage]);

  // Reset trigger when next page is loaded
  useEffect(() => {
    if (!isFetchingNextPage) {
      hasTriggered.current = false;
    }
  }, [isFetchingNextPage]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div
        ref={targetRef}
        className="h-1"
      />
      {isFetchingNextPage && (
        <Loader2Icon
          size={24}
          className="animate-spin"
        />
      )}

      {hasNextPage && isManual && (
        <Button
          variant="secondary"
          disabled={isFetchingNextPage}
          onClick={fetchNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}

      {!hasNextPage && <p>You have reached end of the list</p>}
    </div>
  );
};
