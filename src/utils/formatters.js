/**
 * 格式化时间戳为可读时间
 * @param {number|string} timestamp 时间戳或ISO日期字符串
 * @param {Object} options 格式化选项
 * @returns {string} 格式化后的时间字符串
 */
export const formatTime = (timestamp, options = {}) => {
  try {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
    
    // 默认选项
    const defaultOptions = {
      showDate: false,
      showTime: true,
      showSeconds: false,
      format: 'zh-CN' // 'zh-CN' 或 'en-US'
    };
    
    // 合并选项
    const mergedOptions = { ...defaultOptions, ...options };
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      console.error('无效的时间戳:', timestamp);
      return '无效时间';
    }
    
    // 格式化时间
    if (mergedOptions.format === 'zh-CN') {
      let result = '';
      
      if (mergedOptions.showDate) {
        result += `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 `;
      }
      
      if (mergedOptions.showTime) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        result += `${hours}:${minutes}`;
        
        if (mergedOptions.showSeconds) {
          const seconds = date.getSeconds().toString().padStart(2, '0');
          result += `:${seconds}`;
        }
      }
      
      return result.trim();
    } else {
      // 英文格式
      const options = {};
      
      if (mergedOptions.showDate) {
        options.year = 'numeric';
        options.month = 'short';
        options.day = 'numeric';
      }
      
      if (mergedOptions.showTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        
        if (mergedOptions.showSeconds) {
          options.second = '2-digit';
        }
      }
      
      return date.toLocaleString('en-US', options);
    }
  } catch (error) {
    console.error('格式化时间失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('时间戳:', timestamp);
    return '格式化错误';
  }
};

/**
 * 格式化相对时间（如"3分钟前"）
 * @param {number|string} timestamp 时间戳或ISO日期字符串
 * @returns {string} 相对时间字符串
 */
export const formatRelativeTime = (timestamp) => {
  try {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      console.error('无效的时间戳:', timestamp);
      return '无效时间';
    }
    
    // 小于1分钟
    if (diffInSeconds < 60) {
      return '刚刚';
    }
    
    // 小于1小时
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}分钟前`;
    }
    
    // 小于1天
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}小时前`;
    }
    
    // 小于1周
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}天前`;
    }
    
    // 小于1个月（按30天计算）
    if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks}周前`;
    }
    
    // 小于1年
    if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months}个月前`;
    }
    
    // 1年以上
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years}年前`;
  } catch (error) {
    console.error('格式化相对时间失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('时间戳:', timestamp);
    return '格式化错误';
  }
};

/**
 * 截断文本并添加省略号
 * @param {string} text 要截断的文本
 * @param {number} maxLength 最大长度
 * @returns {string} 截断后的文本
 */
export const truncateText = (text, maxLength = 100) => {
  try {
    if (!text) return '';
    
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.substring(0, maxLength) + '...';
  } catch (error) {
    console.error('截断文本失败:', error);
    console.error('错误堆栈:', error.stack);
    return text || '';
  }
};

/**
 * 格式化文件大小
 * @param {number} bytes 字节数
 * @returns {string} 格式化后的文件大小
 */
export const formatFileSize = (bytes) => {
  try {
    if (bytes === 0) return '0 B';
    
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  } catch (error) {
    console.error('格式化文件大小失败:', error);
    console.error('错误堆栈:', error.stack);
    console.error('字节数:', bytes);
    return '未知大小';
  }
};
