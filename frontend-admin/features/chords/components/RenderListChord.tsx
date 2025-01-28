"use client";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { IoFilter } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/components/Pagination";
import { IoMdClose } from "react-icons/io";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSongs } from "../api/songs";
import { DataRenderer } from "@/components/DataRenderer";

const data = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Song Title ${index + 1}`,
  artist: "Artist Name",
  views: Math.floor(Math.random() * 1000),
  date: new Date().toISOString().split("T")[0],
  chord: "C Major",
}));

const getDataWithPagination = <T,>(data: T[], page: number, limit: number) => {
  return data.slice((page - 1) * limit, page * limit);
};

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

  const page = Number(searchParams.get("page") ?? 1);

  // const queryClient = useQueryClient();

  // const { data: data2, isPlaceholderData } = useQuery({
  //   queryKey: ["songs", page],
  //   queryFn: async () => getSongs(page),
  //   placeholderData: keepPreviousData,
  // });

  // console.log(data2?.pagination);

  // // Prefetch the next page!
  // useEffect(() => {
  //   if (!isPlaceholderData && data2?.pagination.has_next_page) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["songs", page],
  //       queryFn: () => getSongs(page),
  //     });
  //   }
  // }, [data2, isPlaceholderData, queryClient, page]);

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

  // Mendapatkan data untuk halaman saat ini
  const currentData = getDataWithPagination(
    data,
    Number(searchParams.get("page") ?? 1),
    Number(searchParams.get("limit") ?? 10)
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
    setSelectedItems(!isAllSelected ? currentData.map((data) => String(data.id)) : []);
  };

  const getActiveClass = (type: string) => (searchParams.get("type") == type ? "font-bold" : "");

  return (
    <>
      <div className="sticky top-0 bg-white left-0">
        <div className="flex space-x-6 text-sm font-medium mt-[23px]">
          <Link
            className={cn(getActiveClass("all"))}
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
            All
          </Link>
          <Link
            className={cn(getActiveClass("latest"))}
            href={
              pathname +
              "?" +
              createQueryString({
                type: "latest",
                page: 1,
                limit: 10,
              })
            }
          >
            Latest
          </Link>
          <Link
            className={cn(getActiveClass("draft"))}
            href={
              pathname +
              "?" +
              createQueryString({
                type: "draft",
                page: 1,
                limit: 10,
              })
            }
          >
            Draft
          </Link>
        </div>

        <div className="mt-2 border-y py-2">
          <button className="flex items-center text-sm text-gray-400">
            <IoFilter className="mr-2 size-6" />
            Filter
          </button>
        </div>

        {selectedItems.length > 0 && (
          <div className="bg-muted-foreground/80 text-background flex">
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
          </div>
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
        data={currentData}
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
                  <p className="line-clamp-1">Armada - Awas jatuh Cinta Cover Piano</p>
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
                className="hidden lg:flex w-[500px] min-w-[400px] overflow-hidden px-4 py-3 text-center items-center"
              >
                <img
                  src="https://chordexploler.is3.cloudhost.id/chordexploler/images/chexp6794e19d93e57.jpg"
                  alt="song"
                  className="aspect-square size-14 rounded-md mr-4"
                />
                <p className="hidden lg:block">Armada - Awas jatuh Cinta Cover Piano</p>
                <div className="lg:hidden flex-1 justify-start">
                  <p>Armada - Awas jatuh Cinta Cover Piano</p>
                  <p>12 views</p> <p>1 week ago</p>
                  <p>P</p>
                </div>
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

      <Pagination
        initialItemsPerPage={Number(searchParams.get("limit") ?? 10)}
        itemsPerPageOptions={[10, 20, 30, 40, 50]}
        totalItems={data.length}
        initialPage={Number(searchParams.get("page") ?? 1)}
        onItemsPerPageChange={(value) => {
          setIsAllSelected(false);
          setSelectedItems([]);
          window.history.pushState(null, "", pathname + "?" + createQueryString({ limit: value }));
        }}
        onPageChange={(newPage) => {
          setIsAllSelected(false);
          setSelectedItems([]);
          window.history.pushState(null, "", pathname + "?" + createQueryString({ page: newPage }));
        }}
      />
    </>
  );
};

export default RenderListChord;
