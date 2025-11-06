import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/competition/:envId" element={<CompetitionDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

export default App
