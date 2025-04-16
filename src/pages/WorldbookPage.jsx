import { useState } from 'react'

const WorldbookPage = () => {
  const [worldbooks, setWorldbooks] = useState([
    {
      id: 1,
      title: '迷航游轮',
      description: '一艘神秘的游轮，航行在时空的缝隙中，乘客们来自不同的时代和世界。',
      image: '/images/cruise-ship.jpg',
      tags: ['奇幻', '悬疑', '冒险']
    },
    {
      id: 2,
      title: '赛博朋克城市',
      description: '高科技与低生活并存的未来都市，巨型企业掌控着一切，黑客和义体改造者在暗处活动。',
      image: '/images/cyberpunk-city.jpg',
      tags: ['科幻', '反乌托邦', '赛博朋克']
    }
  ])

  const [activeTab, setActiveTab] = useState('browse')

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">世界书系统</h1>
        <div className="tabs tabs-boxed">
          <button 
            className={`tab ${activeTab === 'browse' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            浏览世界
          </button>
          <button 
            className={`tab ${activeTab === 'create' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            创建世界
          </button>
        </div>
      </div>

      {activeTab === 'browse' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worldbooks.map((worldbook) => (
            <div key={worldbook.id} className="card bg-base-100 shadow-xl overflow-hidden">
              <figure className="h-48 overflow-hidden">
                <img 
                  src={worldbook.image || '/images/placeholder-world.jpg'} 
                  alt={worldbook.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110" 
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-gray-800 dark:text-gray-200">{worldbook.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{worldbook.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {worldbook.tags.map((tag, index) => (
                    <span key={index} className="badge badge-primary">{tag}</span>
                  ))}
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-primary">编辑</button>
                  <button className="btn btn-primary">开始游戏</button>
                </div>
              </div>
            </div>
          ))}

          <div className="card bg-base-100 shadow-xl border-2 border-dashed border-gray-300 flex items-center justify-center h-full min-h-[320px]">
            <div className="text-center p-6">
              <div className="text-5xl text-gray-400 mb-4">+</div>
              <h3 className="text-xl font-bold mb-2 text-gray-600">创建新世界</h3>
              <p className="text-gray-500 mb-4">设计你自己的世界观和规则</p>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveTab('create')}
              >
                开始创建
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">创建新世界</h2>
          
          <form className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">世界名称</span>
              </label>
              <input 
                type="text" 
                placeholder="输入世界名称" 
                className="input input-bordered w-full" 
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">世界描述</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder="描述这个世界的基本设定和背景故事"
              ></textarea>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">世界类型</span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>选择世界类型</option>
                <option>奇幻</option>
                <option>科幻</option>
                <option>现代</option>
                <option>历史</option>
                <option>恐怖</option>
                <option>赛博朋克</option>
                <option>后启示录</option>
                <option>自定义</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">世界规则</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder="描述这个世界的基本规则、魔法系统或科技水平等"
              ></textarea>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">标签</span>
              </label>
              <input 
                type="text" 
                placeholder="输入标签，用逗号分隔" 
                className="input input-bordered w-full" 
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">例如：奇幻,冒险,魔法,战争</span>
              </label>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">世界图片</span>
              </label>
              <input 
                type="file" 
                className="file-input file-input-bordered w-full" 
              />
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setActiveTab('browse')}
              >
                取消
              </button>
              <button type="button" className="btn btn-primary">保存世界</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default WorldbookPage
