import "../../App.css"
import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import ButtonBack from "../../components/ButtonBack/Index"
// import PageWIP from "../../components/PageWIP/Index"
import api from '../../services/api';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { TextField } from "@mui/material"

function Agente_perfil() {
   const navigate = useNavigate();

   const [formDados, setFormDados] = useState({
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      data_admissao: '',
      data_demissao: '',
      posto: '',
      cbo_codigo: '',
      cbo_descricao: '',
      createdAt: '',
      deletedAt: ''
   });

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
   
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-pages">
            <div className="agente-perfil d-block" style={{position: "relative"}}>
               <div className="title-pages">
                  <svg onClick={() => navigate(-1)} style={{ cursor:"pointer" }} className="align-self-start"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#000000"></path> </g></svg>
                  <h1 className="align-self-center h2 px-5">Meu Perfil</h1>
               </div>
               {/* <ButtonBack text="Meu Perfil"/> */}

               <div>
                  <div>
                     <span className="h4 text-success">Registro</span>
                  </div>

                  <div className="form-fields-agente">
                     <TextField className="width-large disable" variant="outlined" value={formDados.nome} label="Nome completo"/>
                     <TextField className="width-medium disable" variant="outlined" value={formDados.cpf} label="CPF"/>
                  </div>

                  <div className="form-fields-agente">
                     <TextField className="width-medium disable" variant="outlined" value={formDados.email} label="E-mail"/>
                     <TextField className="width-medium" variant="outlined" value={formDados.telefone} label="Telefone" />
                     <TextField className="width-medium" variant="outlined" value={formDados.posto} label="Posto"/>
                  </div>
               </div>

                        <br/><hr/><br/>

               <div>
                  <span className="h4 text-success">Informações sobre o cadastro</span>
               </div>

               <div className="form-fields-agente">
                  <TextField className="width-large disable" variant="outlined" value={""} label="Cadastrado por" disabled/>
                  <TextField className="width-medium disable" variant="outlined" value={new Date(formDados.createdAt).toLocaleString('pt-BR')} label="Data e Hora de criação" />
               </div>

               <div className="form-fields-agente">
                  <TextField className="width-small disable" variant="outlined" value={formDados.data_admissao} label="Data de Admissão" />
                  <TextField className="width-small disable" variant="outlined" value={formDados.cbo_codigo} label="Código CBO" />
                  <TextField className="width-large disable" variant="outlined" value={formDados.cbo_descricao} label="Descrição da Atividade" />
               </div>

               {/* Botões pra voltar e alterar cadastro*/}
               <div className="form-button">
                  <button className="btn btn-light border-dark border-opacity-75 px-4 py-2" onClick={() => {navigate('/Admin_home')}}>Voltar pra tela inicial</button>
                  <button form="form-registro" className="btn btn-light border-dark border-opacity-75 px-4 py-2">Alterar Cadastro</button>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Agente_perfil;