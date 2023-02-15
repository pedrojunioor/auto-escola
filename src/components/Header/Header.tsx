import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import { BiUser } from 'react-icons/bi';

import { AuthContext } from "../../context/context";


import './Header.scss'
import Dropdown from 'react-bootstrap/Dropdown';
export const Header = () => {
  const { user, isLogged, handleLogout } = useContext(AuthContext)

  return (
    <div className="header-container">
      {isLogged ? 
      <Link style={{ textDecoration: "none", color: "white" }} to='/home'>LOGO</Link>
      : 
      <Link style={{ textDecoration: "none", color: "white" }} to='/'>LOGO</Link>
      }
      {isLogged &&
        <>
          <Dropdown>
            <Dropdown.Toggle
              style={{ background: "none", border: "none" }}
              id="dropdown-basic">
              <BiUser size={20}/>
            </Dropdown.Toggle>
            <Dropdown.Menu align={{ lg: 'end' }} >
              {user && <Dropdown.ItemText >{user.displayName}</Dropdown.ItemText>}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      }
    </div>
  )
}