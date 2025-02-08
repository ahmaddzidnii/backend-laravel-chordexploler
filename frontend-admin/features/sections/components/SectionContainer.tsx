"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { SectionItem } from "./SectionItem";
import { cn } from "@/lib/utils";
import { DataRenderer } from "@/components/DataRenderer";
import { useSongId } from "@/hooks/useSongId";
import { useGetSectionsBySongId } from "../hooks/useGetSections";
import { useReorderSection } from "../hooks/useReorderSection";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const SectionContainer = () => {
  const songId = useSongId();
  const { data, isLoading } = useGetSectionsBySongId(songId);
  const reordeSection = useReorderSection();
  const queryClient = useQueryClient();

  const [orderedData, setOrderedData] = useState(data?.data ?? []);

  useEffect(() => {
    if (isLoading) return;
    setOrderedData(data?.data ?? []);
  }, [data, isLoading]);

  const handleDragEnd = (result: DropResult<string>) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if droppeed in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // User move section
    if (type === "section") {
      const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({
        ...item,
        position: index + 1,
      }));

      setOrderedData(items);
      toast.promise(
        reordeSection.mutateAsync(items, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["sections", songId],
            });
          },
        }),
        {
          loading: "Reordering sections",
          success: "Sections reordered successfully",
          error: "Failed to reorder sections",
        }
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="sections"
        type="section"
        direction="vertical"
      >
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn("flex flex-col", data?.data.length! > 0 ? "mt-4" : "mt-0")}
          >
            <DataRenderer
              fallback="No sections"
              isLoading={isLoading}
              data={orderedData}
              render={(section, index) => {
                return (
                  <SectionItem
                    key={section?.id}
                    data={section}
                    index={index}
                  />
                );
              }}
            />
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
