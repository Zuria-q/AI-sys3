import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-bold mt-4 mb-6 text-gray-800 dark:text-gray-200">页面未找到</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
        看起来您尝试访问的页面不存在或已被移动。
      </p>
      <Link to="/" className="btn btn-primary">
        返回首页
      </Link>
    </div>
  )
}

export default NotFoundPage
