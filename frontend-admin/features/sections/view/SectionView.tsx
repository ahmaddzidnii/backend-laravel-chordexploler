"use client";
import { Button } from "@/components/ui/button";
import { useSectionFormStore } from "../components/store/useSectionForm";
import { SectionContainer } from "../components/SectionContainer";
import SectionForm from "../components/SectionForm";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const SectionView = () => {
  const { isEditing, setEditing, disableEditing } = useSectionFormStore();

  return (
    <>
      <div className="space-y-4">
        <div className="sticky top-0 z-10 bg-background border-b py-3">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-xl font-bold">Sections</h1>

            <Button onClick={() => setEditing()}>Add Section</Button>
          </div>
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
