import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useThemeStore } from '../stores/themeStore'

const Layout = () => {
  const location = useLocation()
  const { theme, setTheme } = useThemeStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/worldbook', label: '世界书' },
    { path: '/characters', label: '角色' },
    { path: '/game', label: '游戏' },
    { path: '/settings', label: '设置' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary dark:bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">AI-TRPG 叙事系统</h1>
            </div>
            
            {/* 桌面导航 */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`hover:text-gray-200 transition-colors ${
                    location.pathname === item.path ? 'font-bold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-primary-dark dark:hover:bg-gray-700"
                aria-label="切换主题"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </nav>
            
            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="菜单"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
          
          {/* 移动端导航菜单 */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-3 pb-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 hover:bg-primary-dark dark:hover:bg-gray-700 rounded px-3 ${
                    location.pathname === item.path ? 'font-bold bg-primary-dark dark:bg-gray-700' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="w-full text-left py-2 px-3 hover:bg-primary-dark dark:hover:bg-gray-700 rounded"
                aria-label="切换主题"
              >
                {theme === 'light' ? '🌙 夜间模式' : '☀️ 日间模式'}
              </button>
            </nav>
          )}
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} AI-TRPG 叙事系统 | 基于 React + Vite + Tailwind 构建</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
