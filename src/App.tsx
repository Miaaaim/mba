import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';

// BASE_URL 在相对路径构建（base: './'）下是 './'，而 basename 只接受绝对路径，需兜底为 '/'。
// 同时必须去掉尾部斜杠：basename 为 '/mba/' 时，不带尾斜杠的 /mba 会被判定为不匹配而渲染空白。
const rawBase = import.meta.env.BASE_URL;
const basename = rawBase.startsWith('/') ? rawBase.replace(/\/+$/, '') || '/' : '/';

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning" element={<LearningPage />} />
      </Routes>
    </BrowserRouter>
  );
}
