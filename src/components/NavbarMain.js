import React, { useEffect, useState } from 'react';
import Logo from "../assets/images/logo-1.png"
import MailLogo from "../assets/images/mail-logo.png"


import { FaBars, FaTimes } from 'react-icons/fa';
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';

const NavbarMain = () => {

    const [showMenu, setShowMenu] = useState(false);

    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        setShowMenu(false);
    };



    return (
        <>
            <div className='navbar_main_container'>
                <div className='short_nav_container'>
                    <div className='logo_text'>
                        <h1>Afghanistan Dashboard</h1>
                    </div>

                    <div className="main_nav__logo">
                        {/* <a href='https://mail.gov.af/en' target="_blank" without rel="noreferrer">
                            <img src={MailLogo} alt="nav_logo" />
                        </a> */}

     
                            <img src={Logo} alt="nav_logo" />



                    </div>

                    <div className="navbar__toggle scrolled" onClick={handleToggle}>
                        {showMenu ? <FaTimes /> : <FaBars />}
                    </div>


                </div>


                <div className='navbar_container'>

                    {/* <div className="navbar__logo">
                        <Link to="/">
                            <img src={Logo} alt="nav_logo" />
                        </Link>
                    </div> */}



                    <div className={`main_nav ${showMenu ? 'show' : ''}`}>
                        <div className="nav__content">
                            {/* <div className="main_nav_logo">
                                <Link to="/" onClick={handleLinkClick}>
                                    <img src={Logo} alt="nav_logo" />
                                </Link>
                            </div> */}

                            <div className='nav__list'>
                                <NavLink
                                    className={({ isActive }) => (isActive ? 'active_nav' : 'nav__item')}

                                    to="/" onClick={handleLinkClick}>
                                    Overview
                                </NavLink>

                                <NavLink
                                    className={({ isActive }) => (isActive ? 'active_nav' : 'nav__item')}

                                    to="/evapotranspiration" onClick={handleLinkClick}>
                                    Evapotranspiration (ET)
                                </NavLink>



                                <NavLink className={({ isActive }) => (isActive ? 'active_nav' : 'nav__item')}
                                    to="/precipitation" onClick={handleLinkClick}>
                                    Precipitation
                                </NavLink>

                                {/* <div className='dropdown_nav_container'>
                                    <Link className="nav__item dropdown_nav" to="#">
                                        Products  <i className="fa fa-chevron-down"></i>
                                    </Link>
                                    <div className="dropdown_content">
                                        <Link className='dropdown_link' to="/" onClick={handleLinkClick}> Basic</Link>
                                        <Link className='dropdown_link' to="/" onClick={handleLinkClick}> Premium</Link>
                                    </div>
                                </div> */}

                                <NavLink
                                    className={({ isActive }) => (isActive ? 'active_nav' : 'nav__item')}
                                    to="/biomass" onClick={handleLinkClick}>
                                    Biomass Production
                                </NavLink>
                                <NavLink className={({ isActive }) => (isActive ? 'active_nav' : 'nav__item')}
                                    to="/land-classification" onClick={handleLinkClick}>
                                    Land cover classification
                                </NavLink>

                                <NavLink
                                    className={({ isActive }) => (isActive ? 'active_nav' : 'nav__item')}
                                    to="/water-footprint" onClick={handleLinkClick}>
                                    Water Footprint
                                </NavLink>
                                
                                <NavLink
                                    className={({ isActive }) => (isActive ? 'active_nav' : 'nav__item')}
                                    to="/water-productivity" onClick={handleLinkClick}>
                                    Water Productivity
                                </NavLink>
                                {/* <NavLink
                                    className={({ isActive }) => (isActive ? 'active_nav' : 'nav__item')}
                                    to="/drought" onClick={handleLinkClick}>
                                    Drought Condition
                                </NavLink>
                                 */}
                                



                                {/* <a className="nav__item"
                                    href="https://indiadroughtmonitor.in/" onClick={handleLinkClick} target='_blank' rel="noreferrer noopener">
                                    India Drought Monitor&nbsp;<FaExternalLinkAlt />
                                </a> */}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}

export default NavbarMain
