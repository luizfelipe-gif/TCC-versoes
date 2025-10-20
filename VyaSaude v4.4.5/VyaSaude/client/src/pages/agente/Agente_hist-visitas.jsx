import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import ButtonBack from "../../components/ButtonBack/Index"
// import PageWIP from "../../components/PageWIP/Index"
import { useNavigate, Link } from "react-router-dom";
import { Button, FormLabel, TextField } from "@mui/material";
import TabelaVisitas from "../../components/TabelaVisitas/Index";
import { useState } from "react";

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons, Toolbar, ToolbarButton } from '@mui/x-data-grid';

import { randomCreatedDate,randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator'; //remover

const roles = ['Market', 'Finance', 'Development'];  // remover

const randomRole = () => { // remover
   return randomArrayItem(roles);
}; // remover

const initialRows = [ // remover
   {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
   {
      id: randomId(),
      name: randomTraderName(),
      age: 36,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
   {
      id: randomId(),
      name: randomTraderName(),
      age: 19,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
   {
      id: randomId(),
      name: randomTraderName(),
      age: 28,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
   {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
]; // remover


function EditToolbar(props) {
   const { setRows, setRowModesModel } = props;

   const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [
         ...oldRows,
         { id, name: '', age: '', role: '', isNew: true },
      ]);
      setRowModesModel((oldModel) => ({
         ...oldModel,
         [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
   };

   return (
      <Toolbar>
         <Tooltip title="Add record">
         <ToolbarButton onClick={handleClick}>
            <AddIcon fontSize="small" />
         </ToolbarButton>
         </Tooltip>
      </Toolbar>
   );
}

function Agente_histVisitas() {
   const navigate = useNavigate();

   const [rows, setRows] = useState(initialRows);
   const [rowModesModel, setRowModesModel] = useState({});

   const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
         event.defaultMuiPrevented = true;
      }
   };

   const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
   };

   const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
   };

   const handleDeleteClick = (id) => () => {
      setRows(rows.filter((row) => row.id !== id));
   };

   const handleCancelClick = (id) => () => {
      setRowModesModel({
         ...rowModesModel,
         [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
         setRows(rows.filter((row) => row.id !== id));
      }
   };

   const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
   };

   const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
   };

   const columns = [
      { field: 'id', headerName: 'Registro', width: 130, editable: false },
      { field: 'cpf', headerName: 'CPF', width: 130, editable: true },
      { field: 'paciente', headerName: 'Paciente', width: 180, editable: true },
      { field: 'agente', headerName: 'Agente', width: 180, editable: true },
      { field: 'data', headerName: 'Data/Hora', width: 130, editable: true },
      { field: 'endereco', headerName: 'Endereço', width: 180, editable: true },
      { field: 'motivo', headerName: 'Motivo', width: 130, editable: true },
      { field: 'status', headerName: 'Status', width: 130, editable: true },
      { field: 'descrição', headerName: 'Descrição', width: 180, editable: true },
      { field: 'acoes', headerName: 'Ações', width: 130, editable: true },
      // {
      //    field: 'age',
      //    headerName: 'Paciente',
      //    // type: 'number', -> number, date, singleSelect, 
      //    width: 80,
      //    align: 'left',
      //    // headerAlign: 'left', right
      //    editable: true,
      // },
      // {
      //    field: 'joinDate',
      //    headerName: 'Join date',
      //    // type: 'date',
      //    width: 180,
      //    editable: true,
      // },
      // {
      //    field: 'role',
      //    headerName: 'Department',
      //    width: 220,
      //    editable: true,
      //    // type: 'singleSelect',
      //    valueOptions: ['Market', 'Finance', 'Development'],
      // },
      { field: 'actions', type: 'actions', headerName: 'Ações', width: 100, cellClassName: 'actions', getActions: ({ id }) => {
         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

         if (isInEditMode) {
            return [
               <GridActionsCellItem icon={<SaveIcon />} label="Save" material={{sx: {color: 'primary.main'}}} onClick={handleSaveClick(id)} />,
               <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit"/>
            ];
         }

         return [
            <GridActionsCellItem
               icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit"/>,
            <GridActionsCellItem
               icon={<DeleteIcon />} label="Delete" className="textPrimary" onClick={handleDeleteClick(id)} color="inherit"/>
         ]}
      }
  ];

  return (
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-pages">
            <div className="agente-perfil d-block" style={{position: "relative"}}>
               <div className="title-pages">
                  <svg onClick={() => navigate(-1)} style={{ cursor:"pointer" }} className="align-self-start"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#000000"></path> </g></svg>
                  <h1 className="align-self-center h2 px-5">Consulta de Visitas Domiciliares</h1>
               </div>

               {/* <div className="table-inputs">
                  <Button variant="outlined" >Visitas realizadas</Button>
                  <Button variant="outlined">Visitas Agendadas</Button> 
               </div> */}

               <span className="h4 text-success">Registros realizados</span>

               {/* <div className="table-inputs">
                  <TextField label="Agente"></TextField>
                  <TextField label="Zona"></TextField>
                  <TextField label="Bairro"></TextField>
                  <TextField label="De: DD/MM/AAAA"></TextField>
                  <TextField label="Até: DD/MM/AAAA"></TextField>
               </div> */}
               
               <br></br>

                  <Box sx={{height: 500, width: '100%', '& .actions': {color: 'text.secondary'}, '& .textPrimary': {color: 'text.primary'}}}>
                  <DataGrid
                     rows={rows}
                     columns={columns}
                     editMode="row"
                     rowModesModel={rowModesModel}
                     onRowModesModelChange={handleRowModesModelChange}
                     onRowEditStop={handleRowEditStop}
                     processRowUpdate={processRowUpdate}
                     slots={{ toolbar: EditToolbar }}
                     slotProps={{
                        toolbar: { setRows, setRowModesModel },
                     }}
                     showToolbar
                     />
                  </Box>
            </div>
         </main>
      </div>
  );
}

export default Agente_histVisitas;