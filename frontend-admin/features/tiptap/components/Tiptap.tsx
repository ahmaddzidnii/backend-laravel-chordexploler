"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { processChordText } from "@/utils/processChordText";

interface TiptapProps {
  content?: string;
  onUpdate?: (content: string) => void;
}

const Tiptap = ({ content, onUpdate }: TiptapProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "bg-muted h-[200px] overflow-y-auto p-4 rounded-md",
      },
    },
    extensions: [StarterKit, Placeholder.configure({ placeholder: "[A]Mainnya [Bm]gitar" })],
    content: content || "",
    onUpdate: ({ editor }) => {
      const htmlChord = processChordText(editor.getText());
      console.log(htmlChord);

      onUpdate?.(editor.getText());
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
