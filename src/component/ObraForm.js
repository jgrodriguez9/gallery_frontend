import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useQuery from '../hook/useQuery';
import * as Yup from 'yup';
import Get from '../service/Get';
import { CATEGORIA_ALL, OBRA_GET, OBRA_SAVE, SOPORTE_ALL, TECNICA_ALL, TEMATICA_ALL } from '../service/Route';
import { toast } from 'react-toastify';
import { MSG_ERROR,MSG_SUCCESS,MSG_ERROR_PROCESS_DATA } from '../service/Messages';
import NomencladorSkeleton from '../loader/NomencladorSkeleton';
import { Field, Formik } from 'formik';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import LoaderRequest from '../loader/LoaderRequest';
import PostImage from '../service/PostImage';
import GetAll from '../service/GetAll';
import defaultImage  from '../image/default.png'

export default function ObraForm({auth}){
    const [isLoading, setLoading] = useState(false)
    let query = useQuery();
    let history = useHistory()
    const [initialValue, setInitialValue] = useState({
        id: '',
        name: '',
        image: '',
        width: '',
        height: '',
        soporte: '',
        categoria: '',
        tecnica: '',
        tematica: ''
    })
    const [img, setImg] = useState('')
    const [categoriaOpt, setCategoriaOpt] = useState([])
    const [soporteOpt, setSoporteOpt] = useState([])
    const [tecnicaOpt, setTecnicaOpt] = useState([])
    const [tematicaOpt, setTematicaOpt] = useState([])

    useEffect(()=>{
        const urls = [CATEGORIA_ALL, SOPORTE_ALL, TECNICA_ALL, TEMATICA_ALL]
        if(query.get('id')){
            setLoading(true)
            urls.push(`${OBRA_GET}/${query.get('id')}`)
            GetAll({urls: urls, access_token: auth.data.access_token})
            .then(response=>{
                console.log(response)
                setCategoriaOpt(response[0].data)
                setSoporteOpt(response[1].data)
                setTecnicaOpt(response[2].data)
                setTematicaOpt(response[3].data)
                // const obj = {
                //     id: response.data.data.id,
                //     name: response.data.data.name,
                //     width: response.data.data.width,
                //     height: response.data.data.height,
                //     soporte: response.data.data.soporte,
                //     categoria: response.data.data.categoria,
                //     tecnica: response.data.data.tecnica,
                //     tematica: response.data.data.tematica
                // }
                // setInitialValue(obj)
                setLoading(false)
            })
            .catch(error=>{
                toast.error(MSG_ERROR, {autoClose: 5000})
            })
        }else{
            GetAll({urls: urls, access_token: auth.data.access_token})
            .then(response=>{
                console.log(response)
                setCategoriaOpt(response[0].data)
                setSoporteOpt(response[1].data)
                setTecnicaOpt(response[2].data)
                setTematicaOpt(response[3].data)
            })
            .catch(error=>{
                console.log(error)
            })
        }
    },[])

    const schemaValidate = Yup.object().shape({
        name: Yup.string()
            .required("Campo requerido"),
        width: Yup.number()
            .required("Campo requerido"),
        height: Yup.number()
            .required("Campo requerido"),
        soporte: Yup.string()
            .required("Campo requerido"),
        categoria: Yup.string()
            .required("Campo requerido"),
        tecnica: Yup.string()
            .required("Campo requerido"),
        tematica: Yup.string()
            .required("Campo requerido"),
        image: Yup.string()
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
                        console.log(values)         
                        const formData = new FormData();
                        formData.append("file", values.image)
                        formData.append("id", values.id)
                        formData.append("name", values.name)
                        formData.append("width", values.width)
                        formData.append("height", values.height)
                        formData.append("categoria", values.categoria)
                        formData.append("soporte", values.soporte)
                        formData.append("tecnica", values.tecnica)
                        formData.append("tematica", values.tematica)
                        PostImage({url: OBRA_SAVE, data: formData, access_token: auth.data.access_token, header:true})
                        .then(response=>{
                            setSubmitting(false)                            
                            toast.success(MSG_SUCCESS, {autoClose: 3000})
                            history.push('/obra')
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
                                <Col xs="9" lg="8">
                                    <Row>
                                        <Col xs="4" lg="6">
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
                                        <Col xs="4" lg="3">
                                            <Form.Group>
                                                <Form.Label>Ancho (cm)</Form.Label>
                                                <Field 
                                                    className={`${errors.width && 'invalid'} form-control form-control-sm`}
                                                    name="width" 
                                                    type="number"
                                                />
                                                <span className="text-danger ft-12">{errors.width}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="4" lg="3">
                                            <Form.Group>
                                                <Form.Label>Alto (cm)</Form.Label>
                                                <Field 
                                                    className={`${errors.height && 'invalid'} form-control form-control-sm`}
                                                    name="height" 
                                                    type="number"
                                                />
                                                <span className="text-danger ft-12">{errors.height}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="4" lg="3">
                                            <Form.Group>
                                                <Form.Label>Categoría</Form.Label>
                                                <Field 
                                                    className={`${errors.categoria && 'invalid'} form-control form-control-sm`}
                                                    name="categoria" 
                                                    as="select"
                                                >
                                                    <option>Seleccionar opción</option>
                                                    {
                                                        categoriaOpt.map((item,i)=>(
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <span className="text-danger ft-12">{errors.categoria}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="4" lg="3">
                                            <Form.Group>
                                                <Form.Label>Soporte</Form.Label>
                                                <Field 
                                                    className={`${errors.soporte && 'invalid'} form-control form-control-sm`}
                                                    name="soporte" 
                                                    as="select"
                                                >
                                                    <option>Seleccionar opción</option>
                                                    {
                                                        soporteOpt.map((item,i)=>(
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <span className="text-danger ft-12">{errors.soporte}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="4" lg="3">
                                            <Form.Group>
                                                <Form.Label>Técnica</Form.Label>
                                                <Field 
                                                    className={`${errors.tecnica && 'invalid'} form-control form-control-sm`}
                                                    name="tecnica" 
                                                    as="select"
                                                >
                                                    <option>Seleccionar opción</option>
                                                    {
                                                        tecnicaOpt.map((item,i)=>(
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <span className="text-danger ft-12">{errors.tecnica}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="4" lg="3">
                                            <Form.Group>
                                                <Form.Label>Temática</Form.Label>
                                                <Field 
                                                    className={`${errors.tematica && 'invalid'} form-control form-control-sm`}
                                                    name="tematica" 
                                                    as="select"
                                                >
                                                    <option>Seleccionar opción</option>
                                                    {
                                                        tematicaOpt.map((item,i)=>(
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <span className="text-danger ft-12">{errors.tematica}</span>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="3" lg="4">
                                    <div className="wh-150">
                                        {
                                            values.image ?  <Image src={values.image} fluid /> :
                                            <Image src={defaultImage} fluid />
                                        }
                                        
                                    </div>
                                    <div>
                                    <Form.File id="formcheck-api-regular">
                                        <Form.File.Label>Seleccionar imagen</Form.File.Label>
                                        <Form.File.Input 
                                            onChange={e=>{
                                                if(e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/svg" || e.target.files[0].type === "image/jpeg"){
                                                    setFieldValue('image', e.target.files[0])
                                                }
                                            }}
                                        />
                                        <span className="text-danger ft-12">{errors.image}</span>
                                    </Form.File>
                                    </div>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col>
                                    <Button size="sm" type="submit" variant="primary">Salvar</Button>
                                    <Link to="/obra" className="btn btn-secondary btn-sm ml-2">Cancelar</Link>
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