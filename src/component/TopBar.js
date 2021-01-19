import React, { useContext } from 'react'
import { FaBars, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Dropdown } from 'react-bootstrap'
import { authContext } from '../context/AuthContext';

function TopBar(){
    const { setAuthData, auth } = useContext(authContext);

    const logout=e=>{
        setAuthData(null);
    }    

    return(
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <FaBars />
            </button>


            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                    <Dropdown>
                        <Dropdown.Toggle variant="link" className="nav-link dropdown-toggle p-0 n-outline n-focus" id="userDropdown">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{auth.data.username}</span>
                            <FaUser className="text-gray-300" />                           
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="shadow">
                            <Dropdown.Item eventKey="10000" onClick={e=>logout()}>
                                <FaSignOutAlt className="mr-2 text-gray-400"/>Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </nav>
    )
}

export default TopBar