import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import React from 'react';
import "./productList.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { deleteProduct, getProducts } from '../../redux/apiCalls';


const ProductList = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)

  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteProduct(id, dispatch)
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'user', headerName: 'Product', width: 250, renderCell: (params) => {
      return (
        <div className='productListItem'>
          <img src={params.row.img} alt="" className='productListImg'/>
          {params.row.title}
        </div>
        )
    }},
    { field: 'inStock', headerName: 'Stock', width: 80 },
    { field: 'price', headerName: 'Price ($)', width: 80 },
    { field: 'action', headerName: 'Action', width: 150, sortable: false, renderCell: (params) => {
      return(
        <div className='productListActions'>
          <Link to={`/products/${params.row._id}`} >
            <button className="productListEdit">Edit</button>
          </Link>
          <DeleteOutline className='productListDelete' onClick={() => handleDelete(params.row._id)}/>
        </div>
      )
    }},
  ];

  return (

    <div className='productList'>
        <DataGrid
        rows={products}
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

export default ProductList