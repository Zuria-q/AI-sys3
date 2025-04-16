// 世界书管理服务

// 本地存储键名
const WORLDBOOKS_STORAGE_KEY = 'ai_trpg_worldbooks';

/**
 * 获取所有世界书
 * @returns {Array} 世界书列表
 */
export const getAllWorldbooks = () => {
  try {
    const worldbooksJson = localStorage.getItem(WORLDBOOKS_STORAGE_KEY);
    return worldbooksJson ? JSON.parse(worldbooksJson) : [];
  } catch (error) {
    console.error('获取世界书列表失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('本地存储内容:', localStorage.getItem(WORLDBOOKS_STORAGE_KEY));
    return [];
  }
};

/**
 * 获取单个世界书
 * @param {number} id 世界书ID
 * @returns {Object|null} 世界书对象或null
 */
export const getWorldbookById = (id) => {
  try {
    const worldbooks = getAllWorldbooks();
    return worldbooks.find(wb => wb.id === id) || null;
  } catch (error) {
    console.error(`获取世界书(ID: ${id})失败:`, error);
    console.error('错误堆栈:', error.stack);
    return null;
  }
};

/**
 * 创建新世界书
 * @param {Object} worldbook 世界书对象
 * @returns {Object} 创建后的世界书对象(包含ID)
 */
export const createWorldbook = (worldbook) => {
  try {
    const worldbooks = getAllWorldbooks();
    
    // 生成新ID
    const newId = worldbooks.length > 0 
      ? Math.max(...worldbooks.map(wb => wb.id)) + 1 
      : 1;
    
    // 创建新世界书对象
    const newWorldbook = {
      ...worldbook,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // 保存到本地存储
    localStorage.setItem(
      WORLDBOOKS_STORAGE_KEY, 
      JSON.stringify([...worldbooks, newWorldbook])
    );
    
    return newWorldbook;
  } catch (error) {
    console.error('创建世界书失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('请求参数:', worldbook);
    throw error;
  }
};

/**
 * 更新世界书
 * @param {number} id 世界书ID
 * @param {Object} updates 更新内容
 * @returns {Object|null} 更新后的世界书对象或null
 */
export const updateWorldbook = (id, updates) => {
  try {
    const worldbooks = getAllWorldbooks();
    const index = worldbooks.findIndex(wb => wb.id === id);
    
    if (index === -1) {
      console.error(`未找到要更新的世界书(ID: ${id})`);
      return null;
    }
    
    // 更新世界书
    const updatedWorldbook = {
      ...worldbooks[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    worldbooks[index] = updatedWorldbook;
    
    // 保存到本地存储
    localStorage.setItem(WORLDBOOKS_STORAGE_KEY, JSON.stringify(worldbooks));
    
    return updatedWorldbook;
  } catch (error) {
    console.error(`更新世界书(ID: ${id})失败:`, error);
    console.error('错误堆栈:', error.stack);
    console.error('请求参数:', updates);
    throw error;
  }
};

/**
 * 删除世界书
 * @param {number} id 世界书ID
 * @returns {boolean} 是否删除成功
 */
export const deleteWorldbook = (id) => {
  try {
    const worldbooks = getAllWorldbooks();
    const filteredWorldbooks = worldbooks.filter(wb => wb.id !== id);
    
    if (filteredWorldbooks.length === worldbooks.length) {
      console.error(`未找到要删除的世界书(ID: ${id})`);
      return false;
    }
    
    // 保存到本地存储
    localStorage.setItem(WORLDBOOKS_STORAGE_KEY, JSON.stringify(filteredWorldbooks));
    
    return true;
  } catch (error) {
    console.error(`删除世界书(ID: ${id})失败:`, error);
    console.error('错误堆栈:', error.stack);
    throw error;
  }
};

/**
 * 导出世界书数据
 * @returns {string} JSON字符串
 */
export const exportWorldbooks = () => {
  try {
    const worldbooks = getAllWorldbooks();
    return JSON.stringify(worldbooks, null, 2);
  } catch (error) {
    console.error('导出世界书数据失败:', error);
    console.error('错误堆栈:', error.stack);
    throw error;
  }
};

/**
 * 导入世界书数据
 * @param {string} jsonData JSON字符串
 * @returns {boolean} 是否导入成功
 */
export const importWorldbooks = (jsonData) => {
  try {
    const worldbooks = JSON.parse(jsonData);
    
    if (!Array.isArray(worldbooks)) {
      throw new Error('导入的数据不是有效的世界书数组');
    }
    
    // 保存到本地存储
    localStorage.setItem(WORLDBOOKS_STORAGE_KEY, JSON.stringify(worldbooks));
    
    return true;
  } catch (error) {
    console.error('导入世界书数据失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('导入数据:', jsonData);
    throw error;
  }
};

// 添加一些默认的世界书数据
export const initializeDefaultWorldbooks = () => {
  const worldbooks = getAllWorldbooks();
  
  // 如果已经有数据，不初始化
  if (worldbooks.length > 0) {
    return;
  }
  
  // 默认世界书数据
  const defaultWorldbooks = [
    {
      id: 1,
      title: '迷航游轮',
      description: '一艘神秘的游轮，航行在时空的缝隙中，乘客们来自不同的时代和世界。',
      image: '/images/cruise-ship.jpg',
      tags: ['奇幻', '悬疑', '冒险'],
      type: '奇幻',
      rules: '1. 游轮有七层甲板，每层都有不同的设施和奇遇。\n2. 时间在游轮上流动不均匀，有时快有时慢。\n3. 乘客登船时会失去部分记忆，随着旅程逐渐恢复。\n4. 游轮会在不同的时空锚点停靠，乘客可以短暂离船探索。',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: '赛博朋克城市',
      description: '高科技与低生活并存的未来都市，巨型企业掌控着一切，黑客和义体改造者在暗处活动。',
      image: '/images/cyberpunk-city.jpg',
      tags: ['科幻', '反乌托邦', '赛博朋克'],
      type: '科幻',
      rules: '1. 城市分为上层区(企业和富人区)和下层区(贫民窟)。\n2. 大多数人都有不同程度的机械义体改造。\n3. 网络入侵和黑客行为普遍存在。\n4. 大型企业控制着城市的政治和经济。\n5. 义体排斥症是一种常见疾病，过度改造会导致精神崩溃。',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  // 保存到本地存储
  localStorage.setItem(WORLDBOOKS_STORAGE_KEY, JSON.stringify(defaultWorldbooks));
};
