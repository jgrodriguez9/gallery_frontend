import React, { useContext } from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import { Route } from 'react-router-dom'
import Categoria from '../component/Categoria'
import Footer from '../component/Footer'
import SideBar from '../component/SideBar'
import Statistics from '../component/Statistics'
import TopBar from '../component/TopBar'
import { authContext } from '../context/AuthContext'

function Dashboard(){
    const {auth} = useContext(authContext)
    return(
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopBar />
                    <Switch>
                        <Route exact path="/"><Statistics auth={auth}/></Route>
                        <Route path="/categoria"><Categoria auth={auth}/></Route>
                        {/* <Route exact path="/soporte"><Soporte auth={auth}/></Route>
                        <Route exact path="/tecnica"><Tecnica auth={auth}/></Route>
                        <Route exact path="/tematica"><Tematica auth={auth}/></Route> */}
                    </Switch>
                </div>  
                <Footer />              
            </div>
        </div>
    )
}

export  default Dashboard