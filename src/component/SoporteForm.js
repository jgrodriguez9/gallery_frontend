import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useQuery from '../hook/useQuery';
import * as Yup from 'yup';
import Get from '../service/Get';
import { SOPORTE_GET, SOPORTE_SAVE } from '../service/Route';
import { toast } from 'react-toastify';
import { MSG_ERROR,MSG_SUCCESS,MSG_ERROR_PROCESS_DATA } from '../service/Messages';
import NomencladorSkeleton from '../loader/NomencladorSkeleton';
import { Field, Formik } from 'formik';
import Post from '../service/Post';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import LoaderRequest from '../loader/LoaderRequest';

export default function SoporteForm({auth}){
    const [isLoading, setLoading] = useState(false)
    let query = useQuery();
    let history = useHistory()
    const [initialValue, setInitialValue] = useState({
        id: '',
        name: '',
    })

    useEffect(()=>{
        if(query.get('id')){
            setLoading(true)
            Get({url: `${SOPORTE_GET}/${query.get('id')}`, access_token: auth.data.access_token})
            .then(response=>{
                const obj = {
                    id: response.data.data.id,
                    name: response.data.data.name
                }
                setInitialValue(obj)
                setLoading(false)
            })
            .catch(error=>{
                toast.error(MSG_ERROR, {autoClose: 5000})
            })
        }
    },[])

    const schemaValidate = Yup.object().shape({
        name: Yup.string()
            .required("Campo requerido"),
    });

    return(
        <div>
            {
                isLoading ? <NomencladorSkeleton /> :
                <Formik
                    initialValues={initialValue}
                    validationSchema={schemaValidate}
                    onSubmit={(values, { setSubmitting, setFieldValue, resetForm }) => {                          
                        Post({url: SOPORTE_SAVE, data: values, access_token: auth.data.access_token, header:true})
                        .then(response=>{
                            setSubmitting(false)                            
                            toast.success(MSG_SUCCESS, {autoClose: 3000})
                            history.push('/soporte')
                            //console.log(response)
                        })
                        .catch(error=>{
                            toast.error(MSG_ERROR_PROCESS_DATA, {autoClose: 7000})
                            setSubmitting(false)
                        })                             
                    }}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
            }) => (
                <Form onSubmit={handleSubmit}>
                    {isSubmitting && LoaderRequest()}
                    <Field type="hidden" name="id"/>
                    <Card className="shadow mb-4">
                        <Card.Header className="py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Principal información</h6>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs lg="4">
                                    <Form.Group>
                                        <Form.Label>Nombre</Form.Label>
                                        <Field 
                                            className={`${errors.name && 'invalid'} form-control form-control-sm`}
                                            name="name" 
                                            type="text"
                                        />
                                        <span className="text-danger ft-12">{errors.name}</span>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button size="sm" type="submit" variant="primary">Salvar</Button>
                                    <Link to="/soporte" className="btn btn-secondary btn-sm ml-2">Cancelar</Link>
                                </Col>
                            </Row>                                          
                        </Card.Body>
                    </Card>
                </Form>
            )}

                </Formik>
            }
        </div>
    )

}