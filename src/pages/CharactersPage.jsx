import { useState } from 'react'

const CharactersPage = () => {
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: '艾莉娅',
      role: '船长',
      worldId: 1,
      worldName: '迷航游轮',
      personality: {
        openness: 80,
        conscientiousness: 70,
        extraversion: 60,
        agreeableness: 50,
        neuroticism: 30
      },
      description: '迷航游轮的神秘船长，知晓游轮的许多秘密，但很少直接透露。',
      image: '/images/captain.jpg',
      memories: [
        { type: 'core', content: '我是迷航游轮的船长，负责引导游轮穿越时空。' },
        { type: 'core', content: '我知道游轮的真正目的，但我被禁止告诉乘客。' }
      ]
    },
    {
      id: 2,
      name: '雷克斯',
      role: '赏金猎人',
      worldId: 2,
      worldName: '赛博朋克城市',
      personality: {
        openness: 40,
        conscientiousness: 60,
        extraversion: 30,
        agreeableness: 20,
        neuroticism: 50
      },
      description: '一名经验丰富的赏金猎人，身体有多处机械改造，对公司深感不信任。',
      image: '/images/bounty-hunter.jpg',
      memories: [
        { type: 'core', content: '我曾为军方工作，直到发现他们的秘密实验。' },
        { type: 'core', content: '我的左臂和右眼是机械义体，由地下医生安装。' }
      ]
    }
  ])

  const [activeTab, setActiveTab] = useState('browse')
  const [selectedPersonalityTrait, setSelectedPersonalityTrait] = useState(null)
  const [personalityValues, setPersonalityValues] = useState({
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50
  })

  const personalityTraits = [
    { id: 'openness', name: '开放性', description: '对新体验和创新思想的接受程度', low: '传统、实际', high: '创新、好奇' },
    { id: 'conscientiousness', name: '尽责性', description: '自律、尽责和成就导向的程度', low: '随性、灵活', high: '有条理、可靠' },
    { id: 'extraversion', name: '外向性', description: '社交活跃和寻求刺激的程度', low: '内向、安静', high: '外向、活跃' },
    { id: 'agreeableness', name: '亲和性', description: '友善、合作和利他主义的程度', low: '挑战、怀疑', high: '信任、合作' },
    { id: 'neuroticism', name: '神经质', description: '情绪不稳定和负面情绪的倾向', low: '冷静、稳定', high: '敏感、焦虑' }
  ]

  const handlePersonalityChange = (trait, value) => {
    setPersonalityValues({
      ...personalityValues,
      [trait]: value
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">角色管理</h1>
        <div className="tabs tabs-boxed">
          <button 
            className={`tab ${activeTab === 'browse' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            浏览角色
          </button>
          <button 
            className={`tab ${activeTab === 'create' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            创建角色
          </button>
        </div>
      </div>

      {activeTab === 'browse' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <div key={character.id} className="card bg-base-100 shadow-xl overflow-hidden">
              <figure className="h-48 overflow-hidden">
                <img 
                  src={character.image || '/images/placeholder-character.jpg'} 
                  alt={character.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110" 
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-gray-800 dark:text-gray-200">{character.name}</h2>
                    <p className="text-sm text-gray-500">{character.role} · {character.worldName}</p>
                  </div>
                  <div className="badge badge-secondary">{character.worldName}</div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mt-2">{character.description}</p>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">性格特质</h3>
                  <div className="space-y-2">
                    {Object.entries(character.personality).map(([trait, value]) => {
                      const traitInfo = personalityTraits.find(t => t.id === trait)
                      return (
                        <div key={trait} className="flex items-center">
                          <span className="w-24 text-sm text-gray-600 dark:text-gray-400">{traitInfo?.name}</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full" 
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-primary">编辑</button>
                  <button className="btn btn-primary">查看详情</button>
                </div>
              </div>
            </div>
          ))}

          <div className="card bg-base-100 shadow-xl border-2 border-dashed border-gray-300 flex items-center justify-center h-full min-h-[320px]">
            <div className="text-center p-6">
              <div className="text-5xl text-gray-400 mb-4">+</div>
              <h3 className="text-xl font-bold mb-2 text-gray-600">创建新角色</h3>
              <p className="text-gray-500 mb-4">设计具有个性和记忆的NPC</p>
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">创建新角色</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">角色名称</span>
                </label>
                <input 
                  type="text" 
                  placeholder="输入角色名称" 
                  className="input input-bordered w-full" 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">角色角色</span>
                </label>
                <input 
                  type="text" 
                  placeholder="例如：船长、医生、赏金猎人" 
                  className="input input-bordered w-full" 
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">所属世界</span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>选择角色所属的世界</option>
                <option value="1">迷航游轮</option>
                <option value="2">赛博朋克城市</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">角色描述</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder="描述这个角色的外貌、背景和特点"
              ></textarea>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">性格特质</span>
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                {personalityTraits.map(trait => (
                  <button
                    key={trait.id}
                    type="button"
                    className={`btn btn-sm ${selectedPersonalityTrait === trait.id ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setSelectedPersonalityTrait(trait.id)}
                  >
                    {trait.name}
                  </button>
                ))}
              </div>
              
              {selectedPersonalityTrait && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {personalityTraits.find(t => t.id === selectedPersonalityTrait)?.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {personalityValues[selectedPersonalityTrait]}%
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {personalityTraits.find(t => t.id === selectedPersonalityTrait)?.description}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500">
                      {personalityTraits.find(t => t.id === selectedPersonalityTrait)?.low}
                    </span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={personalityValues[selectedPersonalityTrait]} 
                      onChange={(e) => handlePersonalityChange(selectedPersonalityTrait, parseInt(e.target.value))}
                      className="range range-primary flex-1" 
                    />
                    <span className="text-xs text-gray-500">
                      {personalityTraits.find(t => t.id === selectedPersonalityTrait)?.high}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-2 mt-4">
                {personalityTraits.map(trait => (
                  <div key={trait.id} className="flex items-center">
                    <span className="w-24 text-sm text-gray-600 dark:text-gray-400">{trait.name}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${personalityValues[trait.id]}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-right text-sm text-gray-500">{personalityValues[trait.id]}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">核心记忆</span>
                <span className="label-text-alt text-gray-500">角色最重要的记忆，影响其行为和决策</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder="每行输入一条核心记忆"
              ></textarea>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">角色图片</span>
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
              <button type="button" className="btn btn-primary">保存角色</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default CharactersPage
