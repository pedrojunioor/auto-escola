import React from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center " }}>
    <span>NOT FOUND</span>
    <Link to='/home' >RETORNAR </Link>
  </div>
}