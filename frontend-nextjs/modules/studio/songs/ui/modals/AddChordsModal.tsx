import { z } from "zod";
import { useRef } from "react";
import { create } from "zustand";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";

import { useCreateSong } from "../../hooks/useCreateSong";
import CreateSongForm, { formCreateSongSchema } from "../components/CreateSongForm";

const AddChordsModal = () => {
  const { isOpen, close } = useAddChordModal();
  const formRef = useRef<HTMLFormElement>(null);

  const songsMutation = useCreateSong();

  const handleFormSubmit = (val: z.infer<typeof formCreateSongSchema>) => {
    songsMutation.mutate(val, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={close}
    >
      <DialogContent
        className="w-full max-w-screen-lg h-[calc(100vh-4rem)] flex flex-col"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="h-[58px] border-b flex flex-row items-center">
          <DialogTitle className="text-[20px]">Create Chord</DialogTitle>
          <div className="ms-auto">
            <button
              className="p-0 aspect-square flex"
              onClick={close}
            >
              <XIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
        <div className="flex-1 flex max-h-full overflow-y-auto scrollbar-thin pr-3">
          <CreateSongForm
            formRef={formRef}
            onFormSubmit={handleFormSubmit}
          />
        </div>
        <DialogFooter
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
          className="text-center text-sm"
        >
          <Button disabled={songsMutation.isPending}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddChordsModal;

interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useAddChordModal = create<ModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
