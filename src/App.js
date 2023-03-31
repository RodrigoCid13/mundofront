import logo from './logo.svg';

import './App.css';
import React, { useState, useEffect  } from "react";
// import axios from "axios";
import {DataGrid} from '@mui/x-data-grid';
import { Box, Button, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const baseURL = "http://localhost:8000/api/";


 function App() {

  
  const columns = [
    {
      field: 'nombre',
      headerName: 'Las Calles asociadas son ',
      type: 'number',
      width: 200,
      paddingleft: 200,
      editable: true,
    },

  ];

  const rows = [
    { id:'id', nombre:'nombre'}
  ];


    const [regiones, setRegiones] = React.useState([]);
    const [provincias,setProvincias] = React.useState([]);
    const[ciudades, setCiudades] = React.useState([]);
    const [calles,setCalles] = React.useState([]);
    const [regionseleccionada, setRegionSeleccionada] = React.useState("");
    const [provincia, setProvincia] = React.useState("");
    const [ciudad, setCiudad] = React.useState("");
    
  
    const getRegiones =() =>{
      fetch(`${baseURL}regiones/listar`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setRegiones(data);
          
        });
    };
    useEffect(()=>{
      getRegiones();
    }, [])

    const getProvincias = (id) =>{ 
      fetch(`${baseURL}provincias/asoc/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => 
        response.json())
        .then((data) => {
          console.log(data);
          setProvincias(data);
        });
    };

    const getCiudades =(id) =>{
      fetch(`${baseURL}ciudades/asoc/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
       .then((response) => response.json())
       .then((data) => {
          setCiudades(data);
        });
    }

    const getCalles =(id) =>{
      fetch(`${baseURL}calles/asoc/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
          setCalles(data);
        });
    }

  
    const handleRegionChange = (e) => {
      setRegionSeleccionada(e.target.value);
      setProvincias([]);
      setCiudades([]);
      setCalles([]);
      getProvincias(e.target.value)
    }
    const handleProvinciaChange = (e) =>{
      setProvincia(e.target.value);
      setCiudades([]);
      setCalles([]);
      getCiudades(e.target.value);
    }
    const handleCiudadChange = (e) =>{
      setCiudad(e.target.value);
      setCalles([]);
    
    } 
    
    const onClickFiltrar = ()=>{
        getCalles(ciudad)

    }


  return (
    <Box
    sx={{ height: 400, width: '100%',paddingTop:'10px' }}>
    <Grid container xs={5}>
    <Grid item md={3} >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={regionseleccionada}
          label="region"
          onChange={handleRegionChange}
        >
          {regiones.map((region) => { 
        return (
      <MenuItem key={region.id} value={region.id}>{region.nombre}</MenuItem>)})
          }
        </Select>
      </FormControl>
        </Grid>
        <Grid item md={3} >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Provincias</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={provincia}
          label="region"
          onChange={handleProvinciaChange}
          
        >
           {provincias.map((provincia) => { 
        return (
      <MenuItem key={provincia.id} value={provincia.id}>{provincia.nombre}</MenuItem>)})
          } 
        </Select>
      </FormControl>
      </Grid>

      <Grid item md={3} >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Ciudades</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ciudad}
          label="Ciudad"
          onChange={ handleCiudadChange}
        >
          {ciudades.map((ciudad) => { 
          return (
                <MenuItem key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</MenuItem>
                )
              }
            )
          }
        </Select>
      </FormControl>
      </Grid>
          
      <Grid item md={3} >
          <Button  variant="contained" size="medium" onClick={onClickFiltrar} sx={{marginTop:'13px'}}>
            Filtrar
          </Button>
          </Grid>
          </Grid>

        <Grid container xs={9}>  
      <DataGrid 
        style={
          {
            height: 300,
            width: '100%',
            marginTop:'30px',
            marginLeft:'200px',
            marginRight:'50px',
            
          }
        }
        rows={calles}
        columns={columns}
        pageSizeOptions={[5]}
      />
      </Grid>
    </Box>
    
  );
}

export default App;
