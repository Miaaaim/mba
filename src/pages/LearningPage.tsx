import { Link } from 'react-router-dom';
import { LearningDetail } from '../components/LearningDetail';
import { useLoadCourses } from '../hooks/useLoadCourses';
import { useEffect } from 'react';

export default function LearningPage() {
  const { courses, loading, error } = useLoadCourses();

  // 确保页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAF8F2] flex flex-col items-center">
      
      {/* 简洁顶部导航条 */}
      <header className="w-full sticky top-0 z-50 bg-[#FAF8F2]/75 backdrop-blur-md border-b-2 border-[#E8E0D5]">
        <div className="w-full max-w-5xl mx-auto px-4 py-4 flex items-center justify-center">
          <Link
            to="/"
            className="font-mono text-lg font-black tracking-tighter text-black hover:text-[#3A7CA5] transition-colors"
          >
            浙大MBA 26级周末4班
          </Link>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="w-full flex-1 flex flex-col items-center">
        {loading && (
          <div className="w-full max-w-5xl mx-auto px-4 py-16 flex items-center justify-center">
            <div className="flex items-center gap-3 text-gray-400">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
              <span className="text-sm">加载学习资料中...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full max-w-5xl mx-auto px-4 py-16 text-center">
            <p className="text-red-500 text-sm">加载失败：{error}</p>
          </div>
        )}

        {!loading && !error && (
          <LearningDetail courses={courses} />
        )}
      </main>

      {/* 底部版权 */}
      <footer className="w-full max-w-7xl mx-auto px-4 py-8 border-t border-gray-400/30 mt-8">
        <div className="text-center text-xs font-mono text-gray-400">
          浙ICP备2026038482号
        </div>
      </footer>
    </div>
  );
}
