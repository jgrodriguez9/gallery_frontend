import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import LoginForm from '../component/LoginForm';

function Login(){
    const [message, setMessage] = useState('')

    return(
        <Container>
            <div className="col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-4 offset-md-4 col-12">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-12 col-xl-12">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Galeria Data</h1> 
                                        <span className="text-danger">{message}</span>                                   
                                    </div>
                                    <div className="text-center">
                                        <LoginForm setMessage={setMessage}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
    
}

export default Login