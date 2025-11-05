import "./Modal_NovoRegistro.css";
import api from '../../services/api';
import { TextField, Select } from "@mui/material";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getUser } from "../../helpers/auth";
import SVG_Close from '../../../public/close.svg'

export default function Modal_NovoRegistro({onClose}) {
   const usuarioLogado = getUser();

   const [DataHora, setDataHora] = useState('');

   const [cpfErro, setCpfErro] = useState(false);
   const [cpfValidacao, setCpfValidacao] = useState('');

   const [novoRegistro, setNovoRegistro] = useState({
      agenteId: '',  // FK
      pacienteId: '',  // FK
      enderecoId: '',  // FK
      data_visita: '',
      motivo: '',
      desfecho: '',
      descricao: '',
      cpf: ''
   });

   const [dadosPaciente, setDadosPaciente] = useState({
      id: '',
      cpf: '', // Relacionamento
      nome: '',
      sus: '',
      data_nascimento: '',
      num_telefone: '',
      email: '',
      
      enderecoId: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: ''
   });
   
   const [dadosAgente, setDadosAgente] = useState({
      id: '',
      nome_agente: '',
      cns: '',
      ubs_nome: '',
      ubs_codigo: '',
      ubs_email: '',
      ubs_telefone: ''
   });

   useEffect(() => {
      if (novoRegistro.cpf && novoRegistro.cpf.length === 11) {
         buscarDados();
      }
   }, [novoRegistro.cpf]);

   async function buscarDados() { // Obtenção dos dados do Paciente e do Agente logado.
      try {
         const buscarPaciente = await api.get(`/paciente/${novoRegistro.cpf}`)
         console.log("Busca do Paciente: ")
         console.log(buscarPaciente)

         if (buscarPaciente.data?.response) {
            setDadosPaciente(({
               pacienteId: buscarPaciente.data.response.id,
               cpf: buscarPaciente.data.response.cpf,
               nome: buscarPaciente.data.response.nome,
               sus: buscarPaciente.data.response.sus,
               data_nascimento: buscarPaciente.data.response.data_nascimento,
               num_telefone: buscarPaciente.data.response.num_telefone,
               email: buscarPaciente.data.response.email,
               
               enderecoId: buscarPaciente.data.response.endereco.id,
               logradouro: buscarPaciente.data.response.endereco.logradouro,
               numero: buscarPaciente.data.response.endereco.numero,
               complemento: buscarPaciente.data.response.endereco.complemento,
               cep: buscarPaciente.data.response.endereco.cep,
               bairro: buscarPaciente.data.response.endereco.bairro,
               cidade: buscarPaciente.data.response.endereco.cidade,
               estado: buscarPaciente.data.response.endereco.estado
            }));
            
            const buscarAgente = await api.get(`/agente/${usuarioLogado.cpf}`)
            console.log("Busca do Agente: ")
            console.log(buscarAgente)

            setDadosAgente(({
               agenteId: buscarAgente.data.id,
               nome_agente: buscarAgente.data.nome_agente,
               cns: "",// Discutir com o grupo sobre o "código do agente"
               ubs_nome: buscarAgente.data.posto.nome_posto,
               ubs_codigo: buscarAgente.data.posto.id,
               ubs_email: buscarAgente.data.posto.email,
               ubs_telefone: buscarAgente.data.posto.telefone
            }));
            
            setNovoRegistro((dados) => ({
               ...dados,
               pacienteId: dadosPaciente.pacienteId,
               enderecoId: dadosPaciente.enderecoId,
               agenteId: dadosAgente.agenteId
            }));

            setCpfErro(false);
               setCpfValidacao('');
            } else {
            setCpfErro(true);
            setCpfValidacao('');
         }
      } catch(err) {
         console.log(err)
         setCpfErro(true);
         setCpfValidacao("CPF não encontrado ou inválido.");
      }
   };

   const handleFormChange = (e) => { // Captura alterações nos inputs, e insere os valores no array de novoRegistro.
      const {name, value} = e.target;
      
      setNovoRegistro((dados) => ({
         ...dados,
         [name]: value
      }));
   };

   async function obterDataHora() { // Obter data e hora atual.
      const dataAtual = new Date();
      const dia = dataAtual.getFullYear().toString() + (dataAtual.getMonth() + 1).toString().padStart(2, '0') + dataAtual.getDate().toString().padStart(2, '0');
      const hora = dataAtual.getHours().toString().padStart(2, '0') + dataAtual.getMinutes().toString().padStart(2, '0');
      const dataFormatada = dia + hora;
      
      setDataHora(dataFormatada);
      console.log(`${dataFormatada}`)
   }

   async function handleRegister(e) { // Cadastro da Visita.
      e.preventDefault();
      
      // Etapa de realização do cadastro da Visita.
      try {
         const registroPayload = {...novoRegistro, registro_visita: 1234567890, data_visita: '2025-07-30 00:00:00'};
         console.log(registroPayload)
         await api.post('/registro/cadastro', registroPayload);

      } catch(err) {
         console.log(err.response)
      }
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
                     {/* <button onClick={() => console.log(obterDataHora())}>HoraData</button> */}
                     <TextField variant="outlined" name="nome" value={dadosPaciente.nome} onChange={(e) => handleFormChange(e)} label="Nome do Paciente"></TextField>
                     <TextField variant="outlined" name="cpf" required error={cpfErro} helperText={cpfValidacao} value={novoRegistro.cpf} onChange={(e) => handleFormChange(e)} type="text" label="CPF do Paciente"></TextField>
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
                     <TextField variant="outlined" disabled name="cns" value={dadosAgente.cns} onChange={(e) => handleFormChange(e)} label="CNS" type="number"></TextField>
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
                     <TextField variant="outlined" name="motivo" required value={novoRegistro.motivo} onChange={(e) => handleFormChange(e)} label="Motivo"></TextField>
                     <TextField variant="outlined" name="desfecho" required value={novoRegistro.desfecho} onChange={(e) => handleFormChange(e)} label="Desfecho"></TextField>
                  {/* <Select
                  
                  /> */}
                  </div>

                  <div className="grid">
                     <TextField variant="outlined" name="descricao" required value={novoRegistro.descricao} onChange={(e) => handleFormChange(e)} label="Descrição"></TextField>
                  </div>

                  <div className="modal_buttons">
                     <Button variant="outline-success" onClick={onClose}>Cancelar</Button>
                     <Button variant="success" form="modal_novoRegistro" type="submit">Cadastrar</Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}