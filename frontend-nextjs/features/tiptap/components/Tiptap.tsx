"use client";

import { useEditor, EditorContent, Node, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";

interface TiptapProps {
  content?: string;
  onUpdate?: (content: string) => void;
}

// Custom Document extension yang hanya mengizinkan satu pre
const CustomDocument = Document.extend({
  content: "preText",
});

// Custom Pre extension dengan handling enter
const PreText = Node.create({
  name: "preText",
  group: "block",
  content: "text*",
  code: true,

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        editor.commands.insertContent("\n");
        return true;
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "pre",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["pre", mergeAttributes(HTMLAttributes), 0];
  },
});

const Tiptap = ({ content, onUpdate }: TiptapProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "bg-muted h-[200px] overflow-y-auto p-4 rounded-md",
      },
    },
    extensions: [
      CustomDocument,
      Text,
      PreText,
      StarterKit.configure({
        paragraph: false, // Disable default paragraph
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
      }),
      Placeholder,
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      // const htmlChord = processChordTextNew(editor.getText());
      // console.log(htmlChord);
      const text = editor.getText();
      console.log(text);
      onUpdate?.(text);
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
