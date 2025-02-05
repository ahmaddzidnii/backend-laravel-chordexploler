"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { processChordText } from "@/utils/processChordText";

const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "bg-muted h-[200px] overflow-y-auto p-4 rounded-md",
      },
    },
    extensions: [StarterKit, Placeholder.configure({ placeholder: "[A]Mainnya [Bm]gitar" })],
    content: "",
    onUpdate: ({ editor }) => {
      const htmlChord = processChordText(editor.getText());
      console.log(htmlChord);
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
