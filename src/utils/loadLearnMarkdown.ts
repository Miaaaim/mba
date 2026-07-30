/**
 * 按需加载课程 Markdown 正文（Vite 动态 chunk + 内存缓存）
 */

const loaders = import.meta.glob('../data/learn/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

const cache = new Map<string, Promise<string>>();

function resolveLoader(filename: string): (() => Promise<string>) | undefined {
  const direct = loaders[`../data/learn/${filename}`];
  if (direct) return direct;

  // 兜底：按文件名后缀匹配（防止路径写法差异）
  const key = Object.keys(loaders).find((k) => k.endsWith(`/${filename}`));
  return key ? loaders[key] : undefined;
}

/** 按文件名加载 learn 目录下的 Markdown，重复请求走缓存 */
export function loadLearnMarkdown(filename: string): Promise<string> {
  const cached = cache.get(filename);
  if (cached) return cached;

  const loader = resolveLoader(filename);
  if (!loader) {
    return Promise.reject(new Error(`找不到学习资料文件：${filename}`));
  }

  const promise = loader().catch((err) => {
    cache.delete(filename);
    throw err;
  });
  cache.set(filename, promise);
  return promise;
}
