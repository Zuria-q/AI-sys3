import { Link } from 'react-router-dom'

const HomePage = () => {
  const features = [
    {
      title: '世界书系统',
      description: '创建自定义世界观，定义背景、规则和设定',
      icon: '🌍',
      link: '/worldbook'
    },
    {
      title: '角色管理',
      description: '创建和管理具有个性、记忆和情绪的NPC',
      icon: '👤',
      link: '/characters'
    },
    {
      title: '自由互动',
      description: '与多个AI控制的NPC进行对话和行动交互',
      icon: '💬',
      link: '/game'
    },
    {
      title: '故事演化',
      description: '基于玩家行动的情节发展和结局生成',
      icon: '📚',
      link: '/game'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary dark:text-primary-light">
          AI-TRPG 叙事系统
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          模块化的AI角色扮演跑团式叙事系统，让玩家在可自定义的世界观中与多个AI控制的NPC自由互动
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/game" className="btn btn-primary bg-primary hover:bg-primary-dark px-8 py-3 rounded-lg text-white font-bold transition-colors">
            开始游戏
          </Link>
          <Link to="/worldbook" className="btn btn-outline border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-bold transition-colors">
            创建世界
          </Link>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          核心功能
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link 
              to={feature.link}
              key={index} 
              className="card-container flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 my-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          技术亮点
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="bg-primary text-white p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">大语言模型集成</h3>
              <p className="text-gray-600 dark:text-gray-400">支持多种LLM，如GPT、DeepSeek、Claude、Gemini等</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary text-white p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">智能Agent系统</h3>
              <p className="text-gray-600 dark:text-gray-400">具有性格与记忆的智能角色，能够自主思考和行动</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary text-white p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">记忆管理机制</h3>
              <p className="text-gray-600 dark:text-gray-400">长期/短期记忆系统，使角色能够记住过去的互动</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary text-white p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">控制台式调节</h3>
              <p className="text-gray-600 dark:text-gray-400">实时调整模型行为，如温度、响应长度、记忆注入</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          准备好开始您的冒险了吗？
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          创建您的世界，定义角色，开始一段由AI驱动的叙事之旅
        </p>
        <Link to="/game" className="btn btn-primary bg-primary hover:bg-primary-dark px-8 py-3 rounded-lg text-white font-bold transition-colors">
          立即开始
        </Link>
      </section>
    </div>
  )
}

export default HomePage
