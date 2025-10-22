import '../../App.css'
import './Login.css'
import api from '../../services/api';
import { Form } from 'react-bootstrap';
import { Link, useNavigate  } from "react-router-dom";
import { useState } from 'react';
import { useUsuario } from '../../context/UsuarioContext';
import { getUser } from '../../helpers/auth';

function Login() {
   const navigate = useNavigate();
   const { setUsuario } = useUsuario();
   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   
   async function handleLogin(e) {
      e.preventDefault();

      // Realização de login
      try {
         const payload = {email, senha};
         const {data} = await api.post('/login', payload);
         sessionStorage.setItem("token", data.token)

         const perfil = await api.get('/login/me');
         setUsuario(perfil.data);
         
         console.log(`Perfil data: `, perfil.data);
         console.log(data.response, "Token:", data.token)
         alert(data.response)
  
         navigate(`/${perfil.data.tipoUsuario}_home`)

      } catch(err) {
         alert(err.response.data.response)
         console.log(err.response.data.response)
      }
   }

   return (
      <content className="content-login_app-css">
         
         <div className='content-body-login_app-css'>
            {/* <div className='gradiente'>
               <p className='h3 text-light fw-bolder'>VyaSaúde</p>
            </div> */}

            <Form onSubmit={handleLogin}>
               {/* Título */}
               <div className="d-block p-3">
                  <Form.Label className='d-flex justify-content-center fw-bolder h2 m-2 titulosEstilo3'>
                     {/* <img src={logo} id="logoMore"/> */}
                     VyaSaúde
                  </Form.Label>
               </div>
               <div className="d-block p-3">
                  <Form.Label className='d-flex justify-content-center fw-bolder h4 m-2'>Acesso ao sistema</Form.Label>
               </div>

               <div className="m-2">
                  {/* Campo Email */}
                  <div className="d-flex py-1 fieldsEmailandPassword">
                     <svg 
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>
                     <Form.Control  value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="E-mail" className="form-control border-2 border-dark border-opacity-25 rounded-3" required/>
                  </div>
                  
                  {/* Campo senha */}
                  <div className="d-flex py-1 fieldsEmailandPassword">
                     <svg 
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" /></svg>
                     <Form.Control value={senha} onChange={(e) => {setSenha(e.target.value)}} type="password" placeholder="Senha" className="form-control border-2 border-dark border-opacity-25 rounded-3" required/>
                  </div>

                  {/* Esqueci a senha */}
                  <div className="pt-4 forgotMyPassword">
                     <Link to="/recuperar">Esqueci minha senha</Link>
                  </div>

                  {/* Divisória */}
                  <div className="d-block py-2">
                     <hr className='border border-gray border-2 opacity-50'></hr>
                  </div>

                  {/* Botão de acesso */}
                  <div className="d-flex justify-content-center py-2">
                     <button className="btn btn-light border-dark border-opacity-75 px-4 py-2" type='submit'>Acessar</button>
                  </div><br />
                  
                  {/* Novo cadastro */}
                  <div className='py-2' id='sLogin-newCad'>
                     <p className='px-0 justify-content-end'>Ainda não possui login? <Link to="/cadastro" id='preRegister'>Realizar pré-cadastro</Link></p>
                  </div>
               </div>
            </Form>
         </div>

         <br />
         <span className='etecWaterMark'>Projeto desenvolvido para Etec de Embu das Artes - 2025</span>

      </content>
   )
}

export default Login