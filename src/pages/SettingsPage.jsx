import { useState } from 'react'
import { useThemeStore } from '../stores/themeStore'

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore()
  
  const [settings, setSettings] = useState({
    apiKey: '',
    apiProvider: 'openai',
    defaultModel: 'gpt-3.5-turbo',
    defaultLanguage: 'zh-CN',
    saveHistory: true,
    autoSave: true,
    developerMode: false
  })
  
  const [activeTab, setActiveTab] = useState('general')
  
  const handleSettingChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value
    })
  }
  
  const apiProviders = [
    { id: 'openai', name: 'OpenAI' },
    { id: 'deepseek', name: 'DeepSeek' },
    { id: 'claude', name: 'Claude' },
    { id: 'gemini', name: 'Gemini' },
    { id: 'local', name: '本地模型' }
  ]
  
  const models = {
    openai: [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
      { id: 'gpt-4', name: 'GPT-4' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' }
    ],
    deepseek: [
      { id: 'deepseek-chat', name: 'DeepSeek Chat' },
      { id: 'deepseek-coder', name: 'DeepSeek Coder' }
    ],
    claude: [
      { id: 'claude-instant', name: 'Claude Instant' },
      { id: 'claude-2', name: 'Claude 2' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' }
    ],
    gemini: [
      { id: 'gemini-pro', name: 'Gemini Pro' },
      { id: 'gemini-ultra', name: 'Gemini Ultra' }
    ],
    local: [
      { id: 'llama-2-7b', name: 'Llama 2 (7B)' },
      { id: 'llama-2-13b', name: 'Llama 2 (13B)' },
      { id: 'llama-3-8b', name: 'Llama 3 (8B)' },
      { id: 'mistral-7b', name: 'Mistral (7B)' }
    ]
  }
  
  const languages = [
    { id: 'zh-CN', name: '简体中文' },
    { id: 'en-US', name: 'English (US)' },
    { id: 'ja-JP', name: '日本語' },
    { id: 'ko-KR', name: '한국어' }
  ]
  
  const themes = [
    { id: 'light', name: '浅色模式', icon: '☀️' },
    { id: 'dark', name: '深色模式', icon: '🌙' },
    { id: 'fantasy', name: '奇幻主题', icon: '🧙' },
    { id: 'cyberpunk', name: '赛博朋克', icon: '🤖' }
  ]
  
  const handleSaveSettings = () => {
    // 在实际应用中，这里会保存设置到本地存储或服务器
    alert('设置已保存')
  }
  
  const handleResetSettings = () => {
    if (confirm('确定要重置所有设置吗？这将恢复默认设置。')) {
      setSettings({
        apiKey: '',
        apiProvider: 'openai',
        defaultModel: 'gpt-3.5-turbo',
        defaultLanguage: 'zh-CN',
        saveHistory: true,
        autoSave: true,
        developerMode: false
      })
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">系统设置</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'general' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => setActiveTab('general')}
          >
            常规设置
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'api' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => setActiveTab('api')}
          >
            API 设置
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'appearance' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => setActiveTab('appearance')}
          >
            外观设置
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'advanced' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => setActiveTab('advanced')}
          >
            高级设置
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">默认语言</span>
                </label>
                <select 
                  className="select select-bordered w-full"
                  value={settings.defaultLanguage}
                  onChange={(e) => handleSettingChange('defaultLanguage', e.target.value)}
                >
                  {languages.map(language => (
                    <option key={language.id} value={language.id}>{language.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-3" 
                    checked={settings.saveHistory}
                    onChange={(e) => handleSettingChange('saveHistory', e.target.checked)}
                  />
                  <div>
                    <span className="label-text text-gray-700 dark:text-gray-300">保存对话历史</span>
                    <p className="text-xs text-gray-500 mt-1">启用后将保存所有对话历史记录</p>
                  </div>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-3" 
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  />
                  <div>
                    <span className="label-text text-gray-700 dark:text-gray-300">自动保存</span>
                    <p className="text-xs text-gray-500 mt-1">启用后将自动保存世界和角色的更改</p>
                  </div>
                </label>
              </div>
            </div>
          )}
          
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">API 提供商</span>
                </label>
                <select 
                  className="select select-bordered w-full"
                  value={settings.apiProvider}
                  onChange={(e) => handleSettingChange('apiProvider', e.target.value)}
                >
                  {apiProviders.map(provider => (
                    <option key={provider.id} value={provider.id}>{provider.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">默认模型</span>
                </label>
                <select 
                  className="select select-bordered w-full"
                  value={settings.defaultModel}
                  onChange={(e) => handleSettingChange('defaultModel', e.target.value)}
                >
                  {models[settings.apiProvider].map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">API 密钥</span>
                </label>
                <input 
                  type="password" 
                  className="input input-bordered w-full" 
                  placeholder="输入您的 API 密钥"
                  value={settings.apiKey}
                  onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500">您的 API 密钥将安全地存储在本地，不会发送到任何服务器</span>
                </label>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">主题</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {themes.map(themeOption => (
                    <div 
                      key={themeOption.id}
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${theme === themeOption.id ? 'border-primary bg-primary bg-opacity-10' : 'border-gray-200 dark:border-gray-700 hover:border-primary'}`}
                      onClick={() => setTheme(themeOption.id)}
                    >
                      <div className="text-2xl mb-2">{themeOption.icon}</div>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{themeOption.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">字体大小</span>
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">小</span>
                  <input type="range" min="0" max="2" value="1" className="range range-primary flex-1" />
                  <span className="text-sm">大</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-3" 
                    checked={settings.developerMode}
                    onChange={(e) => handleSettingChange('developerMode', e.target.checked)}
                  />
                  <div>
                    <span className="label-text text-gray-700 dark:text-gray-300">开发者模式</span>
                    <p className="text-xs text-gray-500 mt-1">启用后将显示更多调试信息和高级选项</p>
                  </div>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">数据导出</span>
                </label>
                <button className="btn btn-outline">导出所有数据</button>
                <label className="label">
                  <span className="label-text-alt text-gray-500">导出所有世界、角色和对话历史记录</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300">数据导入</span>
                </label>
                <input type="file" className="file-input file-input-bordered w-full" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-300 text-red-500">危险区域</span>
                </label>
                <button 
                  className="btn btn-error"
                  onClick={handleResetSettings}
                >
                  重置所有设置
                </button>
                <label className="label">
                  <span className="label-text-alt text-gray-500">这将恢复所有设置为默认值</span>
                </label>
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              className="btn btn-primary"
              onClick={handleSaveSettings}
            >
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
