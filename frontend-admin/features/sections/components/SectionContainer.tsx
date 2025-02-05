"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { SectionItem } from "./SectionItem";
import { cn } from "@/lib/utils";
import { DataRenderer } from "@/components/DataRenderer";

interface SectionContainerProps {
  data: any[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const SectionContainer = ({ data }: SectionContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

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
        order: index,
      }));

      setOrderedData(items);
      // TODO: Update the order of the sections in the database
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
            className={cn("flex flex-col", data.length > 0 ? "mt-4" : "mt-0")}
          >
            <DataRenderer
              fallback="No sections"
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
