import React from 'react';
import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteClient, getClients } from '../../redux/apiCalls';
import {format} from "timeago.js";

const UserList = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);

  useEffect(() => {
    getClients(dispatch)
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteClient(id, dispatch);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'user', headerName: 'User', width: 200, renderCell: (params) => {
      return (
        <div className='userListUser'>
          <img src={params.row.img || "https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG"} alt="" className='userListImg'/>
          <div className="userListNames">
            <span className='userListName'>{params.row.name}</span>
            <span className='userListUsername'>@{params.row.username}</span>
          </div>
        </div>
        )
    }},
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'isAdmin', headerName: 'Admin', width: 120 },
    { field: 'createdAt', headerName: 'User Created', width: 160, renderCell: (params) => {
      return (<div>{params.row.createdAt.split("T")[0]}</div>)
    } },
    { field: 'action', headerName: 'Action', width: 150, sortable: false, renderCell: (params) => {
      return(
        <div className='userListActions'>
          <Link to={`/users/${params.row._id}`} >
            <button className="userListEdit">Edit</button>
          </Link>
          <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)}/>
        </div>
      )
    }},
  ];

  return (
    <div className='userList'>
        <DataGrid
        rows={clients}
        getRowId={row=>row._id}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}

export default UserList