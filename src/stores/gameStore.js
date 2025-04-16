import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  getAllGameSessions,
  getGameSessionById,
  createGameSession,
  updateGameSession,
  deleteGameSession,
  getConversationsBySessionId,
  addMessageToConversation,
  generateCharacterResponse
} from '../services/gameService';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // 状态
      sessions: [],
      currentSessionId: null,
      messages: [],
      isLoading: false,
      isTyping: false,
      error: null,
      
      // 初始化
      initialize: () => {
        try {
          const sessions = getAllGameSessions();
          set({ sessions });
        } catch (error) {
          console.error('初始化游戏会话失败:', error);
          console.error('错误堆栈:', error.stack);
          set({ error: '加载游戏会话失败' });
        }
      },
      
      // 加载会话
      loadSession: (sessionId) => {
        try {
          const session = getGameSessionById(sessionId);
          
          if (!session) {
            throw new Error(`未找到游戏会话(ID: ${sessionId})`);
          }
          
          const messages = getConversationsBySessionId(sessionId);
          
          set({ 
            currentSessionId: sessionId,
            messages,
            error: null
          });
          
          return session;
        } catch (error) {
          console.error(`加载游戏会话(ID: ${sessionId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          set({ error: '加载游戏会话失败' });
          return null;
        }
      },
      
      // 创建新会话
      createSession: (sessionData) => {
        try {
          const newSession = createGameSession(sessionData);
          
          set(state => ({ 
            sessions: [...state.sessions, newSession],
            currentSessionId: newSession.id,
            messages: [],
            error: null
          }));
          
          return newSession;
        } catch (error) {
          console.error('创建游戏会话失败:', error);
          console.error('错误堆栈:', error.stack);
          console.error('会话数据:', sessionData);
          set({ error: '创建游戏会话失败' });
          return null;
        }
      },
      
      // 更新会话
      updateSession: (sessionId, updates) => {
        try {
          const updatedSession = updateGameSession(sessionId, updates);
          
          if (!updatedSession) {
            throw new Error(`未找到要更新的游戏会话(ID: ${sessionId})`);
          }
          
          set(state => ({
            sessions: state.sessions.map(session => 
              session.id === sessionId ? updatedSession : session
            ),
            error: null
          }));
          
          return updatedSession;
        } catch (error) {
          console.error(`更新游戏会话(ID: ${sessionId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          console.error('更新数据:', updates);
          set({ error: '更新游戏会话失败' });
          return null;
        }
      },
      
      // 删除会话
      deleteSession: (sessionId) => {
        try {
          const success = deleteGameSession(sessionId);
          
          if (!success) {
            throw new Error(`未找到要删除的游戏会话(ID: ${sessionId})`);
          }
          
          set(state => ({
            sessions: state.sessions.filter(session => session.id !== sessionId),
            currentSessionId: state.currentSessionId === sessionId ? null : state.currentSessionId,
            messages: state.currentSessionId === sessionId ? [] : state.messages,
            error: null
          }));
          
          return true;
        } catch (error) {
          console.error(`删除游戏会话(ID: ${sessionId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          set({ error: '删除游戏会话失败' });
          return false;
        }
      },
      
      // 发送消息
      sendMessage: async (content, options = {}) => {
        try {
          const { currentSessionId } = get();
          
          if (!currentSessionId) {
            throw new Error('没有活动的游戏会话');
          }
          
          // 添加玩家消息
          const playerMessage = addMessageToConversation(currentSessionId, {
            sender: 'player',
            content,
            timestamp: new Date().toISOString()
          });
          
          set(state => ({
            messages: [...state.messages, playerMessage],
            isLoading: true,
            error: null
          }));
          
          // 如果指定了角色，生成角色响应
          if (options.characterId) {
            set({ isTyping: true });
            
            // 获取对话历史（最后10条）
            const { messages } = get();
            const recentMessages = messages.slice(-10);
            
            // 生成角色响应
            const response = await generateCharacterResponse(
              options.characterId,
              content,
              recentMessages,
              options.modelSettings
            );
            
            // 添加角色响应
            const characterMessage = addMessageToConversation(currentSessionId, {
              sender: 'character',
              character: options.character,
              content: response,
              timestamp: new Date().toISOString()
            });
            
            set(state => ({
              messages: [...state.messages, characterMessage],
              isLoading: false,
              isTyping: false
            }));
            
            return characterMessage;
          }
          
          set({ isLoading: false });
          return playerMessage;
        } catch (error) {
          console.error('发送消息失败:', error);
          console.error('错误堆栈:', error.stack);
          console.error('消息内容:', content);
          console.error('选项:', options);
          set({ 
            isLoading: false, 
            isTyping: false,
            error: '发送消息失败' 
          });
          return null;
        }
      },
      
      // 清除错误
      clearError: () => set({ error: null })
    }),
    {
      name: 'game-storage', // 持久化存储的名称
    }
  )
);
