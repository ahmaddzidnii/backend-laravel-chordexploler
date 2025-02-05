import { Clock } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { formatSecondsToReadableTime } from "@/utils/formatTime";

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
          ref={provided.innerRef}
          className="p-4 rounded-lg border bg-background mb-4 cursor-default"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{data.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                {formatSecondsToReadableTime(data.start_time)} -{" "}
                {formatSecondsToReadableTime(data.end_time)}
              </span>
            </div>
          </div>
          <div
            {...provided.dragHandleProps}
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></div>
        </li>
      )}
    </Draggable>
  );
};
