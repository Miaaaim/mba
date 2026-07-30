import React, { useEffect, useRef, useState, useId } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderMermaid, isMermaidCode } from '../utils/renderMermaid';

// ─── Mermaid 代码块渲染组件 ────────────────────────────────────────

const MermaidBlock: React.FC<{ code: string }> = ({ code }) => {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const uniqueId = useId().replace(/[:\-]/g, '_');

  useEffect(() => {
    let cancelled = false;
    renderMermaid(code, `mermaid-${uniqueId}`)
      .then((result) => {
        if (!cancelled) setSvg(result);
      })
      .catch((err) => {
        if (!cancelled) setError(String(err));
      });
    return () => { cancelled = true; };
  }, [code]);

  if (error) {
    return (
      <div className="border-2 border-red-300 bg-red-50 rounded-lg p-4 my-4 overflow-x-auto">
        <p className="text-sm text-red-600 mb-2 font-bold">图表渲染失败</p>
        <pre className="text-xs text-red-500 whitespace-pre-wrap">{code}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-8 my-4 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
          <span className="text-sm">图表加载中...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mermaid-container my-6 overflow-x-auto rounded-lg border-2 border-[#E8E0D5] bg-[#FAFAF8] p-4 flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

// ─── 代码块组件（拦截 mermaid 语言） ──────────────────────────────

const CodeBlock: React.FC<{
  className?: string;
  children?: React.ReactNode;
  // react-markdown 传递 inline 布尔值来区分行内代码
  inline?: boolean;
}> = ({ className, children, inline }) => {
  const language = className?.replace('language-', '');
  const code = String(children ?? '').replace(/\n$/, '');

  // 行内代码
  if (inline || (!className && !String(children ?? '').includes('\n'))) {
    return (
      <code className="bg-[#F4F2ED] px-1.5 py-0.5 rounded text-sm font-mono text-[#C7254E]">
        {code}
      </code>
    );
  }

  // Mermaid 图表
  if (isMermaidCode(language)) {
    return <MermaidBlock code={code} />;
  }

  // 普通代码块
  return (
    <pre className="bg-[#F4F2ED] border-2 border-[#E8E0D5] rounded-lg p-4 my-4 overflow-x-auto text-sm leading-relaxed">
      <code className={className}>{children}</code>
    </pre>
  );
};

// ─── 主组件：Markdown 内容渲染 ────────────────────────────────────

interface LessonContentProps {
  content: string;
  /** 可选：内容标题（如"笔记"或"记忆图"） */
  label?: string;
}

export const LessonContent: React.FC<LessonContentProps> = ({
  content,
  label,
}) => {
  return (
    <div className="lesson-content font-sans text-[#2C3E50] leading-relaxed">
      {label && (
        <div className="inline-block bg-[#E8F0F6] text-[#3A7CA5] text-xs font-bold px-3 py-1 rounded-full mb-4 border border-[#D0DDE8]">
          {label}
        </div>
      )}

      <div className="prose-custom">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: CodeBlock as any,
            // 表格样式
            table: ({ children }) => (
              <div className="overflow-x-auto my-4 border-2 border-[#E8E0D5] rounded-lg">
                <table className="w-full border-collapse text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-[#2C5F8A] text-white">{children}</thead>
            ),
            th: ({ children }) => (
              <th className="px-3 py-2 text-left font-semibold border-r border-[#3A7CA5] last:border-r-0">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2 border-b border-[#E8E0D5] odd:bg-[#F7F4EF]">
                {children}
              </td>
            ),
            // 标题
            h1: ({ children }) => (
              <h1 className="text-2xl font-black text-[#1A3A4A] border-b-3 border-[#3A7CA5] pb-2 mt-6 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg font-bold text-[#2C5F8A] border-l-4 border-[#3A7CA5] pl-3 mt-8 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-bold text-[#1A3A4A] mt-6 mb-2">
                {children}
              </h3>
            ),
            // 段落
            p: ({ children }) => (
              <p className="my-3 leading-relaxed">{children}</p>
            ),
            // 引用
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#3A7CA5] bg-[#E8F0F6] my-4 px-5 py-3 rounded-r-lg text-[#3A5A70]">
                {children}
              </blockquote>
            ),
            // 列表
            ul: ({ children }) => (
              <ul className="list-disc ml-6 my-3 space-y-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal ml-6 my-3 space-y-1">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="my-1">{children}</li>
            ),
            // 强调
            strong: ({ children }) => (
              <strong className="font-bold text-[#1A3A4A]">{children}</strong>
            ),
            // 水平线
            hr: () => <hr className="border-t-2 border-[#E8E0D5] my-8" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
