import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

/** Wrap tables so wide ones scroll horizontally instead of breaking the layout. */
function wrapTables(html: string): string {
  return html
    .replace(/<table\b/gi, '<div class="table-wrap"><table')
    .replace(/<\/table>/gi, "</table></div>");
}

export default function BlogPostBody({ content }: Props) {
  // HTML content (written via the rich-text editor) is rendered directly;
  // older Markdown posts fall back to the Markdown renderer.
  const isHtml = content.trim().startsWith("<");

  if (isHtml) {
    return (
      <div
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: wrapTables(content) }}
      />
    );
  }

  return (
    <div className="blog-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            void node; // don't forward the mdast node to the DOM
            return (
              <div className="table-wrap">
                <table {...props} />
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
