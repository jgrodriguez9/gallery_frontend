import React, { useEffect, useState } from 'react';
import Get from '../service/Get';
import { OBRA_ALL, OBRA_DELETE } from '../service/Route';
import Skeleton from 'react-loading-skeleton';
import TablePagination from '../component/TablePagination';
import { toast } from 'react-toastify';
import { MSG_ERROR, MSG_SUCCESS,MSG_ERROR_PROCESS_DATA } from '../service/Messages';
import { Link } from 'react-router-dom';
import { FaEdit, FaSearch, FaTimes } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import Delete from '../service/Delete'
import LoaderRequest from '../loader/LoaderRequest';
import BootstrapTable from 'react-bootstrap-table-next';

export default function ObraList({url, auth}){
    const[items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isDeleting, setDeleting] = useState(false)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)
    const [page, setPage] = useState(1)
    const [input, setInput] = useState('')
    const [query, setQuery] = useState(null)

    useEffect(()=>{
        DataList(page, query)
    },[page, query])

    const DataList = (page, query) =>{
        setLoading(true)
        Get({url: `${OBRA_ALL}?query=${query}&page=${page}`, access_token: auth.data.access_token})
        .then(response=>{
            console.log(response)
            setItems(response.data.data)
            setPrevious(response.data.prev_page_url)
            setNext(response.data.next_page_url)
            setLoading(false)
        })
        .catch(error=>{
            toast.error(MSG_ERROR, {autoClose: 5000})
        })
    }

    const handlePrev = e =>{
        setPage(page-1)
    }
    const handleNext= e =>{
        setPage(page+1)
    }

    const handleSearch = e =>{
        if(input===""){
            setQuery(null)
        }else{
            setQuery(input)
        }     
    }

    const deleteItem = id =>{
        setDeleting(true)
        Delete({url: `${OBRA_DELETE}/${id}`, access_token: auth.data.access_token})
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
        text: 'Nombre'
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
                    <h6 className="m-0 font-weight-bold text-primary">Obras</h6>  
                    <span><Link to={`${url}/form`} className="btn btn-sm btn-outline-primary ml-3">Agregar</Link></span>                     
                </div>
            </div>
            <div className="card-body">
                {
                    isLoading ? <Skeleton count={10} height={48}/> : 
                    <div>             
                        <div className="d-flex flex-row-reverse">
                            <div className="col col-lg-4">
                                <div className="input-group mb-3">
                                    <input type="text" 
                                        className="form-control" 
                                        placeholder="Search for name ..."
                                        value={input}
                                        onChange={e=>setInput(e.target.value)}     
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button" onClick={e=>handleSearch()}><FaSearch /></button>
                                    </div>
                                </div>
                            </div>
                        </div>           
                        <BootstrapTable keyField='id' data={ items } columns={ columns } />
                        <div className="d-flex flex-row-reverse">
                            <ul className="pagination">
                                <li className={`${previous === null && "disabled"} paginate_button page-item previous`} id="dataTable_previous">
                                    <span className="page-link" onClick={e=>handlePrev()}>Previous</span>
                                </li>
                                <li className={`${next === null && "disabled"} paginate_button page-item next`} id="dataTable_next">
                                    <span className="page-link"  onClick={e=>handleNext()}>Next</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                }                   
            </div>
        </div>
    )

}