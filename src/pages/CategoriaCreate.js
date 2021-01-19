import React from 'react';
import CategoriaForm from '../component/CategoriaForm';

export default function CategoriaCreate({auth}){
    return(
        <div>
             <CategoriaForm auth={auth}/>           
        </div>
    )
}