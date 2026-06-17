"use client";

import { uploadToImageKit } from "@/lib/imagekit";
import { Icon } from "@iconify/react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { useRef, useState } from "react";

function plainTextToHtml(text: string): string {
  const lines = text.split(/\r?\n/);
  let html = "";
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (listType) { html += `</${listType}>`; listType = null; }
  };

  for (const line of lines) {
    const ulMatch = line.match(/^[ \t]*[-•*]\s+(.+)/);
    const olMatch = line.match(/^[ \t]*\d+[.)]\s+(.+)/);

    if (ulMatch) {
      if (listType === "ol") { html += "</ol>"; listType = null; }
      if (!listType) { html += "<ul>"; listType = "ul"; }
      html += `<li><p>${ulMatch[1].trim()}</p></li>`;
    } else if (olMatch) {
      if (listType === "ul") { html += "</ul>"; listType = null; }
      if (!listType) { html += "<ol>"; listType = "ol"; }
      html += `<li><p>${olMatch[1].trim()}</p></li>`;
    } else {
      flushList();
      const trimmed = line.trim();
      if (trimmed) html += `<p>${trimmed}</p>`;
    }
  }
  flushList();
  return html;
}

// ─── Toolbar primitives ───────────────────────────────────────────────────────

function Btn({
  onClick,
  active,
  title,
  disabled,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded transition-colors disabled:opacity-40 ${
        active
          ? "bg-brand-purple text-white"
          : "text-[#555] hover:bg-[#f0f0f0] hover:text-brand-purple"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-[#ddd]" />;
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────

function Toolbar({
  editor,
  onImageUpload,
  uploading,
}: {
  editor: Editor;
  onImageUpload: () => void;
  uploading: boolean;
}) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-[#ddd] bg-[#fafafa] px-2 py-1.5">
      {/* History */}
      <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <Icon icon="fa6-solid:rotate-left" className="text-xs" />
      </Btn>
      <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <Icon icon="fa6-solid:rotate-right" className="text-xs" />
      </Btn>

      <Sep />

      {/* Headings */}
      <Btn title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <span className="text-[11px] font-bold">H1</span>
      </Btn>
      <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <span className="text-[11px] font-bold">H2</span>
      </Btn>
      <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <span className="text-[11px] font-bold">H3</span>
      </Btn>

      <Sep />

      {/* Inline formatting */}
      <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Icon icon="fa6-solid:bold" className="text-xs" />
      </Btn>
      <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Icon icon="fa6-solid:italic" className="text-xs" />
      </Btn>
      <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <Icon icon="fa6-solid:underline" className="text-xs" />
      </Btn>
      <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Icon icon="fa6-solid:strikethrough" className="text-xs" />
      </Btn>
      <Btn title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
        <Icon icon="fa6-solid:code" className="text-xs" />
      </Btn>

      <Sep />

      {/* Alignment */}
      <Btn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <Icon icon="fa6-solid:align-left" className="text-xs" />
      </Btn>
      <Btn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
        <Icon icon="fa6-solid:align-center" className="text-xs" />
      </Btn>
      <Btn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
        <Icon icon="fa6-solid:align-right" className="text-xs" />
      </Btn>

      <Sep />

      {/* Lists */}
      <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <Icon icon="fa6-solid:list-ul" className="text-xs" />
      </Btn>
      <Btn title="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <Icon icon="fa6-solid:list-ol" className="text-xs" />
      </Btn>

      <Sep />

      {/* Blocks */}
      <Btn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Icon icon="fa6-solid:quote-left" className="text-xs" />
      </Btn>
      <Btn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Icon icon="fa6-solid:file-code" className="text-xs" />
      </Btn>
      <Btn title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Icon icon="mdi:minus" className="text-sm" />
      </Btn>

      <Sep />

      {/* Link */}
      <Btn title="Link" active={editor.isActive("link")} onClick={setLink}>
        <Icon icon="fa6-solid:link" className="text-xs" />
      </Btn>

      {/* Image upload */}
      <Btn title="Upload image" onClick={onImageUpload} disabled={uploading}>
        {uploading
          ? <Icon icon="fa6-solid:spinner" className="text-xs animate-spin" />
          : <Icon icon="fa6-solid:image" className="text-xs" />
        }
      </Btn>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const editorRef = useRef<Editor | null>(null);

  const editor = useEditor({
    // false avoids SSR/hydration mismatch warnings in Next.js App Router
    immediatelyRender: false,
    extensions: [
      // StarterKit v3 bundles link + underline; disable them here so our
      // separately-configured versions below are the only registered copies.
      StarterKit.configure({ link: false, underline: false }),
      Underline,
      Image.configure({ allowBase64: false, HTMLAttributes: { class: "rounded" } }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Write your content here…",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onCreate({ editor }) {
      editorRef.current = editor;
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: { class: "tiptap-prosemirror" },
      handlePaste(_view, event) {
        // Let TipTap handle HTML paste natively (preserves bullets from Word/Docs)
        const html = event.clipboardData?.getData("text/html");
        if (html) return false;

        const text = event.clipboardData?.getData("text/plain");
        if (!text) return false;

        // Only intercept if the text contains bullet/numbered list patterns
        const hasBullets = text.split(/\r?\n/).some(
          (l) => /^[ \t]*[-•*]\s+/.test(l) || /^[ \t]*\d+[.)]\s+/.test(l)
        );
        if (!hasBullets) return false;

        editorRef.current?.commands.insertContent(plainTextToHtml(text));
        return true;
      },
    },
  });

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    e.target.value = "";
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadToImageKit(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="tiptap-editor">
      {editor && (
        <Toolbar
          editor={editor}
          onImageUpload={() => fileRef.current?.click()}
          uploading={uploading}
        />
      )}
      <div className="h-[500px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
      {uploadError && (
        <p className="border-t border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
          {uploadError}
        </p>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFile}
      />
    </div>
  );
}
