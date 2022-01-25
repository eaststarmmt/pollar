import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Nav, NavbarContainer, NavLogo, NavIcon, MobileIcon, NavMenu, NavItem, NavItemBtn, NavLinks, NavBtnLink } from './Navbar.elements';
import { Searchbar } from '../index';
import { Button } from '../../assets/styles/globalStyles';

// import './style.scss';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
            <MobileIcon onClick={handleClick}>{click ? <FaTimes /> : <FaBars />}</MobileIcon>

            <NavMenu onClick={handleClick} click={click}>
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
              <NavItem>
                <NavLinks to="/login" onClick={closeMobileMenu}>
                  Login
                </NavLinks>
              </NavItem>
              <NavItemBtn>
                {button ? (
                  <NavBtnLink to="/signup">
                    <Button primary>Sign Up</Button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to="/signup">
                    <Button onClick={closeMobileMenu} fontBig primary>
                      Sign Up
                    </Button>
                  </NavBtnLink>
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
