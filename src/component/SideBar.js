import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaLaughWink, FaTachometerAlt, FaUserFriends, FaMapMarker } from "react-icons/fa";

function SideBar(){

    return(
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                    <FaLaughWink />
                    </div>
                    <div className="sidebar-brand-text mx-3">Galería Admin</div>
                </Link>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item">
                    <NavLink activeClassName="selected" className="nav-link" to="/">
                        <FaTachometerAlt className="mb-1"/>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <div>
                    <hr className="sidebar-divider"></hr>
                    <div className="sidebar-heading">
                        Catálogo
                    </div>
                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" to="/states" activeClassName="selected">
                        <div className="d-flex align-items-center">
                            <div className="bd-highlight"><FaMapMarker className="ico mb-1" /></div>
                            <div className="bd-highlight"><span>States</span></div>                                    
                        </div> 
                        </NavLink>
                                            
                    </li>
                </div> 
                <div>
                    <hr className="sidebar-divider"></hr>
                    <div className="sidebar-heading">
                        Nomencladores
                    </div>

                    <li className="nav-item">
                        <div className="d-flex justify-content-between">
                            <NavLink className="nav-link collapsed" to="/categoria" activeClassName="selected">
                            <div className="d-flex align-items-center">
                                <div className="bd-highlight"><FaUserFriends className="ico mb-1" /></div>
                                <div className="bd-highlight"><span>Categoría</span></div>                                    
                            </div> 
                            </NavLink>                       
                        </div>                                            
                    </li>                    
                </div>

                
            </ul>    
    )
}

export default SideBar