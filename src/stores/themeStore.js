import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light', // 默认主题
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage', // 持久化存储的名称
    }
  )
)
