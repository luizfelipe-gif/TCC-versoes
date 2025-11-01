import "./Modal_NovoRegistro.css";
import api from '../../services/api';
import { TextField, Select } from "@mui/material";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getUser } from "../../helpers/auth";
import SVG_Close from '../../../public/close.svg'

export default function Modal_NovoRegistro({onClose}) {
   const usuarioLogado = getUser();

   const [novoRegistro, setNovoRegistro] = useState({
      agenteId: null,
      pacienteId: null,
      
      data_visita: null,
      motivo: null,
      desfecho: null,
      descricao: null,
      
      cpf: null,
   });

   const [dadosPaciente, setDadosPaciente] = useState({
      id: null,
      cpf: null, // Relacionamento
      nome: null,
      sus: null,
      data_nascimento: null,
      num_telefone: null,
      email: null,

      logradouro: null,
      numero: null,
      complemento: null,
      cep: null,
      bairro: null,
      cidade: null,
      estado: null,
   });
   
   const [dadosAgente, setDadosAgente] = useState({
      nome_agente: null,
      cns: null,
      ubs_nome: null,
      ubs_codigo: null,
      ubs_email: null,
      ubs_telefone: null
   });

   useEffect(() => {
      if (novoRegistro.cpf && novoRegistro.cpf.length === 11) {
         buscarDados();
      }
   }, [novoRegistro.cpf]);

   async function buscarDados() {
      try {
         const buscarPaciente = await api.get(`/paciente/${novoRegistro.cpf}`)
         console.log("Busca do Paciente: ", buscarPaciente.data)
         
         setDadosPaciente(({
            pacienteId: buscarPaciente.data.id,
            cpf: buscarPaciente.data.cpf,
            nome: buscarPaciente.data.nome,
            sus: buscarPaciente.data.sus,
            data_nascimento: buscarPaciente.data.data_nascimento,
            num_telefone: buscarPaciente.data.num_telefone,
            email: buscarPaciente.data.email,
            
            logradouro: buscarPaciente.data.endereco.logradouro,
            numero: buscarPaciente.data.endereco.numero,
            complemento: buscarPaciente.data.endereco.complemento,
            cep: buscarPaciente.data.endereco.cep,
            bairro: buscarPaciente.data.endereco.bairro,
            cidade: buscarPaciente.data.endereco.cidade,
            estado: buscarPaciente.data.endereco.estado
         }));
         
         const buscarAgente = await api.get(`/agente/${usuarioLogado.cpf}`)
         console.log("Busca do Agente: ", buscarAgente.data)

         setDadosAgente(({
            nome_agente: buscarAgente.data.nome_agente,
            cns: "",// Discutir com o grupo sobre o "código do agente"
            ubs_nome: buscarAgente.data.posto.nome_posto,
            ubs_codigo: buscarAgente.data.posto.id,
            ubs_email: buscarAgente.data.posto.email,
            ubs_telefone: buscarAgente.data.posto.telefone
         }));
         
         setNovoRegistro((dados) => ({
            ...dados,
            pacienteId: dadosPaciente.id,
            agenteId: dadosAgente.id,
         }));

         console.log("novoRegistro: ", novoRegistro)
         console.log("dadosPaciente: ", dadosPaciente)
         console.log("dadosAgente: ", dadosAgente)
      } catch(err) {
         console.log(err)
      }
   };

   const handleFormChange = (e) => {
      const {name, value} = e.target;
      
      setNovoRegistro((dados) => ({
         ...dados,
         [name]: value
      }));
   };

   async function handleRegister(e) { // fazer a unção pra realizar o registro
      e.preventDefault();



   }

   return (
      <div className="modal-overlay">
         <div className="Modal_NovoRegistro-content">
            <div className="titulo">
               <span className="h3">Novo registro de visita domiciliar</span>
               <div className="fechar" onClick={onClose}> {/* TROCAR PRA ICONE SVG*/}
                  <img src={SVG_Close} width={20} height={20} ></img>
               </div>
            </div>

            <div className="Modal_NovoRegistro-elements">
               <form id="modal_novoRegistro" onSubmit={handleRegister}>
                  <span className="d-flex h5 text-success">Dados do Paciente</span>
                  <div className="grid grid_1">
                     <TextField variant="outlined" name="nome" value={dadosPaciente.nome} onChange={(e) => handleFormChange(e)} label="Nome do Paciente"></TextField>
                     <TextField variant="outlined" name="cpf" value={novoRegistro.cpf} onChange={(e) => handleFormChange(e)} type="text" label="CPF do Paciente"></TextField>
                     <TextField variant="outlined" name="sus" value={dadosPaciente.sus} onChange={(e) => handleFormChange(e)} label="Nº SUS" type="number"></TextField>
                     <TextField variant="outlined" name="data_nascimento" value={dadosPaciente.data_nascimento} onChange={(e) => handleFormChange(e)} label="Data de Nascimento" type="date"></TextField>
                     <TextField variant="outlined" name="num_telefone" value={dadosPaciente.num_telefone} onChange={(e) => handleFormChange(e)} label="Telefone" type="number"></TextField>
                     <TextField variant="outlined" name="email" value={dadosPaciente.email} onChange={(e) => handleFormChange(e)} label="Email" type="email"></TextField>
                  </div>
                  
                  <hr/>
                  <span className="d-flex h5 text-success">Endereço</span>

                  <div className="grid grid_2">
                     <TextField variant="outlined" name="logradouro" value={dadosPaciente.logradouro} onChange={(e) => handleFormChange(e)} label="Logradouro"></TextField>
                     <TextField variant="outlined" name="numero" value={dadosPaciente.numero} onChange={(e) => handleFormChange(e)} label="Número" type="number"></TextField>
                     <TextField variant="outlined" name="complemento" value={dadosPaciente.complemento} onChange={(e) => handleFormChange(e)} label="Complemento"></TextField>
                     <TextField variant="outlined" name="cep" value={dadosPaciente.cep} onChange={(e) => handleFormChange(e)} label="CEP" type="number"></TextField>
                  </div>
                  
                  <div className="grid grid_3">
                     <TextField variant="outlined" name="bairro" value={dadosPaciente.bairro} onChange={(e) => handleFormChange(e)} label="Bairro"></TextField>
                     <TextField variant="outlined" name="cidade" value={dadosPaciente.cidade} onChange={(e) => handleFormChange(e)} label="Cidade"></TextField>
                     <TextField variant="outlined" name="estado" value={dadosPaciente.estado} onChange={(e) => handleFormChange(e)} label="UF"></TextField>
                  </div>

                  <hr/>
                  <span className="d-flex h5 text-success">Dados do Agente</span>

                  <div className="grid grid_2">
                     <TextField variant="outlined" name="nome_agente" value={dadosAgente.nome_agente} onChange={(e) => handleFormChange(e)} label="Agente de Saúde"></TextField>
                     <TextField variant="outlined" name="cns" value={dadosAgente.cns} onChange={(e) => handleFormChange(e)} label="CNS" type="number"></TextField>
                     <TextField variant="outlined" name="ubs_nome" value={dadosAgente.ubs_nome} onChange={(e) => handleFormChange(e)} label="Unidade Básica de Saúde"></TextField>
                     <TextField variant="outlined" name="ubs_codigo" value={dadosAgente.ubs_codigo} onChange={(e) => handleFormChange(e)} label="Código da Unidade" type="number"></TextField>
                  </div>

                  <div className="grid grid_4">
                     <TextField variant="outlined" name="ubs_email" value={dadosAgente.ubs_email} onChange={(e) => handleFormChange(e)} label="Email da UBS" type="email"></TextField>
                     <TextField variant="outlined" name="ubs_telefone" value={dadosAgente.ubs_telefone} onChange={(e) => handleFormChange(e)} label="Telefone da UBS" type="number"></TextField>
                  </div>

                  <hr/>
                  <span className="d-flex h5 text-success">Sobre a visita</span>

                  <div className="grid grid_4">
                     <TextField variant="outlined" name="motivo" value={novoRegistro.motivo} onChange={(e) => handleFormChange(e)} label="Motivo"></TextField>
                     <TextField variant="outlined" name="desfecho" value={novoRegistro.desfecho} onChange={(e) => handleFormChange(e)} label="Desfecho"></TextField>
                  {/* <Select
                  
                  /> */}
                  </div>

                  <div className="grid">
                     <TextField variant="outlined" name="descricao" value={novoRegistro.descricao} onChange={(e) => handleFormChange(e)} label="Descrição"></TextField>
                  </div>

                  <div className="modal_buttons">
                     <Button variant="outline-success" onClick={onClose}>Cancelar</Button>
                     <Button variant="success" form="modal_novoRegistro">Cadastrar</Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}