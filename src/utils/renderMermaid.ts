/**
 * Mermaid 图表动态渲染工具
 * 使用动态 import 避免首页加载 mermaid 的大体积
 */

let mermaidModule: typeof import('mermaid') | null = null;

async function getMermaid(): Promise<typeof import('mermaid')> {
  if (!mermaidModule) {
    mermaidModule = await import('mermaid');
    mermaidModule.default.initialize({
      startOnLoad: false,
      theme: 'default' as const,
      securityLevel: 'loose' as const,
      flowchart: { useMaxWidth: true, htmlLabels: true },
      sequence: { useMaxWidth: true },
    });
  }
  return mermaidModule;
}

/**
 * 将 Mermaid 代码渲染为 SVG 字符串
 * @param code - Mermaid 代码
 * @param id - 唯一标识，用于避免渲染冲突
 * @returns SVG 字符串
 */
export async function renderMermaid(
  code: string,
  id: string
): Promise<string> {
  const mermaid = await getMermaid();
  const { svg } = await mermaid.default.render(id, code);
  return svg;
}

/**
 * 检查给定代码块是否为 Mermaid 图表
 */
export function isMermaidCode(language: string | undefined): boolean {
  return language === 'mermaid';
}

/**
 * 提前预加载 mermaid 模块（可在用户 hover 或进入学习板块时调用）
 */
export function preloadMermaid(): void {
  getMermaid().catch(() => {
    // 静默失败，实际渲染时会重试
  });
}
