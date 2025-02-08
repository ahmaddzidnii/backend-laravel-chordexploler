import { Clock } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { formatSecondsToReadableTime } from "@/utils/formatTime";
import { Checkbox } from "@/components/ui/checkbox";
import { processChordText } from "@/utils/processChordText";

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
            <div className="flex gap-2 items-center">
              <Checkbox id={data.name} />
              <h3 className="font-semibold">{data.name}</h3>
            </div>
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
              __html: processChordText(data.content),
            }}
          ></div>
        </li>
      )}
    </Draggable>
  );
};
