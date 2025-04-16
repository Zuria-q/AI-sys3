import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  getAllCharacters,
  getCharacterById,
  getCharactersByWorldId,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  addMemoryToCharacter,
  removeMemoryFromCharacter,
  initializeDefaultCharacters
} from '../services/characterService';

export const useCharacterStore = create(
  persist(
    (set, get) => ({
      // 状态
      characters: [],
      currentCharacterId: null,
      isLoading: false,
      error: null,
      
      // 初始化
      initialize: () => {
        try {
          // 初始化默认角色
          initializeDefaultCharacters();
          
          const characters = getAllCharacters();
          set({ characters, isLoading: false, error: null });
        } catch (error) {
          console.error('初始化角色失败:', error);
          console.error('错误堆栈:', error.stack);
          set({ error: '加载角色失败', isLoading: false });
        }
      },
      
      // 加载角色
      loadCharacter: (characterId) => {
        try {
          set({ isLoading: true });
          
          const character = getCharacterById(characterId);
          
          if (!character) {
            throw new Error(`未找到角色(ID: ${characterId})`);
          }
          
          set({ 
            currentCharacterId: characterId,
            isLoading: false,
            error: null
          });
          
          return character;
        } catch (error) {
          console.error(`加载角色(ID: ${characterId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          set({ error: '加载角色失败', isLoading: false });
          return null;
        }
      },
      
      // 获取世界的所有角色
      getCharactersByWorldId: (worldId) => {
        try {
          return getCharactersByWorldId(worldId);
        } catch (error) {
          console.error(`获取世界(ID: ${worldId})的角色列表失败:`, error);
          console.error('错误堆栈:', error.stack);
          set({ error: '获取世界角色失败' });
          return [];
        }
      },
      
      // 创建新角色
      createCharacter: (characterData) => {
        try {
          set({ isLoading: true });
          
          const newCharacter = createCharacter(characterData);
          
          set(state => ({ 
            characters: [...state.characters, newCharacter],
            currentCharacterId: newCharacter.id,
            isLoading: false,
            error: null
          }));
          
          return newCharacter;
        } catch (error) {
          console.error('创建角色失败:', error);
          console.error('错误堆栈:', error.stack);
          console.error('角色数据:', characterData);
          set({ error: '创建角色失败', isLoading: false });
          return null;
        }
      },
      
      // 更新角色
      updateCharacter: (characterId, updates) => {
        try {
          set({ isLoading: true });
          
          const updatedCharacter = updateCharacter(characterId, updates);
          
          if (!updatedCharacter) {
            throw new Error(`未找到要更新的角色(ID: ${characterId})`);
          }
          
          set(state => ({
            characters: state.characters.map(character => 
              character.id === characterId ? updatedCharacter : character
            ),
            isLoading: false,
            error: null
          }));
          
          return updatedCharacter;
        } catch (error) {
          console.error(`更新角色(ID: ${characterId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          console.error('更新数据:', updates);
          set({ error: '更新角色失败', isLoading: false });
          return null;
        }
      },
      
      // 删除角色
      deleteCharacter: (characterId) => {
        try {
          set({ isLoading: true });
          
          const success = deleteCharacter(characterId);
          
          if (!success) {
            throw new Error(`未找到要删除的角色(ID: ${characterId})`);
          }
          
          set(state => ({
            characters: state.characters.filter(character => character.id !== characterId),
            currentCharacterId: state.currentCharacterId === characterId ? null : state.currentCharacterId,
            isLoading: false,
            error: null
          }));
          
          return true;
        } catch (error) {
          console.error(`删除角色(ID: ${characterId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          set({ error: '删除角色失败', isLoading: false });
          return false;
        }
      },
      
      // 添加记忆
      addMemory: (characterId, memory) => {
        try {
          set({ isLoading: true });
          
          const updatedCharacter = addMemoryToCharacter(characterId, memory);
          
          if (!updatedCharacter) {
            throw new Error(`未找到要添加记忆的角色(ID: ${characterId})`);
          }
          
          set(state => ({
            characters: state.characters.map(character => 
              character.id === characterId ? updatedCharacter : character
            ),
            isLoading: false,
            error: null
          }));
          
          return updatedCharacter;
        } catch (error) {
          console.error(`向角色(ID: ${characterId})添加记忆失败:`, error);
          console.error('错误堆栈:', error.stack);
          console.error('记忆数据:', memory);
          set({ error: '添加记忆失败', isLoading: false });
          return null;
        }
      },
      
      // 移除记忆
      removeMemory: (characterId, memoryId) => {
        try {
          set({ isLoading: true });
          
          const updatedCharacter = removeMemoryFromCharacter(characterId, memoryId);
          
          if (!updatedCharacter) {
            throw new Error(`未找到要移除记忆的角色(ID: ${characterId})`);
          }
          
          set(state => ({
            characters: state.characters.map(character => 
              character.id === characterId ? updatedCharacter : character
            ),
            isLoading: false,
            error: null
          }));
          
          return updatedCharacter;
        } catch (error) {
          console.error(`从角色(ID: ${characterId})移除记忆(ID: ${memoryId})失败:`, error);
          console.error('错误堆栈:', error.stack);
          set({ error: '移除记忆失败', isLoading: false });
          return null;
        }
      },
      
      // 清除错误
      clearError: () => set({ error: null })
    }),
    {
      name: 'character-storage', // 持久化存储的名称
    }
  )
);
