import { Clock } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";

interface SectionItemProps {
  data: any;
  index: number;
}
export const SectionItem = ({ data, index }: SectionItemProps) => {
  return (
    <Draggable
      draggableId={data.id}
      index={index}
    >
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-4 rounded-lg border bg-background mb-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{data.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                {data.start_time}s - {data.end_time}s
              </span>
            </div>
          </div>
          <p className="text-muted-foreground">{data.content}</p>
        </li>
      )}
    </Draggable>
  );
};
