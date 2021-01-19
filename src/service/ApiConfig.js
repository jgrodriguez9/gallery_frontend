import React from 'react'
import axios from 'axios';

//test: http://localhost:8000/api/v1
//prod:https://apirealestate.penuelcounseling.com/api/v1
const httpInstance = axios.create( {
    baseURL: 'http://localhost:8000/api/v1'
});

httpInstance.interceptors.response.use(null, error => {    
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500; 
    //console.log(error.response) 
    if(error.response.status===401 || error.response.status===403){
        window.localStorage.setItem('authGallery', null);
        window.location.href="http://localhost:3000"
    }
    if (expectedError) {
        //console.log(error.response.status)
        // Loggear mensaje de error a un servicio como Sentry
        // Mostrar error genérico al usuario
        return Promise.reject(error);
    }
});

export default httpInstance;