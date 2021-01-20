import React, { useEffect, useState } from 'react';
import Get from '../service/Get';
import { TECNICA_ALL, TECNICA_DELETE } from '../service/Route';
import Skeleton from 'react-loading-skeleton';
import TablePagination from '../component/TablePagination';
import { toast } from 'react-toastify';
import { MSG_ERROR, MSG_SUCCESS,MSG_ERROR_PROCESS_DATA } from '../service/Messages';
import { Link } from 'react-router-dom';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import Delete from '../service/Delete'
import LoaderRequest from '../loader/LoaderRequest';

export default function TecnicaList({url, auth}){
    const[items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isDeleting, setDeleting] = useState(false)

    useEffect(()=>{
        DataList()
    },[])

    const DataList = () =>{
        setLoading(true)
        Get({url: TECNICA_ALL, access_token: auth.data.access_token})
        .then(response=>{
            setItems(response.data)
            setLoading(false)
        })
        .catch(error=>{
            toast.error(MSG_ERROR, {autoClose: 5000})
        })
    }

    const deleteItem = id =>{
        setDeleting(true)
        Delete({url: `${TECNICA_DELETE}/${id}`, access_token: auth.data.access_token})
        .then(response=>{
            setDeleting(false)
            toast.success(MSG_SUCCESS, {autoClose: 3000})
            DataList()
        })
        .catch(error=>{
            toast.error(MSG_ERROR_PROCESS_DATA, {autoClose: 5000})
        })
    }

    const actions = (cell, row) => {
        return (
            <div className="d-flex justify-content-between">
                <Link to={`${url}/form?id=${row.id}`} className="btn btn-outline-info btn-sm mr-2"><FaEdit title="Edit"/></Link>
                <Button size="sm" variant="outline-danger" onClick={e=>deleteItem(row.id)}><FaTimes title="Eliminar"/></Button>
            </div>            
        );
    }

    const columns = [{
        dataField: 'id',
        text: '',
        hidden: true
      }, {
        dataField: 'name',
        text: 'Nombre de técnica'
      },
      {
        dataField: '',
        isDummyField: true,
        text: '',
        headerAlign: 'center',
        align: 'center',
        headerStyle: { width: '3%' },
        formatter: actions,            
      }
    ];

    return(
        <div className="card shadow mb-4">
            {isDeleting && LoaderRequest()}
            <div className="card-header py-3">
            <div className="d-flex align-items-center">
                <h6 className="m-0 font-weight-bold text-primary">Técnicas</h6>  
                <span><Link to={`${url}/form`} className="btn btn-sm btn-outline-primary ml-3">Agregar</Link></span>                     
            </div>
            </div>
            <div className="card-body">
                {
                    isLoading ? <Skeleton count={10} height={48}/> : 
                    <div>                        
                        <TablePagination items={items} columns={columns}/>
                    </div>
                }                   
            </div>
        </div>
    )

}