import { useState, useEffect } from 'react';

/**
 * 自定义Hook，用于在localStorage中存储和检索数据
 * @param {string} key 存储键名
 * @param {any} initialValue 初始值
 * @returns {Array} [storedValue, setValue] 存储的值和设置函数
 */
function useLocalStorage(key, initialValue) {
  // 获取初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 从localStorage获取值
      const item = window.localStorage.getItem(key);
      // 如果存在则解析，否则返回初始值
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('从localStorage获取数据失败:', error);
      console.error('错误堆栈:', error.stack);
      console.error('键名:', key);
      // 出错时返回初始值
      return initialValue;
    }
  });

  // 当键名或值变化时更新localStorage
  useEffect(() => {
    try {
      // 将值存储到localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('保存数据到localStorage失败:', error);
      console.error('错误堆栈:', error.stack);
      console.error('键名:', key);
      console.error('值:', storedValue);
    }
  }, [key, storedValue]);

  // 返回存储的值和设置函数
  return [storedValue, setStoredValue];
}

export default useLocalStorage;
