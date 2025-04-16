import axios from 'axios';

// 创建基础的axios实例
const api = axios.create({
  timeout: 60000, // 60秒超时
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加API密钥
api.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem('apiKey');
    const apiProvider = localStorage.getItem('apiProvider') || 'openai';
    
    if (apiKey) {
      if (apiProvider === 'openai') {
        config.headers['Authorization'] = `Bearer ${apiKey}`;
      } else if (apiProvider === 'deepseek') {
        config.headers['X-API-Key'] = apiKey;
      } else if (apiProvider === 'claude') {
        config.headers['x-api-key'] = apiKey;
      } else if (apiProvider === 'gemini') {
        config.headers['X-Goog-Api-Key'] = apiKey;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 统一错误处理
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API请求错误:', error);
    
    // 捕获错误并记录详细信息
    if (error.response) {
      // 服务器响应了，但状态码不在2xx范围内
      console.error('错误状态码:', error.response.status);
      console.error('错误数据:', error.response.data);
      console.error('错误请求参数:', error.config);
    } else if (error.request) {
      // 请求已发送但没有收到响应
      console.error('未收到响应:', error.request);
    } else {
      // 发送请求时出现问题
      console.error('请求错误:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API端点配置
const apiEndpoints = {
  openai: 'https://api.openai.com/v1/chat/completions',
  deepseek: 'https://api.deepseek.com/v1/chat/completions',
  claude: 'https://api.anthropic.com/v1/messages',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  local: 'http://localhost:8000/v1/chat/completions'
};

// 发送消息到LLM
export const sendMessageToLLM = async (messages, options = {}) => {
  try {
    const apiProvider = localStorage.getItem('apiProvider') || 'openai';
    const model = options.model || localStorage.getItem('defaultModel') || 'gpt-3.5-turbo';
    const temperature = options.temperature || 0.7;
    const maxTokens = options.maxTokens || 300;
    
    let requestData;
    let endpoint = apiEndpoints[apiProvider];
    
    // 根据不同的API提供商构造请求数据
    switch (apiProvider) {
      case 'openai':
        requestData = {
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        };
        break;
        
      case 'deepseek':
        requestData = {
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
        };
        break;
        
      case 'claude':
        // 转换消息格式为Claude API格式
        const claudeMessages = messages.map(msg => {
          if (msg.role === 'user') return { role: 'user', content: msg.content };
          if (msg.role === 'assistant') return { role: 'assistant', content: msg.content };
          if (msg.role === 'system') return { role: 'system', content: msg.content };
          return null;
        }).filter(Boolean);
        
        requestData = {
          model,
          messages: claudeMessages,
          max_tokens: maxTokens,
          temperature,
        };
        break;
        
      case 'gemini':
        // 转换消息格式为Gemini API格式
        const geminiContent = {
          parts: messages.map(msg => ({
            text: msg.content
          }))
        };
        
        requestData = {
          contents: [geminiContent],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
            topP: 1,
          }
        };
        break;
        
      case 'local':
        requestData = {
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
        };
        break;
        
      default:
        throw new Error(`不支持的API提供商: ${apiProvider}`);
    }
    
    const response = await api.post(endpoint, requestData);
    
    // 根据不同的API提供商解析响应
    switch (apiProvider) {
      case 'openai':
      case 'deepseek':
      case 'local':
        return response.data.choices[0].message.content;
        
      case 'claude':
        return response.data.content[0].text;
        
      case 'gemini':
        return response.data.candidates[0].content.parts[0].text;
        
      default:
        throw new Error(`不支持的API提供商: ${apiProvider}`);
    }
  } catch (error) {
    console.error('发送消息到LLM失败:', error);
    // 捕获并记录详细错误信息
    if (error.response) {
      console.error('错误状态码:', error.response.status);
      console.error('错误数据:', error.response.data);
      console.error('请求参数:', error.config.data);
    }
    throw error;
  }
};

export default api;
