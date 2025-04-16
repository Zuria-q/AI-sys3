// 游戏会话管理服务
import { sendMessageToLLM } from './apiService';
import { getCharacterById } from './characterService';
import { getWorldbookById } from './worldbookService';

// 本地存储键名
const GAME_SESSIONS_STORAGE_KEY = 'ai_trpg_game_sessions';
const CONVERSATIONS_STORAGE_KEY = 'ai_trpg_conversations';

/**
 * 获取所有游戏会话
 * @returns {Array} 游戏会话列表
 */
export const getAllGameSessions = () => {
  try {
    const sessionsJson = localStorage.getItem(GAME_SESSIONS_STORAGE_KEY);
    return sessionsJson ? JSON.parse(sessionsJson) : [];
  } catch (error) {
    console.error('获取游戏会话列表失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('本地存储内容:', localStorage.getItem(GAME_SESSIONS_STORAGE_KEY));
    return [];
  }
};

/**
 * 获取单个游戏会话
 * @param {number} id 会话ID
 * @returns {Object|null} 会话对象或null
 */
export const getGameSessionById = (id) => {
  try {
    const sessions = getAllGameSessions();
    return sessions.find(session => session.id === id) || null;
  } catch (error) {
    console.error(`获取游戏会话(ID: ${id})失败:`, error);
    console.error('错误堆栈:', error.stack);
    return null;
  }
};

/**
 * 创建新游戏会话
 * @param {Object} session 会话对象
 * @returns {Object} 创建后的会话对象(包含ID)
 */
export const createGameSession = (session) => {
  try {
    const sessions = getAllGameSessions();
    
    // 生成新ID
    const newId = sessions.length > 0 
      ? Math.max(...sessions.map(s => s.id)) + 1 
      : 1;
    
    // 创建新会话对象
    const newSession = {
      ...session,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    
    // 保存到本地存储
    localStorage.setItem(
      GAME_SESSIONS_STORAGE_KEY, 
      JSON.stringify([...sessions, newSession])
    );
    
    return newSession;
  } catch (error) {
    console.error('创建游戏会话失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('请求参数:', session);
    throw error;
  }
};

/**
 * 更新游戏会话
 * @param {number} id 会话ID
 * @param {Object} updates 更新内容
 * @returns {Object|null} 更新后的会话对象或null
 */
export const updateGameSession = (id, updates) => {
  try {
    const sessions = getAllGameSessions();
    const index = sessions.findIndex(session => session.id === id);
    
    if (index === -1) {
      console.error(`未找到要更新的游戏会话(ID: ${id})`);
      return null;
    }
    
    // 更新会话
    const updatedSession = {
      ...sessions[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    sessions[index] = updatedSession;
    
    // 保存到本地存储
    localStorage.setItem(GAME_SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    
    return updatedSession;
  } catch (error) {
    console.error(`更新游戏会话(ID: ${id})失败:`, error);
    console.error('错误堆栈:', error.stack);
    console.error('请求参数:', updates);
    throw error;
  }
};

/**
 * 删除游戏会话
 * @param {number} id 会话ID
 * @returns {boolean} 是否删除成功
 */
export const deleteGameSession = (id) => {
  try {
    const sessions = getAllGameSessions();
    const filteredSessions = sessions.filter(session => session.id !== id);
    
    if (filteredSessions.length === sessions.length) {
      console.error(`未找到要删除的游戏会话(ID: ${id})`);
      return false;
    }
    
    // 保存到本地存储
    localStorage.setItem(GAME_SESSIONS_STORAGE_KEY, JSON.stringify(filteredSessions));
    
    // 同时删除相关的对话记录
    const conversations = getAllConversations();
    const filteredConversations = conversations.filter(conv => conv.sessionId !== id);
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(filteredConversations));
    
    return true;
  } catch (error) {
    console.error(`删除游戏会话(ID: ${id})失败:`, error);
    console.error('错误堆栈:', error.stack);
    throw error;
  }
};

/**
 * 获取会话的所有对话
 * @param {number} sessionId 会话ID
 * @returns {Array} 对话列表
 */
export const getConversationsBySessionId = (sessionId) => {
  try {
    const conversationsJson = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    const conversations = conversationsJson ? JSON.parse(conversationsJson) : [];
    return conversations.filter(conv => conv.sessionId === sessionId);
  } catch (error) {
    console.error(`获取会话(ID: ${sessionId})的对话列表失败:`, error);
    console.error('错误堆栈:', error.stack);
    return [];
  }
};

/**
 * 添加消息到对话
 * @param {number} sessionId 会话ID
 * @param {Object} message 消息对象
 * @returns {Object} 添加后的消息对象
 */
export const addMessageToConversation = (sessionId, message) => {
  try {
    const conversations = getAllConversations();
    
    // 生成新ID
    const newId = conversations.length > 0 
      ? Math.max(...conversations.map(msg => msg.id)) + 1 
      : 1;
    
    // 创建新消息对象
    const newMessage = {
      ...message,
      id: newId,
      sessionId,
      timestamp: new Date().toISOString()
    };
    
    // 保存到本地存储
    localStorage.setItem(
      CONVERSATIONS_STORAGE_KEY, 
      JSON.stringify([...conversations, newMessage])
    );
    
    // 更新会话的最后更新时间
    updateGameSession(sessionId, {});
    
    return newMessage;
  } catch (error) {
    console.error(`向会话(ID: ${sessionId})添加消息失败:`, error);
    console.error('错误堆栈:', error.stack);
    console.error('请求参数:', message);
    throw error;
  }
};

/**
 * 获取所有对话
 * @returns {Array} 对话列表
 */
export const getAllConversations = () => {
  try {
    const conversationsJson = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    return conversationsJson ? JSON.parse(conversationsJson) : [];
  } catch (error) {
    console.error('获取所有对话失败:', error);
    console.error('错误堆栈:', error.stack);
    return [];
  }
};

/**
 * 生成角色响应
 * @param {number} characterId 角色ID
 * @param {string} playerMessage 玩家消息
 * @param {Array} conversationHistory 对话历史
 * @param {Object} options 选项
 * @returns {Promise<string>} 角色响应
 */
export const generateCharacterResponse = async (characterId, playerMessage, conversationHistory = [], options = {}) => {
  try {
    const character = getCharacterById(characterId);
    
    if (!character) {
      throw new Error(`未找到角色(ID: ${characterId})`);
    }
    
    const worldbook = character.worldId ? getWorldbookById(character.worldId) : null;
    
    // 构建提示词
    const systemPrompt = buildSystemPrompt(character, worldbook);
    
    // 构建消息历史
    const messages = [
      { role: 'system', content: systemPrompt },
      ...formatConversationHistory(conversationHistory),
      { role: 'user', content: playerMessage }
    ];
    
    // 调用LLM API
    const response = await sendMessageToLLM(messages, options);
    
    return response;
  } catch (error) {
    console.error(`生成角色(ID: ${characterId})响应失败:`, error);
    console.error('错误堆栈:', error.stack);
    console.error('玩家消息:', playerMessage);
    console.error('对话历史:', conversationHistory);
    throw error;
  }
};

/**
 * 构建系统提示词
 * @param {Object} character 角色对象
 * @param {Object} worldbook 世界书对象
 * @returns {string} 系统提示词
 */
const buildSystemPrompt = (character, worldbook) => {
  let prompt = `你是${character.name}，${character.role}。\n\n`;
  
  // 添加角色描述
  if (character.description) {
    prompt += `角色描述：${character.description}\n\n`;
  }
  
  // 添加性格特质
  if (character.personality) {
    prompt += '性格特质：\n';
    
    if (character.personality.openness !== undefined) {
      prompt += `- 开放性：${character.personality.openness}%（${character.personality.openness > 50 ? '你喜欢新体验和创新思想' : '你倾向于传统和实际的思维'}）\n`;
    }
    
    if (character.personality.conscientiousness !== undefined) {
      prompt += `- 尽责性：${character.personality.conscientiousness}%（${character.personality.conscientiousness > 50 ? '你做事有条理、可靠' : '你比较随性、灵活'}）\n`;
    }
    
    if (character.personality.extraversion !== undefined) {
      prompt += `- 外向性：${character.personality.extraversion}%（${character.personality.extraversion > 50 ? '你外向、活跃' : '你内向、安静'}）\n`;
    }
    
    if (character.personality.agreeableness !== undefined) {
      prompt += `- 亲和性：${character.personality.agreeableness}%（${character.personality.agreeableness > 50 ? '你友善、合作' : '你直接、有时有挑战性'}）\n`;
    }
    
    if (character.personality.neuroticism !== undefined) {
      prompt += `- 神经质：${character.personality.neuroticism}%（${character.personality.neuroticism > 50 ? '你情绪波动较大' : '你情绪稳定、冷静'}）\n`;
    }
    
    prompt += '\n';
  }
  
  // 添加核心记忆
  if (character.memories && character.memories.length > 0) {
    prompt += '核心记忆：\n';
    
    character.memories.forEach(memory => {
      if (memory.type === 'core') {
        prompt += `- ${memory.content}\n`;
      }
    });
    
    prompt += '\n';
  }
  
  // 添加世界设定
  if (worldbook) {
    prompt += `世界背景：${worldbook.title}\n${worldbook.description}\n\n`;
    
    if (worldbook.rules) {
      prompt += `世界规则：\n${worldbook.rules}\n\n`;
    }
  }
  
  // 添加角色扮演指导
  prompt += `请以第一人称回应，保持角色的一致性和真实感。根据你的性格特质和记忆来回应玩家的对话和行动。不要使用旁白或引号，直接以对话形式回应。`;
  
  return prompt;
};

/**
 * 格式化对话历史
 * @param {Array} conversationHistory 对话历史
 * @returns {Array} 格式化后的消息数组
 */
const formatConversationHistory = (conversationHistory) => {
  return conversationHistory.map(message => {
    if (message.sender === 'player') {
      return { role: 'user', content: message.content };
    } else if (message.sender === 'character') {
      return { role: 'assistant', content: message.content };
    } else if (message.sender === 'system') {
      return { role: 'system', content: message.content };
    }
    return null;
  }).filter(Boolean);
};

/**
 * 生成故事结局
 * @param {number} sessionId 会话ID
 * @returns {Promise<string>} 故事结局
 */
export const generateStoryEnding = async (sessionId) => {
  try {
    const session = getGameSessionById(sessionId);
    
    if (!session) {
      throw new Error(`未找到游戏会话(ID: ${sessionId})`);
    }
    
    const conversations = getConversationsBySessionId(sessionId);
    const worldbook = session.worldId ? getWorldbookById(session.worldId) : null;
    
    // 构建提示词
    let prompt = '请根据以下对话历史，生成一个合适的故事结局。结局应该考虑玩家的行动和选择，以及故事的整体发展。\n\n';
    
    if (worldbook) {
      prompt += `故事背景：${worldbook.title}\n${worldbook.description}\n\n`;
    }
    
    prompt += '对话历史摘要：\n';
    
    // 选择关键对话（为了节省token，可能需要筛选或总结）
    const keyConversations = conversations.slice(-20); // 取最后20条对话
    
    keyConversations.forEach(message => {
      if (message.sender === 'player') {
        prompt += `玩家：${message.content}\n`;
      } else if (message.sender === 'character') {
        prompt += `${message.character?.name || '角色'}：${message.content}\n`;
      }
    });
    
    prompt += '\n请生成一个300-500字的故事结局，包括以下内容：\n1. 主要情节的解决\n2. 玩家行动的后果\n3. 主要角色的命运\n4. 整体故事的主题或寓意';
    
    // 调用LLM API
    const messages = [
      { role: 'system', content: '你是一个专业的故事创作者，擅长根据已有情节创作合适的结局。' },
      { role: 'user', content: prompt }
    ];
    
    const response = await sendMessageToLLM(messages, { temperature: 0.8, maxTokens: 800 });
    
    // 更新会话状态
    updateGameSession(sessionId, {
      status: 'completed',
      ending: response
    });
    
    return response;
  } catch (error) {
    console.error(`生成故事结局失败(会话ID: ${sessionId}):`, error);
    console.error('错误堆栈:', error.stack);
    throw error;
  }
};

/**
 * 生成小说化文本
 * @param {number} sessionId 会话ID
 * @returns {Promise<string>} 小说化文本
 */
export const generateNovelization = async (sessionId) => {
  try {
    const session = getGameSessionById(sessionId);
    
    if (!session) {
      throw new Error(`未找到游戏会话(ID: ${sessionId})`);
    }
    
    const conversations = getConversationsBySessionId(sessionId);
    const worldbook = session.worldId ? getWorldbookById(session.worldId) : null;
    
    // 构建提示词
    let prompt = '请将以下对话历史转换为小说形式的文本。小说应该有流畅的叙事，生动的描写，以及适当的情感表达。\n\n';
    
    if (worldbook) {
      prompt += `故事背景：${worldbook.title}\n${worldbook.description}\n\n`;
    }
    
    prompt += '对话历史：\n';
    
    // 选择关键对话（为了节省token，可能需要筛选或总结）
    const keyConversations = conversations.slice(0, 30); // 取前30条对话
    
    keyConversations.forEach(message => {
      if (message.sender === 'player') {
        prompt += `玩家：${message.content}\n`;
      } else if (message.sender === 'character') {
        prompt += `${message.character?.name || '角色'}：${message.content}\n`;
      } else if (message.sender === 'system') {
        prompt += `[系统：${message.content}]\n`;
      }
    });
    
    prompt += '\n请将这些对话转换为小说形式，包括：\n1. 场景描写\n2. 角色内心活动\n3. 动作描写\n4. 环境氛围\n\n小说应保持原有对话的核心内容和情感，但可以适当添加细节和描写，使故事更加生动。';
    
    // 调用LLM API
    const messages = [
      { role: 'system', content: '你是一个专业的小说创作者，擅长将对话转换为生动的小说叙事。' },
      { role: 'user', content: prompt }
    ];
    
    const response = await sendMessageToLLM(messages, { temperature: 0.7, maxTokens: 1500 });
    
    // 更新会话状态
    updateGameSession(sessionId, {
      novelization: response
    });
    
    return response;
  } catch (error) {
    console.error(`生成小说化文本失败(会话ID: ${sessionId}):`, error);
    console.error('错误堆栈:', error.stack);
    throw error;
  }
};
