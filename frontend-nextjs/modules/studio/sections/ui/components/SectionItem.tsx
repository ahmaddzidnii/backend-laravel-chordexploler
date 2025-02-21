import { Clock } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { formatSecondsToReadableTime } from "@/utils/formatTime";
import { Checkbox } from "@/components/ui/checkbox";
import { processChordTextNew } from "@/utils/processChordText";
import { useSelectedListSectionStore } from "../../store/useSelectedListSectionStore";

interface SectionItemProps {
  data: any;
  index: number;
}
export const SectionItem = ({ data, index }: SectionItemProps) => {
  const { selectedSections, toggleSelectSection } = useSelectedListSectionStore();

  const handleItemSelect = (id: string) => {
    toggleSelectSection(id);
  };

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
          className="p-4 rounded-lg border bg-background mb-4 cursor-default"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Checkbox
                id={data.name}
                checked={selectedSections.includes(data.id)}
                onCheckedChange={() => handleItemSelect(data.id)}
              />
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
          <pre
            className="mt-2"
            dangerouslySetInnerHTML={{
              __html: processChordTextNew(data.content),
            }}
          ></pre>
        </li>
      )}
    </Draggable>
  );
};
