import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  getAllWorldbooks,
  getWorldbookById,
  createWorldbook,
  updateWorldbook,
  deleteWorldbook,
  initializeDefaultWorldbooks
} from '../services/worldbookService';

export const useWorldbookStore = create(
  persist(
    (set, get) => ({
      // 状态
      worldbooks: [],
      currentWorldbookId: null,
      isLoading: false,
      error: null,
      
      // 初始化
      initialize: () => {
        try {
          // 初始化默认世界书
          initializeDefaultWorldbooks();
          
          const worldbooks = getAllWorldbooks();
          set({ worldbooks, isLoading: false, error: null });
        } catch (error) {
          console.error('初始化世界书失败:', error);
          console.error('错误堆栈:', error.stack);
          set({ error: '加载世界书失败', isLoading: false });
        }
      },
      
      // 加载世界书
      loadWorldbook: (worldbookId) => {
        try {
          set({ isLoading: true });
          
          const worldbook = getWorldbookById(worldbookId);
          
          if (!worldbook) {
            throw new Error(`未找到世界书(ID: ${worldbookId})`);
          }
          
          set({ 
            currentWorldbookId: worldbookId,
            isLoading: false,
            error: null
          });
          
          return worldbook;
        } catch (error) {
          console.error(`加载世界书(ID: ${worldbookId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          set({ error: '加载世界书失败', isLoading: false });
          return null;
        }
      },
      
      // 创建新世界书
      createWorldbook: (worldbookData) => {
        try {
          set({ isLoading: true });
          
          const newWorldbook = createWorldbook(worldbookData);
          
          set(state => ({ 
            worldbooks: [...state.worldbooks, newWorldbook],
            currentWorldbookId: newWorldbook.id,
            isLoading: false,
            error: null
          }));
          
          return newWorldbook;
        } catch (error) {
          console.error('创建世界书失败:', error);
          console.error('错误堆栈:', error.stack);
          console.error('世界书数据:', worldbookData);
          set({ error: '创建世界书失败', isLoading: false });
          return null;
        }
      },
      
      // 更新世界书
      updateWorldbook: (worldbookId, updates) => {
        try {
          set({ isLoading: true });
          
          const updatedWorldbook = updateWorldbook(worldbookId, updates);
          
          if (!updatedWorldbook) {
            throw new Error(`未找到要更新的世界书(ID: ${worldbookId})`);
          }
          
          set(state => ({
            worldbooks: state.worldbooks.map(worldbook => 
              worldbook.id === worldbookId ? updatedWorldbook : worldbook
            ),
            isLoading: false,
            error: null
          }));
          
          return updatedWorldbook;
        } catch (error) {
          console.error(`更新世界书(ID: ${worldbookId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          console.error('更新数据:', updates);
          set({ error: '更新世界书失败', isLoading: false });
          return null;
        }
      },
      
      // 删除世界书
      deleteWorldbook: (worldbookId) => {
        try {
          set({ isLoading: true });
          
          const success = deleteWorldbook(worldbookId);
          
          if (!success) {
            throw new Error(`未找到要删除的世界书(ID: ${worldbookId})`);
          }
          
          set(state => ({
            worldbooks: state.worldbooks.filter(worldbook => worldbook.id !== worldbookId),
            currentWorldbookId: state.currentWorldbookId === worldbookId ? null : state.currentWorldbookId,
            isLoading: false,
            error: null
          }));
          
          return true;
        } catch (error) {
          console.error(`删除世界书(ID: ${worldbookId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          set({ error: '删除世界书失败', isLoading: false });
          return false;
        }
      },
      
      // 清除错误
      clearError: () => set({ error: null })
    }),
    {
      name: 'worldbook-storage', // 持久化存储的名称
    }
  )
);
