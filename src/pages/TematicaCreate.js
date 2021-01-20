import React from 'react';
import TematicaForm from '../component/TematicaForm';

export default function TematicaCreate({auth}){
    return(
        <div>
             <TematicaForm auth={auth}/>           
        </div>
    )
}