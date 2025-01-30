"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState, useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { getSongs } from "@/features/chords/api/songs";
import { DataRenderer } from "@/components/DataRenderer";

const EmptyFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] w-full">
      <img
        src="/img/vector-fallback.png"
        alt="empty"
      />
      <p className="font-semibold">Data not found</p>
    </div>
  );
};

const ErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] w-full">
      <img
        src="/img/vector-fallback.png"
        alt="error"
      />
      <p className="font-semibold">Something went wrong</p>
    </div>
  );
};

const LoadingFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] w-full">
      <img
        src="/img/vector-fallback.png"
        alt="loading"
      />
      <p className="font-semibold">Loading...</p>
    </div>
  );
};

const RenderListChord = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
  const limit = Math.min(Number(searchParams.get("limit") ?? 10), 50);

  const queryClient = useQueryClient();
  const queryKey = ["songs", { page, limit }];

  const {
    data: songs,
    isPlaceholderData,
    isLoading: isLoadingSongs,
    isFetching: isFetchingSongs,
    isError: isErrorSongs,
  } = useQuery({
    queryKey,
    queryFn: async () => getSongs(page, limit),
    placeholderData: keepPreviousData,
  });

  // Prefetch the next page!
  useEffect(() => {
    if (!isPlaceholderData && songs?.pagination.has_next_page) {
      queryClient.prefetchQuery({
        queryKey,
        queryFn: () => getSongs(page, limit),
      });
    }
  }, [songs?.pagination, isPlaceholderData, queryClient, page, limit]);

  // State for managing selected items
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  /**
   * Get a new searchParams string by merging the current searchParams with a provided key/value pair
   */
  const createQueryString = useCallback(
    (updates: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Loop through each key-value pair in the updates object
      Object.entries(updates).forEach(([key, value]) => {
        params.set(key, String(value));
      });

      return params.toString();
    },
    [searchParams]
  );

  // Handle individual item selection
  const handleItemSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    setSelectedItems(!isAllSelected ? songs!!.data.map((data) => String(data.id)) : []);
  };

  const handleItemsPerPageChange = (value: number) => {
    setIsAllSelected(false);
    setSelectedItems([]);
    window.history.pushState(null, "", pathname + "?" + createQueryString({ limit: value }));
  };

  const handlePageChange = (newPage: number) => {
    setIsAllSelected(false);
    setSelectedItems([]);
    window.history.pushState(null, "", pathname + "?" + createQueryString({ page: newPage }));
  };

  return (
    <>
      <div className="sticky top-0 bg-white left-0">
        <div className="flex space-x-6 text-sm font-medium mt-[23px]">
          <Link
            href={
              pathname +
              "?" +
              createQueryString({
                type: "all",
                page: 1,
                limit: 10,
              })
            }
          >
            Song
          </Link>
        </div>

        <div className="mt-2 border-y py-2">
          <button className="flex items-center text-sm text-gray-400">
            <IoFilter className="mr-2 size-6" />
            Filter
          </button>
        </div>

        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            layout
            transition={{
              layout: {
                duration: 0.5,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.3,
              },
            }}
            className="bg-muted-foreground/80 text-background flex shadow-lg rounded-md overflow-hidden"
          >
            <div className="border-e my-1">
              <p className="p-3">{selectedItems.length}&nbsp;selected</p>
            </div>

            <button
              onClick={() => {
                setIsAllSelected(false);
                setSelectedItems([]);
              }}
              className="p-4 ms-auto"
            >
              <IoMdClose className="size-6" />
            </button>
          </motion.div>
        )}

        <div
          role="rowheader"
          className="flex border-b"
        >
          <div
            role="columnheader"
            className="w-[50px] px-4 py-3 text-center"
          >
            <Checkbox
              id="check-all"
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
          </div>
          <div
            role="columnheader"
            className="w-[500px] min-w-[400px] overflow-hidden px-4 py-3 text-center"
          >
            Song
          </div>
          <div
            role="columnheader"
            className="flex-1 px-4 py-3 text-center hidden lg:block"
          >
            Visibilitas
          </div>
          <div
            role="columnheader"
            className="flex-1 px-4 py-3 text-center hidden lg:block"
          >
            Key
          </div>
          <div
            role="columnheader"
            className="flex-1 px-4 py-3 text-center hidden lg:block"
          >
            Tanggal
          </div>
          <div
            role="columnheader"
            className="flex-1 px-4 py-3 text-center hidden lg:block"
          >
            Komentar
          </div>
          <div
            role="columnheader"
            className="flex-1 px-4 py-3 text-center hidden lg:block"
          >
            Like
          </div>
        </div>
      </div>
      <DataRenderer
        data={songs?.data}
        isLoading={isLoadingSongs || isFetchingSongs}
        isError={isErrorSongs}
        fallback={<EmptyFallback />}
        errorFallback={<ErrorFallback />}
        loadingFallback={<LoadingFallback />}
        render={(item) => {
          const itemId = String(item.id);
          const isSelected = selectedItems.includes(itemId);
          return (
            <div
              role="row"
              className={cn("flex border-b items-center", isSelected && "bg-gray-100")}
              key={itemId}
            >
              <div
                role="cell"
                className="w-[50px] px-4 py-3 text-center"
              >
                <Checkbox
                  id={itemId}
                  checked={isSelected}
                  onCheckedChange={() => handleItemSelect(itemId)}
                />
              </div>
              {/* Mobile */}
              <div
                role="cell"
                className="w-full px-4 py-3 flex items-center lg:hidden"
              >
                <img
                  src="https://chordexploler.is3.cloudhost.id/chordexploler/images/chexp6794e19d93e57.jpg"
                  alt="song"
                  className="aspect-square size-14 rounded-md mr-4"
                />
                <div className="flex-1 justify-start">
                  <p className="line-clamp-1">
                    {item.artist.join(" ,")} - {item.title}
                  </p>
                  <p className="line-clamp-1 text-sm">
                    12 views . <span>1 week ago</span>
                  </p>
                  <p className="line-clamp-1 text-xs font-bold">C Mayor</p>
                </div>
              </div>
              {/* Mobile */}

              {/* Dekstop */}
              <div
                role="cell"
                className="hidden lg:flex w-[500px] min-w-[400px] overflow-hidden px-4 py-3 text-start items-center"
              >
                <img
                  src="https://chordexploler.is3.cloudhost.id/chordexploler/images/chexp6794e19d93e57.jpg"
                  alt="song"
                  className="aspect-square size-14 rounded-md mr-4"
                />
                <p className="hidden lg:block">
                  {item.artist.join(" ,")} - {item.title}
                </p>
              </div>
              <div
                role="cell"
                className="flex-1 px-4 py-3 text-center hidden lg:block"
              >
                Draf
              </div>
              <div
                role="cell"
                className="flex-1 px-4 py-3 text-center hidden lg:block"
              >
                C
              </div>
              <div
                role="cell"
                className="flex-1 px-4 py-3 text-center hidden lg:block"
              >
                26 Mei 202
              </div>
              <div
                role="cell"
                className="flex-1 px-4 py-3 text-center hidden lg:block"
              >
                12
              </div>
              <div
                role="cell"
                className="flex-1 px-4 py-3 text-center hidden lg:block"
              >
                0
              </div>
              {/* Dekstop */}
            </div>
          );
        }}
      />

      {
        <Pagination
          pagination={songs?.pagination}
          initialItemsPerPage={Number(searchParams.get("limit") ?? 10)}
          itemsPerPageOptions={[10, 20, 30, 40, 50]}
          isPaginationLoading={isLoadingSongs || isFetchingSongs}
          hidden={isErrorSongs}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      }
    </>
  );
};

export default RenderListChord;
