import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import ButtonBack from "../../components/ButtonBack/Index"
// import PageWIP from "../../components/PageWIP/Index"
import { useNavigate, Link } from "react-router-dom";
import { Button, FormLabel, TextField } from "@mui/material";
import TabelaVisitas from "../../components/TabelaVisitas/Index";
import { useState, useEffect } from "react";
import api from '../../services/api';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons, Toolbar, ToolbarButton } from '@mui/x-data-grid';

import { randomId } from '@mui/x-data-grid-generator'; //remover

const roles = ['Market', 'Finance', 'Development'];  // remover

function EditToolbar(props) {
   const { setLinhas, setRowModesModel } = props;

   const handleClick = () => {
      const id = randomId();
      setLinhas((oldRows) => [
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
         <Tooltip title="Adicionar novo registro">
         <ToolbarButton onClick={handleClick}>
            <AddIcon fontSize="small" /> {/* TROCAR ICONE PRA SVG*/}
         </ToolbarButton>
         </Tooltip>
      </Toolbar>
   );
}

function Agente_histVisitas() {
   const navigate = useNavigate();
   
   const [formDados, setFormDados] = useState({
      nome: '',
      cpf: '',
      email: ''
   });

   let linhasIniciais = [ // remover
      {
         id: '123456',
         cpf: `${formDados.cpf}`,
         paciente: 'paciente',
         agente: 'agente',
         data: '2025-10-22',
         endereco: 'rua blablabla',
         motivo: 'motivo',
         status: 'Realizado',
         descricao: 'descrição'
      },
      {
         id: '123457',
         cpf: `${formDados.cpf}`,
         paciente: 'paciente',
         agente: 'agente',
         data: '2025-10-22',
         endereco: 'rua blablabla',
         motivo: 'motivo',
         status: 'Realizado',
         descricao: 'descrição'
      },
   ]; // remover

   const [linhas, setLinhas] = useState(linhasIniciais);
   const [rowModesModel, setRowModesModel] = useState({});

   useEffect(() => {
      async function buscarDados() {
         try {
            const token = sessionStorage.getItem("token");

            const response = await api.get('/agente/perfil', {
               headers: {
                  Authorization: `Bearer ${token}`  
               }
            });

            setFormDados(response.data);
            console.log(response);
         } catch (error) {
            console.error(error);
         }
      };
      buscarDados();
   }, []);




   const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
         event.defaultMuiPrevented = true;
      }
   };

   const handleEditClick = (id) => () => { // Ao clicar na linha, muda para o modo de edição da planilha
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
   };

   const handleSaveClick = (id) => () => { // Ao clicar em salvar, armazena as mudanças feitas
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
   };

   const handleDeleteClick = (id) => () => { // Ao clicar em deletar, exclui aquela linha da planilha
      setLinhas(linhas.filter((row) => row.id !== id));
   };

   const handleCancelClick = (id) => () => {
      setRowModesModel({
         ...rowModesModel,
         [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const linhaEditada = linhas.find((row) => row.id === id);

      if (linhaEditada.isNew) {
         setLinhas(linhas.filter((row) => row.id !== id));
      }
   };

   const processRowUpdate = (newRow) => {
      const linhaAtualizada = { ...newRow, isNew: false };
      setLinhas(linhas.map((row) => (row.id === newRow.id ? linhaAtualizada : row)));
      return linhaAtualizada;
   };

   const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
   };

   const colunas = [
      { field: 'id',       align: 'center',   headerName: 'Registro',    headerAlign: 'center',   width: 130,   editable: false, type: 'number' },
      { field: 'cpf',      align: 'center',   headerName: 'CPF',         headerAlign: 'center',   width: 130,   editable: false, type: 'number'  },
      { field: 'paciente', align: 'center',   headerName: 'Paciente',    headerAlign: 'center',   width: 180,   editable: false },
      { field: 'agente',   align: 'center',   headerName: 'Agente',      headerAlign: 'center',   width: 180,   editable: false },
      { field: 'data',     align: 'center',   headerName: 'Data/Hora',   headerAlign: 'center',   width: 130,   editable: false, type: 'date', valueGetter: (value) => value && new Date(value)},
      { field: 'endereco', align: 'center',   headerName: 'Endereço',    headerAlign: 'center',   width: 180,   editable: true },
      { field: 'motivo',   align: 'center',   headerName: 'Motivo',      headerAlign: 'center',   width: 130,   editable: true },
      { field: 'status',   align: 'center',   headerName: 'Status',      headerAlign: 'center',   width: 130,   editable: true, type: 'singleSelect', valueOptions: ['Realizado', 'Ausente', 'Mudou-se', 'Óbito'] },
      { field: 'descrição',align: 'center',   headerName: 'Descrição',   headerAlign: 'center',   width: 180,   editable: true },
      { field: 'actions',  align: 'center',   headerName: 'Ações',       headerAlign: 'center',   width: 100,   cellClassName: 'actions', type: 'actions', 
         getActions: ({ id }) => {
            const modoEdicao = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (modoEdicao) {
               return [
                  <GridActionsCellItem icon={<SaveIcon />} label="Save" material={{sx: {color: 'primary.main'}}} onClick={handleSaveClick(id)} />,
                  <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit"/>
               ];
            }

            return [ 
               <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit"/>,
               <GridActionsCellItem icon={<DeleteIcon />} label="Delete" className="textPrimary" onClick={handleDeleteClick(id)} color="inherit"/> 
            ] 
         }
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
                     rows={linhas}
                     columns={colunas}
                     editMode="row"
                     rowModesModel={rowModesModel}
                     onRowModesModelChange={handleRowModesModelChange}
                     onRowEditStop={handleRowEditStop}
                     processRowUpdate={processRowUpdate}
                     slots={{ toolbar: EditToolbar }}
                     slotProps={{
                        toolbar: { setLinhas, setRowModesModel },
                     }}
                     showToolbar
                     />
                  </Box>

                  <TextField className="width-large disable" variant="outlined" value={formDados.nome} label="Nome completo"/>
                  <TextField className="width-medium disable" variant="outlined" value={formDados.cpf} label="CPF"/>
                  <TextField className="width-medium disable" variant="outlined" value={formDados.email} label="E-mail"/>
            </div>
         </main>
      </div>
  );
}

export default Agente_histVisitas;