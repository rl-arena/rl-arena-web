import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Main layout wrapper component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
