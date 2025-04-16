// 角色管理服务

// 本地存储键名
const CHARACTERS_STORAGE_KEY = 'ai_trpg_characters';

/**
 * 获取所有角色
 * @returns {Array} 角色列表
 */
export const getAllCharacters = () => {
  try {
    const charactersJson = localStorage.getItem(CHARACTERS_STORAGE_KEY);
    return charactersJson ? JSON.parse(charactersJson) : [];
  } catch (error) {
    console.error('获取角色列表失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('本地存储内容:', localStorage.getItem(CHARACTERS_STORAGE_KEY));
    return [];
  }
};

/**
 * 获取单个角色
 * @param {number} id 角色ID
 * @returns {Object|null} 角色对象或null
 */
export const getCharacterById = (id) => {
  try {
    const characters = getAllCharacters();
    return characters.find(char => char.id === id) || null;
  } catch (error) {
    console.error(`获取角色(ID: ${id})失败:`, error);
    console.error('错误堆栈:', error.stack);
    return null;
  }
};

/**
 * 获取特定世界的所有角色
 * @param {number} worldId 世界ID
 * @returns {Array} 角色列表
 */
export const getCharactersByWorldId = (worldId) => {
  try {
    const characters = getAllCharacters();
    return characters.filter(char => char.worldId === worldId);
  } catch (error) {
    console.error(`获取世界(ID: ${worldId})的角色列表失败:`, error);
    console.error('错误堆栈:', error.stack);
    return [];
  }
};

/**
 * 创建新角色
 * @param {Object} character 角色对象
 * @returns {Object} 创建后的角色对象(包含ID)
 */
export const createCharacter = (character) => {
  try {
    const characters = getAllCharacters();
    
    // 生成新ID
    const newId = characters.length > 0 
      ? Math.max(...characters.map(char => char.id)) + 1 
      : 1;
    
    // 创建新角色对象
    const newCharacter = {
      ...character,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // 保存到本地存储
    localStorage.setItem(
      CHARACTERS_STORAGE_KEY, 
      JSON.stringify([...characters, newCharacter])
    );
    
    return newCharacter;
  } catch (error) {
    console.error('创建角色失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('请求参数:', character);
    throw error;
  }
};

/**
 * 更新角色
 * @param {number} id 角色ID
 * @param {Object} updates 更新内容
 * @returns {Object|null} 更新后的角色对象或null
 */
export const updateCharacter = (id, updates) => {
  try {
    const characters = getAllCharacters();
    const index = characters.findIndex(char => char.id === id);
    
    if (index === -1) {
      console.error(`未找到要更新的角色(ID: ${id})`);
      return null;
    }
    
    // 更新角色
    const updatedCharacter = {
      ...characters[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    characters[index] = updatedCharacter;
    
    // 保存到本地存储
    localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(characters));
    
    return updatedCharacter;
  } catch (error) {
    console.error(`更新角色(ID: ${id})失败:`, error);
    console.error('错误堆栈:', error.stack);
    console.error('请求参数:', updates);
    throw error;
  }
};

/**
 * 删除角色
 * @param {number} id 角色ID
 * @returns {boolean} 是否删除成功
 */
export const deleteCharacter = (id) => {
  try {
    const characters = getAllCharacters();
    const filteredCharacters = characters.filter(char => char.id !== id);
    
    if (filteredCharacters.length === characters.length) {
      console.error(`未找到要删除的角色(ID: ${id})`);
      return false;
    }
    
    // 保存到本地存储
    localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(filteredCharacters));
    
    return true;
  } catch (error) {
    console.error(`删除角色(ID: ${id})失败:`, error);
    console.error('错误堆栈:', error.stack);
    throw error;
  }
};

/**
 * 添加记忆到角色
 * @param {number} id 角色ID
 * @param {Object} memory 记忆对象
 * @returns {Object|null} 更新后的角色对象或null
 */
export const addMemoryToCharacter = (id, memory) => {
  try {
    const character = getCharacterById(id);
    
    if (!character) {
      console.error(`未找到要添加记忆的角色(ID: ${id})`);
      return null;
    }
    
    // 确保角色有memories数组
    const memories = character.memories || [];
    
    // 创建新记忆
    const newMemory = {
      ...memory,
      id: memories.length > 0 ? Math.max(...memories.map(m => m.id)) + 1 : 1,
      createdAt: new Date().toISOString()
    };
    
    // 更新角色
    return updateCharacter(id, {
      memories: [...memories, newMemory]
    });
  } catch (error) {
    console.error(`向角色(ID: ${id})添加记忆失败:`, error);
    console.error('错误堆栈:', error.stack);
    console.error('请求参数:', memory);
    throw error;
  }
};

/**
 * 移除角色的记忆
 * @param {number} characterId 角色ID
 * @param {number} memoryId 记忆ID
 * @returns {Object|null} 更新后的角色对象或null
 */
export const removeMemoryFromCharacter = (characterId, memoryId) => {
  try {
    const character = getCharacterById(characterId);
    
    if (!character || !character.memories) {
      console.error(`未找到要移除记忆的角色(ID: ${characterId})`);
      return null;
    }
    
    // 过滤掉要删除的记忆
    const updatedMemories = character.memories.filter(memory => memory.id !== memoryId);
    
    if (updatedMemories.length === character.memories.length) {
      console.error(`未找到要删除的记忆(ID: ${memoryId})`);
      return character;
    }
    
    // 更新角色
    return updateCharacter(characterId, {
      memories: updatedMemories
    });
  } catch (error) {
    console.error(`从角色(ID: ${characterId})移除记忆(ID: ${memoryId})失败:`, error);
    console.error('错误堆栈:', error.stack);
    throw error;
  }
};

/**
 * 导出角色数据
 * @returns {string} JSON字符串
 */
export const exportCharacters = () => {
  try {
    const characters = getAllCharacters();
    return JSON.stringify(characters, null, 2);
  } catch (error) {
    console.error('导出角色数据失败:', error);
    console.error('错误堆栈:', error.stack);
    throw error;
  }
};

/**
 * 导入角色数据
 * @param {string} jsonData JSON字符串
 * @returns {boolean} 是否导入成功
 */
export const importCharacters = (jsonData) => {
  try {
    const characters = JSON.parse(jsonData);
    
    if (!Array.isArray(characters)) {
      throw new Error('导入的数据不是有效的角色数组');
    }
    
    // 保存到本地存储
    localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(characters));
    
    return true;
  } catch (error) {
    console.error('导入角色数据失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('导入数据:', jsonData);
    throw error;
  }
};

// 添加一些默认的角色数据
export const initializeDefaultCharacters = () => {
  const characters = getAllCharacters();
  
  // 如果已经有数据，不初始化
  if (characters.length > 0) {
    return;
  }
  
  // 默认角色数据
  const defaultCharacters = [
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
        { id: 1, type: 'core', content: '我是迷航游轮的船长，负责引导游轮穿越时空。', createdAt: new Date().toISOString() },
        { id: 2, type: 'core', content: '我知道游轮的真正目的，但我被禁止告诉乘客。', createdAt: new Date().toISOString() }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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
        { id: 1, type: 'core', content: '我曾为军方工作，直到发现他们的秘密实验。', createdAt: new Date().toISOString() },
        { id: 2, type: 'core', content: '我的左臂和右眼是机械义体，由地下医生安装。', createdAt: new Date().toISOString() }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  // 保存到本地存储
  localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(defaultCharacters));
};
