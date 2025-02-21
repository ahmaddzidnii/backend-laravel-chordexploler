import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { TbVideoPlus } from "react-icons/tb";
import { useAddChordModal } from "@/modules/studio/songs/ui/modals/AddChordsModal";

const AddEntityDropdown = () => {
  const { open } = useAddChordModal();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-xl [&_svg]:size-6 "
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
