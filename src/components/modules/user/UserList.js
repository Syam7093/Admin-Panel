import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteuser, getalluser } from '../../redux/user/userService';
import { setSingleuser } from '../../redux/user/useSlice';
import Search from '../../pagination/search';
import PaginationRounded from '../../pagination/pagination';

const UserList = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [filter,setfilter]=useState([])
    useEffect(() => {
        dispatch(getalluser());
    }, [dispatch]);
    // const users=useSelector((state)=>state?.userSlice?.userdata)
    const users = useSelector((state) => state?.userSlice?.userdata || []);

   
    // console.log(users,"userrs----")
    const getsingleuser=(item)=>{
        // dispatch(setSingleuser(item))
        navigate(`/userupdate/update/${item}`)
    }
    const delteone=(item)=>{
        console.log(item,"syamitem")
        dispatch(deleteuser(item.id))

    }
    useEffect(()=>{
        setfilter(users)
    },[users])
  
    const handleSearch=(fill)=>{
        setfilter(fill)
        console.log(fill,"fill--")

    }
  return (
    <div>
        <div>
            <button onClick={()=>{navigate("/useradd")}}>Add User</button>
        </div>
        <Search data={users}
                keysToFilter={['title', 'name', 'gender', 'status', 'description']} // Update with relevant keys
                onSearch={handleSearch}></Search>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">image</TableCell>

            <TableCell align="right">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {Array.isArray(filter) && filter.length > 0 ? (
           filter.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.title}</TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.gender}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">          <img src={row.maleImageUrl} height="40px" width="40px"></img>
        </TableCell>
        <TableCell align="right">
          <button onClick={() => getsingleuser(row.id)}>Update</button>
          <button onClick={()=>{delteone(row)}}>Delete</button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No Users Found
      </TableCell>
    </TableRow>
  )}
        </TableBody>
      </Table>
    </TableContainer>
    <PaginationRounded></PaginationRounded>
  
    </div>
  )
}

export default UserList