import "./Modal_NovoRegistro.css";
import api from '../../services/api';
import { TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function Modal_NovoRegistro({onClose}) {
   const [novoRegistro, setNovoRegistro] = useState({
      agenteId: null,
      pacienteId: null,
      
      data_visita: null,
      motivo: null,
      desfecho: null,
      descricao: null,
      
      cpf: null,
      //postoId: null,
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
      ubs_codigo: null,
      ubs_nome: null,
      ubs_email: null,
      ubs_telefone: null,
   });
      

   useEffect(() => {
      if (novoRegistro.cpf && novoRegistro.cpf.length === 11) {
         buscarDados();
      }
   }, [novoRegistro.cpf]);

   async function buscarDados() {
      try {
         const response = await api.get(`/paciente/${novoRegistro.cpf}`)
         console.log("response: ", response.data)
         
         setDadosPaciente(({
            pacienteId: response.data.id,
            cpf: response.data.cpf,
            nome: response.data.nome,
            sus: response.data.sus,
            data_nascimento: response.data.data_nascimento,
            num_telefone: response.data.num_telefone,
            email: response.data.email,

            logradouro: response.data.endereco.logradouro, // Dados de endereço não estão vindo
            numero: response.data.endereco.numero,
            complemento: response.data.endereco.complemento,
            cep: response.data.endereco.cep,
            bairro: response.data.endereco.bairro,
            cidade: response.data.endereco.cidade,
            estado: response.data.endereco.estado,
         }))
         
         console.log("dadosPaciente: ", dadosPaciente)


         setNovoRegistro((dados) => ({
            ...dados,
            pacienteId: dadosPaciente.id,
            nome: dadosPaciente.nome
         }));
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

   async function handleRegister(e) {
      e.preventDefault();



   }

   return (
      <div className="modal-overlay">
         <div className="Modal_NovoRegistro-content">
            <div className="titulo">
               <span className="h3">Novo registro de visita domiciliar</span>
               <div className="fechar"> {/* TROCAR PRA ICONE SVG*/}
                  X
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
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Logradouro"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Número" type="number"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Complemento"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="CEP" type="number"></TextField>
                  </div>
                  
                  <div className="grid grid_3">
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Bairro"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Cidade"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="UF"></TextField>
                  </div>

                  <hr/>
                  <span className="d-flex h5 text-success">Dados do Agente</span>

                  <div className="grid grid_2">
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Agente de Saúde"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="CNS" type="number"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Unidade Básica de Saúde"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Código da Unidade" type="number"></TextField>
                  </div>

                  <div className="grid grid_4">
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Email da UBS" type="email"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Telefone da UBS" type="number"></TextField>
                  </div>

                  <hr/>
                  <span className="d-flex h5 text-success">Sobre a visita</span>

                  <div className="grid grid_4">
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Motivo"></TextField>
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Desfecho"></TextField>
                  </div>

                  <div className="grid">
                     <TextField variant="outlined" value={null} onChange={(e) => handleFormChange(e)} label="Descrição"></TextField>
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