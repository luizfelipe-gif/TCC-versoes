import "./Agente.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

import Header from "../../components/Header"
import Sidenav from "../../components/Sidenav/Sidenav_agente"
// import ButtonBack from "../../components/ButtonBack/Index"
// import PageWIP from "../../components/PageWIP/Index"

import { Button, FormLabel, TextField } from "@mui/material";
import { Modal } from 'react-bootstrap'
import Modal_NovoRegistro from "../../components/Modal_NovoRegistro/Index";
import Modal_EditarRegistro from "../../components/Modal_EditarRegistro/Index";
import Modal_DetalhesRegistro from "../../components/Modal_DetalhesRegistro/Index";

function Agente_histVisitas() {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);




   const navigate = useNavigate();
   const [usuarios, setUsuarios] = useState([]);

   const [exibirModal_novoRegistro, setNovoRegistro] = useState(false); // Abertura e fechamento do Modal
   const [exibirModal_editarRegistro, setEditarRegistro] = useState(false); // Abertura e fechamento do Modal
   const [exibirModal_detalhesRegistro, setDetalhesRegistro] = useState(false); // Abertura e fechamento do Modal
   
   // useEffect(() => {
   //    async function buscarDados() {
   //          try {
   //       const token = sessionStorage.getItem("token");

   //       const response = await api.get('/login/teste', {
   //          headers: {
   //             Authorization: `Bearer ${token}`  
   //          }
   //       });
   //       setRegistros(response.data);
   //    } catch (err) {
   //          console.err(err);
   //       }
   //    };
   //    buscarDados();
   // }, []);
      
   const [registros, setRegistros] = useState({
      id: '',
      registro_visita: '',
      data_visita: '',
      motivo: '',
      desfecho: '',
      descricao: null,
      agenteId: '',
      pacienteId: '',
      enderecoId: '',
   });

   // * UNIFICAR FUNÇÕES de trazerDados()
   async function trazerDados() { // recarregar a lista quando solicitado
      try {
         // const token = sessionStorage.getItem("token");
         // await api.get('/registro/', {headers: {Authorization: `Bearer ${token}`}}, registros)
         await api.get('/registro/', registros)
         .then(res => setUsuarios(Array.isArray(res.data.response) ? res.data.response : []) || console.log("Resposta da API:", res.data))
      } catch(err) {
         console.log(err)
      }
   };
   
   function recarregarLista() {
      trazerDados();
   }

   useEffect(() =>  { // carregar a lista ao renderizar a página
      try {
         trazerDados()
      } catch(err) {
         console.log(err)
      }
      trazerDados();
   }, [])
   
   const novoRegistro = (id) => {
      try {
         api.post(`/registro/${id}`)
         console.log("Registro adicionado com sucesso")
         recarregarLista();
      } catch(err) {
         throw err;
      }
   }

   const apagarRegistro = (id) => {
      try {
         api.delete(`/registro/${id}`)
         console.log("Registro excluido com sucesso")
         recarregarLista();
      } catch(err) {
         throw err;
      }
   }

   const [numRegistro, setNumRegistro] = useState(0);
   const [idRegistro, setIdRegistro] = useState('');

   function gerarId() {
      const dataAtual = new Date();
      const dataFormatada = dataAtual.getFullYear().toString() + (dataAtual.getMonth() + 1).toString().padStart(2, '0') + dataAtual.getDate().toString().padStart(2, '0');
      
      setIdRegistro(dataFormatada + numRegistro);
      setNumRegistro(numRegistro + 1);
      console.log(`${idRegistro}`)
   }

      
  return (
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-pages">
            <div className="agente-histVisitas d-block" style={{position: "relative"}}>
               <div className="title-pages">
                  <svg onClick={() => navigate(-1)} style={{ cursor:"pointer" }} className="align-self-start"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#000000"></path> </g></svg>
                  <h1 className="align-self-center h2 px-5">Consulta de Visitas Domiciliares</h1>
               </div>
               
               <div className="d-flex justify-content-between">
                  <span className="h4 text-success">Registros realizados</span>
                  <div className="d-flex justify-content-between">
                     <button onClick={() =>  novoRegistro() || gerarId()}>Novo registro</button>
                     <button onClick={() => recarregarLista()}>Recarregar Registros</button>
                  </div>
               </div>


               {/* <div className="table-inputs">
                  <TextField label="Agente"></TextField>
                  <TextField label="Zona"></TextField>
                  <TextField label="Bairro"></TextField>
                  <TextField label="De: DD/MM/AAAA"></TextField>
                  <TextField label="Até: DD/MM/AAAA"></TextField>
                  
                  <Button variant="outlined" >Visitas realizadas</Button>
                  <Button variant="outlined">Visitas Agendadas</Button> 
               </div> */}
               
               <br></br>

               <table className="table table-hover agente-histVisitas">
                  <thead>
                     <tr>
                        <th>Registro da visita</th>
                        {/* <th>Nome do Paciente</th>
                        <th>CPF do Paciente</th>
                        <th>Nome do Agente</th>
                        <th>Endereço</th> */}
                        <th>Data/Hora</th>
                        <th>Motivo</th>
                        <th>Desfecho</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                     </tr>
                  </thead>
                  <tbody>
                     {usuarios.map((dado) => {
                        return (
                           <tr key={idRegistro}>
                              <td>{idRegistro}</td>
                              {/* <td>{dado.registro_visita}</td> */}
                              {/* <td>{dado.nomePaciente}</td>
                              <td>{dado.cpfPaciente}</td>
                              <td>{dado.nomeAgente}</td>
                              <td>{dado.endereco}</td> */}
                              <td>{new Date(dado.data_visita).toLocaleString('pt-BR')}</td>
                              {/* {new Date(dadosAgente.createdAt).toLocaleString('pt-BR')} */}
                              <td>{dado.motivo}</td>
                              <td>{dado.desfecho}</td>
                              <td><button onClick={() => setDetalhesRegistro(true)}>Ver detalhes</button></td>
                              <td>
                                 <button onClick={() => setEditarRegistro(true)}>Editar</button>
                                 <button onClick={() => apagarRegistro(idRegistro)}>Deletar</button>

                                 {/* <button onClick={() => {
                                    console.log(`Usuario: ${idRegistro} + ${dado.nomePaciente} + ${dado.cpfPaciente} + ${dado.nomeAgente} + ${dado.endereco} + ${dado.data_hora} + ${dado.motivo} + ${dado.desfecho} + ${dado.descricao}`)
                                 }}>Ações</button> */}
                              </td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>

               <div> {/* excluir depois */}
                  <button onClick={() => setNovoRegistro(true)}>Novo Registro</button>
                  <button onClick={() => setEditarRegistro(true)}>Editar</button>
                  <button onClick={() => setDetalhesRegistro(true)}>Ver detalhes</button>

                  <button onClick={() => obterData()}>Horario</button>
               </div>

               <div>
                  {/* Modal: Novo registro */}
                  {exibirModal_novoRegistro && <Modal_NovoRegistro onClose={() => setNovoRegistro(false)} />}

                  {/* Modal: Editar */}
                  {exibirModal_editarRegistro && <Modal_EditarRegistro onClose={() => setEditarRegistro(false)} />} 
                     
                  {/* Modal: Detalhes (mais informações) */}
                  {exibirModal_detalhesRegistro && <Modal_DetalhesRegistro onClose={() => setDetalhesRegistro(false)} />} 

               </div>
            </div>
         </main>
      </div>
  );
}

export default Agente_histVisitas;