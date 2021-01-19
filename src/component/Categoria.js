import React from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import { Route, useRouteMatch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import CategoriaCreate from '../pages/CategoriaCreate'
import CategoriaList from '../pages/CategoriaList'

export default function Categoria({auth}){
    let {path, url} = useRouteMatch()
    return(
        <div className="container-fluid">
            <ToastContainer />
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Categoría</h1>          
            </div>
            <Switch>
                <Route exact path={path}>
                    <CategoriaList url={url} auth={auth}/>
                </Route>
                <Route exact path={`${path}/form`} >
                    <CategoriaCreate auth={auth}/>
                </Route>
            </Switch>                        
        </div>
    )

}