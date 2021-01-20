import React, { useContext } from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import { Route } from 'react-router-dom'
import Categoria from '../component/Categoria'
import Footer from '../component/Footer'
import Obra from '../component/Obra'
import SideBar from '../component/SideBar'
import Soporte from '../component/Soporte'
import Statistics from '../component/Statistics'
import Tecnica from '../component/Tecnica'
import Tematica from '../component/Tematica'
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
                        <Route path="/soporte"><Soporte auth={auth}/></Route>
                        <Route path="/tecnica"><Tecnica auth={auth}/></Route>
                        <Route path="/tematica"><Tematica auth={auth}/></Route>
                        <Route path="/obra"><Obra auth={auth}/></Route>
                    </Switch>
                </div>  
                <Footer />              
            </div>
        </div>
    )
}

export  default Dashboard