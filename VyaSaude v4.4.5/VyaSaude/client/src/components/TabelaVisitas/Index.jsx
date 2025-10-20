import "./TabelaVisitas.css"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const colunas = [
      { field: 'id', headerName: 'ID', width: 70 },
   { field: 'registro', headerName: 'Registro', width: 70 },
   { field: 'paciente', headerName: 'Paciente', width: 130 },
   { field: 'agente', headerName: 'Agente', width: 130 },
   { field: 'data', headerName: 'Data/Hora', width: 130 },
   { field: 'endereco', headerName: 'Endereço', width: 130 },
   { field: 'motivo', headerName: 'Motivo', width: 130 },
   { field: 'status', headerName: 'Status', width: 130 }
];

const linhas = [
   {
      id: 1, 
      registro: 423, 
      paciente: "Luiz", 
      agente: "José", 
      data: "11/10/2025", 
      endereco: "Rua Marcelino", 
      motivo: "Acompanhamento", 
      status: "Concluido"
   }
];

const paginationModel = { page: 0, pageSize: 50 };

export default function TabelaVisitas() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={linhas}
        columns={colunas}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[25, 50, 100, 300, 1000]}
        checkboxSelection
      />
    </Paper>
  );
}