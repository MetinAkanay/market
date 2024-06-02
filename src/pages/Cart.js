import React from 'react'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { cartClear, decrement, removeItem } from '../store/slices/cartSlice';
import { DeleteForeverOutlined, DiscFull } from '@mui/icons-material';


function Cart() {

    
    const {products} = useSelector(state => state.cart)
    const dispatch = useDispatch()
    console.log(products)

    return (
        <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={product.image} alt='product_image' className='cartImage'/>
              </TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell><DeleteForeverOutlined color='error' onClick={() => dispatch(removeItem(product._id))} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className='flex justify-end m-4 '>
        <Button 
            onClick={() => dispatch(cartClear())}  
            color="error" variant='outlined' startIcon={<DeleteOutlineIcon />}>
            Clear Cart
        </Button>
    </div>
    </>
    )
}

export default Cart