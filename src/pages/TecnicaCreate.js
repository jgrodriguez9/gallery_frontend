import React from 'react';
import TecnicaForm from '../component/TecnicaForm';

export default function TecnicaCreate({auth}){
    return(
        <div>
             <TecnicaForm auth={auth}/>           
        </div>
    )
}