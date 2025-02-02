import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useAddChordModal } from "@/features/chords/modals/AddChordsModal";

const AddEntityDropdown = () => {
  const { open } = useAddChordModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-xl"
        >
          <PlusIcon className="mr-1" />
          Add
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={open}
        >
          Chord
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled
        >
          Artist
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled
        >
          Genre
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled
        >
          Playlist
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddEntityDropdown;
