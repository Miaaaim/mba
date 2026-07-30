# AGENTS.md — 浙大MBA周末4班同学共创网

## 快速开始

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器 → http://localhost:3000
npm run lint         # TypeScript 类型检查
npm run build        # 生产构建
npm run preview      # 预览生产构建
```

## 技术栈

React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + React Router v7 + Motion（动画） + Mermaid（图表，懒加载）

## 架构要点

- **路由**：`/` → HomePage（单页滚动首页），`/learning` → LearningPage（课程笔记详情）
- **样式**：粗野主义 + 手绘涂鸦风格，硬阴影 `shadow-[4px_4px_0px_#000]`、微旋转 `rotate-[-2deg]`
- **同学数据**：硬编码在 `src/data/classmates.ts`，无后端 API
- **课程数据**：Markdown 文件在 `src/data/learn/`，通过 `import.meta.glob` 动态加载
- 详细产品需求见 [docs/PRD.md](docs/PRD.md)

## 关键约定

### 静态资源引用
所有图片/资源必须使用 `import.meta.env.BASE_URL`，**禁止**硬编码 `/` 开头路径：
```ts
// ✅ 正确
const src = `${import.meta.env.BASE_URL}photos/welcome.JPG`;
// ❌ 错误——子路径部署会 404
const src = '/photos/welcome.JPG';
```

### Tailwind v4
无 `tailwind.config.js`，样式在 `src/index.css` 中通过 `@theme` 配置。自定义字体：Plus Jakarta Sans、Space Grotesk、Caveat。

### Mermaid 按需加载
Mermaid ~1MB，只能通过 `import()` 动态懒加载，**禁止**同步导入。在 hover 时可用 `preloadMermaid()` 预加载。

## ⚠️ 常见坑

1. **线上空白页**：通常是因为 Router basename 与 `BASE_URL` 不匹配，或静态资源用了硬编码绝对路径。检查 `src/App.tsx` 中的 basename 逻辑和所有 `import.meta.env.BASE_URL` 引用。
2. **部署用 `build:cloud`**：云端环境需 rebuild 原生模块（`@tailwindcss/oxide`、`esbuild`），不要用普通 `build`。
3. **课程文件命名**：必须匹配 `C{编号}_{序号}_课程名第{N}课_{笔记|记忆图}.md`，否则会被 `parseLessons()` 忽略。
4. **`@` 别名指向根目录**：`@/src/components/...` 而非 `@/components/...`，不过当前项目统一使用相对路径。
