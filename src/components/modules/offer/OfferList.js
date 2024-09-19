import React, { useState,useEffect } from 'react'
import PaginatedItems from '../../pagination/pagination'
import Search from '../../pagination/search'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { storage } from '../../../firebase';
import  {ref,uploadBytes,listAll,getDownloadURL} from "firebase/storage"
import {v4} from "uuid"

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const OfferList = () => {
 
  const  [imageupload,setimageupload]=useState(null)
  const [imagelist,setimagelist]=useState([])
  const imagelistreference=ref(storage,"images/")
  useEffect(()=>{
   listAll(imagelistreference).then((res)=>{
    res.items.forEach((item)=>{
      getDownloadURL(item).then((url)=>{
        setimagelist((prev)=>[...prev,url])
      })
    })
   })
  },[])

  const uploadimage=()=>{
  if(imageupload== null) return
  const imageref=ref(storage,`images/${imageupload.name + v4() }`)
  uploadBytes(imageref,imageupload).then((snaphsot)=>{
    getDownloadURL(snaphsot.ref).then((url)=>{
      setimagelist((prev)=>[...prev,url])

    })
  })

  

  }
  return (
    <div>OfferList
        {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
    <input type="file" onChange={(e)=>{setimageupload(e.target.files[0])}}></input>
    <button onClick={()=>{uploadimage()}}>upload image</button>
    {imagelist.map((e)=>{
      return(
        <img src={e} height="40px" width="40px"></img>
      )
    })}
    </div>
  )
}

export default OfferList