import React, { useContext } from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup';
import Post from '../service/Post';
import { authContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../service/Route';

function LoginForm({setMessage}){
    const { setAuthData } = useContext(authContext)
    let history = useHistory()

    const shema = Yup.object().shape({
        username: Yup.string()
            .required(),
        password: Yup.string()
          .required(),    
    });


    return(
        <Formik initialValues={{username:'' ,password: ''}}
            validationSchema={shema}
            onSubmit={(values, { setSubmitting,setFieldValue }) => { 
                          
                Post({url: LOGIN, data: values, header: false})
                .then(response=>{
                    setSubmitting(false)
                    if(!response.data.success){ 
                        setMessage(response.data.message) 
                        setTimeout(function(){ setMessage('') }, 8000);                               
                    }else{
                        setAuthData(response.data)
                        history.replace('/');                       
                    }
                })
                .catch(error=>{
                    setSubmitting(false)
                })
            }}
        >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
        }) => (
            <form className="user" onSubmit={handleSubmit}>
                <div className="form-group">
                    <Field 
                        className={`${errors.username && 'input-error'} form-control form-control-user`}
                        name="username" 
                        type="text"
                        placeholder="username" 
                    />
                    { errors.username && <div className="invalid-feedback">{errors.username}</div> }  
                </div>
                <div className="form-group">
                    <Field 
                        className={`${errors.password && 'input-error'} form-control form-control-user`}
                        name="password" 
                        type="password"
                        placeholder="username" 
                    />
                    { errors.password && <div className="invalid-feedback">{errors.password}</div> }  
                                                                                              
                </div>
                <button type="sumit" className="btn btn-primary btn-user btn-block">
                    {
                        isSubmitting 
                        ?  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                        : 'Login'
                    }
                </button>
            </form>
        )}

        </Formik>
    )
}

export default LoginForm