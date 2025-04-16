import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import WorldbookPage from './pages/WorldbookPage'
import CharactersPage from './pages/CharactersPage'
import GamePage from './pages/GamePage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import { useThemeStore } from './stores/themeStore'

function App() {
  const { theme } = useThemeStore()
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app-container min-h-screen bg-background dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="worldbook" element={<WorldbookPage />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
