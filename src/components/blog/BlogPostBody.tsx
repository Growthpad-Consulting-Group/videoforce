import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function BlogPostBody({ content }: Props) {
  // HTML content (written via the rich-text editor) is rendered directly;
  // older Markdown posts fall back to the Markdown renderer.
  const isHtml = content.trim().startsWith("<");

  if (isHtml) {
    return (
      <div
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className="blog-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
