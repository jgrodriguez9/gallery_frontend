import React from 'react';
import ObraForm from '../component/ObraForm';

export default function ObraCreate({auth}){
    return(
        <div>
             <ObraForm auth={auth}/>           
        </div>
    )
}