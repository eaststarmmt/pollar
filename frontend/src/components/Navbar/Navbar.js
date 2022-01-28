import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Nav, NavbarContainer, NavLogo, NavIcon, MobileIcon, NavMenu, NavItem, NavItemBtn, NavLinks, NavBtnLink } from './Navbar.elements';
import { Searchbar } from '../index';
import { Button } from '../../assets/styles/globalStyles';

import { useRecoilState } from "recoil";
import { userState } from '../../atom';

// import './style.scss';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  // const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [userId, setUserId] = useRecoilState(userState)
  
  const userLogout = () => {
    setUserId([]);
    localStorage.removeItem('user');
    
  }
  
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  
  useEffect(() => {
    showButton();
  }, []);

  // userId 값이 변경될 때마다 useEffect가 실행되어 렌더링 됨 
  // testcode
  useEffect(()=> {
    console.log("recoilUserId : ", userId)
  }, [userId])

  window.addEventListener('resize', showButton);

  return (
    <>
      <IconContext.Provider value={{ color: '#6667ab' }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/" onClick={closeMobileMenu}>
              <NavIcon />
              Pollar
            </NavLogo>
            <MobileIcon >{click ? <FaTimes /> : <FaBars />}</MobileIcon>

            <NavMenu  click={click}>
              <NavItem>
                <NavLinks to="/about" onClick={closeMobileMenu}>
                  About
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/trending" onClick={closeMobileMenu}>
                  Trending
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/polls" onClick={closeMobileMenu}>
                  Polls
                </NavLinks>
              </NavItem>
            </NavMenu>
            <Searchbar />
            <NavMenu>
              {/* user */}
              {userId.length == 0 && (
                <NavItem>
                  <NavLinks to="/login" onClick={closeMobileMenu}>
                    Login
                  </NavLinks>
                </NavItem>
              )}
              <NavItemBtn>
                {userId.length == 0 ? (
                  <NavBtnLink to="/signup">
                    <Button primary>Sign Up</Button>
                  </NavBtnLink>
                ) : ( 
                    <Button primary onClick={userLogout}>
                      Logout
                    </Button>
                )}
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

