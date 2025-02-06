"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tiptap from "@/features/tiptap/components/Tiptap";
import { useSectionFormStore } from "./store/useSectionForm";

const SectionForm = () => {
  const { disableEditing, isEditing } = useSectionFormStore();

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="border flex flex-col p-4 space-y-4 rounded-md"
    >
      <Input
        placeholder="Section Name"
        autoFocus
      />
      <div className="flex gap-2 flex-col md:flex-row">
        <Input placeholder="Start Time" />
        <Input placeholder="End Time" />
      </div>
      <Tiptap />
      <div>
        <Button
          variant="outline"
          className="mr-2"
          onClick={disableEditing}
        >
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </form>
  );
};

export default SectionForm;
