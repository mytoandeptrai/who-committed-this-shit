import type { FC } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';

import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  markdown: string;
  components?: Components;
}

const Markdown: FC<MarkdownProps> = ({ markdown, components }) => {
  return (
    <ReactMarkdown
      components={{
        ul: ({ node, ...props }) => (
          <ul
            style={{ listStyleType: 'disc', marginLeft: 24, marginBottom: 12, overflowWrap: 'break-word' }}
            {...props}
          />
        ),
        ol: ({ node, ...props }) => (
          <ol
            style={{ listStyleType: 'decimal', marginLeft: 24, marginBottom: 12, overflowWrap: 'break-word' }}
            {...props}
          />
        ),
        li: ({ node, ...props }) => <li style={{ marginBottom: 4, overflowWrap: 'break-word' }} {...props} />,
        p: ({ node, ...props }) => <p style={{ marginBottom: 12, overflowWrap: 'break-word' }} {...props} />,
        h2: ({ node, ...props }) => (
          <h2 style={{ marginBottom: 12, fontSize: 20, fontWeight: 500, overflowWrap: 'break-word' }} {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 style={{ marginBottom: 8, fontSize: 16, fontWeight: 500, overflowWrap: 'break-word' }} {...props} />
        ),
        strong: ({ node, ...props }) => <strong style={{ fontWeight: 700, overflowWrap: 'break-word' }} {...props} />,
        code: ({ node, ...props }) => <code style={{ overflowWrap: 'break-word' }} {...props} />,
        ...components,
      }}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
