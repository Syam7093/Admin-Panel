import React from 'react'
import { Link } from 'react-router-dom'
import "../../../App.css"

const Navigation = () => {
  return (
    <div className='navigation'>
      <Link to="/">User</Link>
      <Link to="/offer">Offer</Link>
    </div>
  )
}

export default Navigation
