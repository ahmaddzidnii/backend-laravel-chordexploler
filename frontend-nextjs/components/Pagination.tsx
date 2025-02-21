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

import { Pagination as PaginationType } from "@/modules/studio/songs/api";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

interface PaginationProps {
  pagination?: PaginationType;
  isPaginationLoading?: boolean;
  hidden?: boolean;
  className?: string;
  initialItemsPerPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

const Pagination = ({
  pagination,
  itemsPerPageOptions,
  isPaginationLoading,
  hidden,
  className,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(pagination?.items.per_page ?? 10);
  const [currentPage, setCurrentPage] = useState(pagination?.current_page ?? 1);
  const totalItems = pagination?.items.total!;
  const totalPages = pagination?.last_visible_page!;
  const hasNextPage = pagination?.has_next_page!;
  const hasPreviousPage = pagination?.has_prev_page!;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    onItemsPerPageChange(value);
  };

  useEffect(() => {
    if (pagination) {
      setItemsPerPage(pagination.items.per_page);
      setCurrentPage(pagination.current_page);
    }
  }, [pagination]);

  if (!pagination || isPaginationLoading || pagination.items.count === 0 || hidden) {
    return null;
  }

  return (
    <div className={cn(" flex h-12 items-center", className)}>
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
      <NavigationButton
        icon={MdSkipPrevious}
        onClick={() => handlePageChange(1)}
        disabled={!hasPreviousPage}
      />
      <NavigationButton
        icon={MdOutlineNavigateBefore}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
      />

      <NavigationButton
        icon={MdOutlineNavigateNext}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      />

      <NavigationButton
        icon={MdSkipNext}
        onClick={() => handlePageChange(totalPages)}
        disabled={!hasNextPage}
      />
    </div>
  );
};

export default Pagination;

interface NavigationButtonProps {
  icon: IconType;
  onClick: () => void;
  classname?: string;
  disabled?: boolean;
}

const NavigationButton = ({ icon: Icon, onClick, classname, disabled }: NavigationButtonProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!disabled && (event.key === "Enter" || event.key === " ")) {
      onClick();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2",
        disabled ? "opacity-50 cursor-default" : "cursor-pointer",
        classname
      )}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <Icon className="size-8" />
    </button>
  );
};
