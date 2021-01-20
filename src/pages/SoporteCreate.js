import React from 'react';
import SoporteForm from '../component/SoporteForm';

export default function SoporteCreate({auth}){
    return(
        <div>
             <SoporteForm auth={auth}/>           
        </div>
    )
}