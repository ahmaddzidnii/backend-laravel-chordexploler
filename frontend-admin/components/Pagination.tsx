import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MdExpandMore,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

interface PaginationProps {
  totalItems: number;
  initialPage: number;
  initialItemsPerPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

const Pagination = ({
  totalItems,
  initialPage,
  initialItemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage ?? 1);
  const [itemsPerPage, setItemsPerPage] = useState(
    itemsPerPageOptions.includes(initialItemsPerPage) ? initialItemsPerPage : itemsPerPageOptions[0]
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  useEffect(() => {
    if (initialPage!! > totalPages) {
      setCurrentPage(totalPages);
    } else if (initialPage!! < 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(initialPage);
    }
  }, [initialPage]);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    onItemsPerPageChange(value);
    setCurrentPage(1); // Reset to the first page on items per page change
  };

  return (
    <div className="mt-4 mx-auto flex h-12 items-center">
      {/* Items per page dropdown */}
      <div className="text-xs md:text-sm font-semibold hidden md:block">
        Per page:&nbsp;
        <DropdownMenu>
          <DropdownMenuTrigger className="mr-4 inline-flex items-center">
            {itemsPerPage} <MdExpandMore className="size-8 ml-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {itemsPerPageOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handleItemsPerPageChange(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Page info */}
      <div className="text-xs md:text-sm font-semibold mr-4">
        {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
        {Math.min(currentPage * itemsPerPage, totalItems)} from {totalItems}
      </div>

      {/* Navigation buttons */}
      <div>
        <MdSkipPrevious
          className={`size-8 cursor-pointer mr-4 ${
            currentPage === 1 ? "opacity-50 cursor-auto" : ""
          }`}
          onClick={() => hasPreviousPage && handlePageChange(1)}
        />
      </div>
      <div>
        <MdOutlineNavigateBefore
          className={`size-8 cursor-pointer mr-4 ${
            currentPage === 1 ? "opacity-50 cursor-auto" : ""
          }`}
          onClick={() => hasPreviousPage && handlePageChange(currentPage - 1)}
        />
      </div>
      <div>
        <MdOutlineNavigateNext
          className={`size-8 cursor-pointer mr-4 ${
            currentPage === totalPages ? "opacity-50 cursor-auto" : ""
          }`}
          onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
        />
      </div>
      <div>
        <MdSkipNext
          className={`size-8 cursor-pointer ${
            currentPage === totalPages ? "opacity-50 cursor-auto" : ""
          }`}
          onClick={() => hasNextPage && handlePageChange(totalPages)}
        />
      </div>
    </div>
  );
};

export default Pagination;
