import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import React from 'react';
import "./orderList.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { deleteProduct, getOrders, getOrderStats, getProducts } from '../../redux/apiCalls';


const OrderList = () => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    getOrders(dispatch)
  }, [dispatch])
  useEffect(() => {
    getOrderStats(dispatch)
  }, [dispatch])

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'amount', headerName: 'AMOUNT', width: 250 },
    { field: 'createdAt', headerName: 'DATE', width: 160, renderCell: (params) => {
        return (<div>{params.row.createdAt.split("T")[0]}</div>)
      } },
  ];

  return (

    <div className='productList'>
        <DataGrid
        rows={orders}
        columns={columns}
        getRowId={row=>row._id}
        pageSize={12}
        rowsPerPageOptions={[12]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}

export default OrderList;