import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';

// 使用 HashRouter 而非 BrowserRouter：腾讯云 CloudBase 静态托管（COS）没有 SPA fallback，
// 直接访问或刷新 /mba/learning 会因为桶里不存在该 key 而返回 COS 的 NoSuchKey 404。
// hash 部分不会发给服务器，服务器始终只请求 /mba/index.html，深链和刷新因此都能工作。
// 路由信息在 hash 里，与部署路径前缀无关，所以不需要 basename。
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning" element={<LearningPage />} />
      </Routes>
    </HashRouter>
  );
}
