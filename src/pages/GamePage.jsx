import { useState, useRef, useEffect } from 'react'

const GamePage = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'system', 
      content: '欢迎来到迷航游轮。你刚刚登上这艘神秘的游轮，它似乎航行在时空的缝隙中。请自由探索并与船上的角色互动。',
      timestamp: new Date().getTime() - 3600000
    },
    { 
      id: 2, 
      sender: 'character', 
      character: { 
        id: 1, 
        name: '艾莉娅', 
        role: '船长',
        // 移除图片引用
      }, 
      content: '欢迎登上迷航游轮，旅客。我是艾莉娅，这艘游轮的船长。你看起来有些迷茫，需要我为你指引方向吗？',
      timestamp: new Date().getTime() - 1800000
    },
    { 
      id: 3, 
      sender: 'player', 
      content: '你好，船长。这艘游轮会去往哪里？为什么我对登船前的事情记忆模糊？',
      timestamp: new Date().getTime() - 1700000
    },
    { 
      id: 4, 
      sender: 'character', 
      character: { 
        id: 1, 
        name: '艾莉娅', 
        role: '船长',
        // 移除图片引用
      }, 
      content: '这是个常见的问题，新旅客总是这样。迷航游轮并不"去往"某个地方，而是在时空的缝隙中航行。至于你的记忆...这是游轮的特性之一。别担心，随着旅程的进行，一切都会逐渐明朗。现在，你可以自由探索船上的设施，或者与其他旅客交流。',
      timestamp: new Date().getTime() - 1600000
    }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeCharacter, setActiveCharacter] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showControlPanel, setShowControlPanel] = useState(false)
  const [modelSettings, setModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 300,
    memoryEnabled: true,
    responseLength: 'medium',
    creativity: 'balanced'
  })
  
  const messagesEndRef = useRef(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return
    
    // 添加玩家消息
    const newMessage = {
      id: messages.length + 1,
      sender: 'player',
      content: inputValue,
      timestamp: new Date().getTime()
    }
    
    setMessages([...messages, newMessage])
    setInputValue('')
    setIsGenerating(true)
    
    // 模拟AI响应
    setTimeout(() => {
      setIsTyping(true)
      
      // 模拟打字效果
      setTimeout(() => {
        setIsTyping(false)
        setIsGenerating(false)
        
        // 添加AI响应
        const aiResponse = {
          id: messages.length + 2,
          sender: 'character',
          character: { 
            id: 1, 
            name: '艾莉娅', 
            role: '船长',
            // 移除图片引用
          },
          content: generateResponse(inputValue),
          timestamp: new Date().getTime()
        }
        
        setMessages(prev => [...prev, aiResponse])
      }, 2000)
    }, 1000)
  }
  
  // 简单的响应生成函数（实际项目中会替换为LLM API调用）
  const generateResponse = (input) => {
    const responses = [
      '这是个有趣的问题。在迷航游轮上，时间和空间的概念都变得模糊了。',
      '作为船长，我见过许多像你这样的旅客。每个人都有自己的故事和秘密。',
      '游轮的规则很简单：尊重他人，探索未知，接受变化。',
      '有些区域对普通旅客是关闭的。如果你想去那里，需要获得特殊许可。',
      '你的记忆会逐渐恢复，但有些事情可能永远无法记起。这是游轮的规则之一。',
      '我建议你去甲板上看看。日落时分的景色非常壮观，尤其是当我们穿越时空裂缝时。'
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  const characters = [
    { 
      id: 1, 
      name: '艾莉娅', 
      role: '船长',
      image: '/images/captain.jpg',
      active: true
    },
    { 
      id: 2, 
      name: '雷克斯', 
      role: '赏金猎人',
      active: false
    },
    { 
      id: 3, 
      name: '莫里斯', 
      role: '船医',
      active: false
    }
  ]
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">迷航游轮</h1>
        <button 
          className="btn btn-sm btn-primary"
          onClick={() => setShowControlPanel(!showControlPanel)}
        >
          {showControlPanel ? '隐藏控制面板' : '显示控制面板'}
        </button>
      </div>
      
      {showControlPanel && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">控制面板</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">温度</span>
                <span className="label-text-alt text-gray-500">{modelSettings.temperature}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={modelSettings.temperature} 
                onChange={(e) => setModelSettings({...modelSettings, temperature: parseFloat(e.target.value)})}
                className="range range-primary range-sm" 
              />
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>精确</span>
                <span>平衡</span>
                <span>创意</span>
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">响应长度</span>
              </label>
              <select 
                className="select select-bordered select-sm w-full"
                value={modelSettings.responseLength}
                onChange={(e) => setModelSettings({...modelSettings, responseLength: e.target.value})}
              >
                <option value="short">简短</option>
                <option value="medium">中等</option>
                <option value="long">详细</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">记忆系统</span>
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary toggle-sm" 
                  checked={modelSettings.memoryEnabled}
                  onChange={(e) => setModelSettings({...modelSettings, memoryEnabled: e.target.checked})}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {modelSettings.memoryEnabled ? '启用' : '禁用'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-1 gap-4 h-full">
        {/* 角色列表 */}
        <div className="w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-y-auto hidden md:block">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">场景角色</h2>
          <div className="space-y-3">
            {characters.map(character => (
              <div 
                key={character.id}
                className={`flex items-center p-2 rounded-lg cursor-pointer ${character.active ? 'bg-primary bg-opacity-10 border border-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setActiveCharacter(character.active ? null : character)}
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                    {character.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">{character.name}</h3>
                  <p className="text-xs text-gray-500">{character.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 聊天区域 */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.sender === 'player' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.sender === 'system' ? 'bg-gray-200 dark:bg-gray-700 text-center mx-auto' : message.sender === 'player' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'} rounded-lg p-3`}>
                    {message.sender === 'character' && (
                      <div className="flex items-center mb-2">
                        <div className="avatar">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                            {message.character.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{message.character.name}</span>
                          <span className="text-xs text-gray-500 ml-2">{message.character.role}</span>
                        </div>
                      </div>
                    )}
                    <p className={`text-sm ${message.sender === 'player' ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                      {message.content}
                    </p>
                    <div className={`text-xs mt-1 text-right ${message.sender === 'player' ? 'text-white text-opacity-70' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-end">
              <textarea 
                className="flex-1 textarea textarea-bordered resize-none"
                placeholder="输入你的对话或行动..."
                rows="2"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isGenerating}
              ></textarea>
              <button 
                className={`btn btn-primary ml-2 ${isGenerating ? 'loading' : ''}`}
                onClick={handleSendMessage}
                disabled={isGenerating || inputValue.trim() === ''}
              >
                {isGenerating ? '' : '发送'}
              </button>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>提示：使用 "/行动 " 前缀来描述你的行动</span>
              <span>按 Enter 发送，Shift+Enter 换行</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage
