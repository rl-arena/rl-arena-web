import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom' 
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import CompetitionDetail from './pages/CompetitionDetail'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  console.log('App component rendering...')
  
  return (
    <ErrorBoundary>
      {/* 🚨 HashRouter 컴포넌트로 변경합니다. */}
      <HashRouter> 
        <Layout>
          <Routes>
            {/* HashRouter를 사용하면 URL이 #/login, #/profile 형태로 바뀝니다. */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/competition/:envId" element={<CompetitionDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ErrorBoundary>
  )
}

export default App