import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { TbVideoPlus } from "react-icons/tb";
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
          <TbVideoPlus />
          Create
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={open}
        >
          Song
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
          Playlist
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddEntityDropdown;
