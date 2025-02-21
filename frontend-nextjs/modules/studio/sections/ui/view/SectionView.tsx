"use client";
import { Loader2Icon } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Button } from "@/components/ui/button";
import { useSectionFormStore } from "../../store/useSectionForm";
import { SectionContainer } from "@/modules/studio/sections/ui/components/SectionContainer";
import SectionForm from "@/modules/studio/sections/ui/components/SectionForm";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSelectedListSectionStore } from "../../store/useSelectedListSectionStore";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteSection } from "@/modules/studio/sections/hooks/useDeleteSection";
import { useConfirm } from "@/hooks/useConfirm";

export const SectionView = () => {
  const { isEditing, setEditing, disableEditing } = useSectionFormStore();
  const { isAllSelected, selectedSections, toggleAllSelected, resetSelection } =
    useSelectedListSectionStore();

  const [ConfirmDelete, confirmDelete] = useConfirm(
    "Are you sure you want to delete the selected sections?",
    "Delete Section"
  );
  const deleteSectionMutation = useDeleteSection();

  const handleDeleteSection = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteSectionMutation.mutate(selectedSections, {
      onSuccess: () => {
        resetSelection();
      },
    });
  };

  return (
    <>
      <ConfirmDelete />
      <div className="space-y-4">
        <div className="sticky top-0 z-10 bg-background">
          <div className="flex items-center justify-between px-4 border-b py-3">
            <h1 className="text-xl font-bold">Sections</h1>
            <Button onClick={() => setEditing()}>Add Section</Button>
          </div>
          <AnimatePresence>
            {selectedSections.length > 0 && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-foreground text-background"
              >
                {deleteSectionMutation.isPending ? (
                  <div className="h-14 flex items-center">
                    <div className="px-4">
                      <Loader2Icon className="size-7 animate-spin " />
                    </div>
                    Deleting sections please wait...
                  </div>
                ) : (
                  <div className="gap-2 flex items-center">
                    <div className="border-e flex items-center flex-col ">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={() => toggleAllSelected()}
                      />
                      <p className="px-3">{selectedSections.length} selected</p>
                    </div>

                    <Button
                      variant="destructive"
                      onClick={handleDeleteSection}
                      disabled={false}
                    >
                      Delete ({selectedSections.length} Section)
                    </Button>

                    <button
                      onClick={() => {
                        resetSelection();
                      }}
                      disabled={false}
                      className="p-4 ms-auto"
                    >
                      <IoMdClose className="size-6" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <SectionContainer />
      </div>
      <Drawer
        open={isEditing}
        onClose={() => disableEditing()}
      >
        <DrawerContent
          onPointerDownOutside={(e) => e.preventDefault()}
          className="max-w-screen-2xl mx-auto"
        >
          <VisuallyHidden>
            <DrawerHeader>
              <DrawerTitle>Edit Or Create Section</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
          </VisuallyHidden>
          <DrawerFooter>
            <SectionForm />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
