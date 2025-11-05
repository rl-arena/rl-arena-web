import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          RL Arena
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
