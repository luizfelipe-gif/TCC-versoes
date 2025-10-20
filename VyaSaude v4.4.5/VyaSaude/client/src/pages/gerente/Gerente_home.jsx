import "./Gerente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_gerente/"
import ButtonFAQ from "../../components/ButtonFAQ"
import { Link } from "react-router-dom";
import { useUsuario } from '../../context/UsuarioContext';

import more from '../../components/Sidenav/iconsSideBar/more.png';
import AddUserMale     from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';
import HomeAddress     from '../../components/Sidenav/iconsSideBar/Home Address.png';

function Gerente_home() {
   const { setUsuario, usuario } = useUsuario();
   
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <ButtonFAQ/>
         <main className="content-home">
            <div className="title_Home">
               <img src={more} id="logoMore"/><br /><br />
               <h2><b>Olá, {usuario.nome}!</b></h2> {/* PRONTO PRA ESTILIZAR: NOME DO USUARIO DINAMICO */}
               <h4>Bem-vindo(a) à sua área de gerente.</h4>
            </div>

            {/* <div className="grid-container_Home paciente-home">

               <Link className="grid-items_Home" to="/Paciente_perfil"><p>Meu perfil</p></Link>

               <Link className="grid-items_Home" to="/Paciente_histConsultas"><p className="text-danger">Histórico de Consultas</p></Link>

            </div> */}


            {/* <p><b>Navegar para:</b></p> */}
            <div className="shortcutField paciente-home">
               {/* <Link
               className="shortcutClick"
               to="/Paciente_perfil">
               <p>Meu perfil</p>
               </Link>

               <Link
               className="shortcutClick"
               to="/Paciente_histConsultas">
               <p>Histórico de Consultas</p>
               </Link> */}
            </div>

            <div className="gridBoxOtherOptions">
               <div className="gridBoxOptions_lines">
                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Cadastro de Pacientes</b></h5>
                        <img src={AddUserMale} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Cadastre ou altere informações de pacientes na plataforma
                     </div>
                     <div className="buttonLine">
                        <Link to="/Gerente_home-usuario" className="buttonB">Acessar pacientes</Link>
                     </div>
                  </div>

                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Agenda de Visitas</b></h5>
                        <img src={query} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Verifique as datas das últimas visitas realizadas e as próximas visitas agendadas
                     </div>
                     <div className="buttonLine">
                        <Link to="/Gerente_hist-visitas" className="buttonB">Acessar agenda</Link>
                     </div>
                  </div>

                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Meu Perfil</b></h5>
                        <img src={UserManagerIcon} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Verifique, edite e atualize suas informações pessoais (nome, endereço, telefone e email)
                     </div>
                     <div className="buttonLine">
                        <Link to="/Gerente_perfil" className="buttonB">Visualizar perfil</Link>
                     </div>
                  </div>
               </div>

               <div className="gridBoxOptions_lines">
                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Cadastro de Endereços</b></h5>
                        <img src={HomeAddress} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Cadastre ou altere informações de endereços na plataforma
                     </div>
                     <div className="buttonLine">
                        <Link to="/Gerente_home-endereco" className="buttonB">Acessar endereços</Link>
                     </div>
                  </div>

                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Histórico de Consultas</b></h5>
                        <img src={query} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Área para visualizar o histórico de consultas, assim como consultas futuras
                     </div>
                     <div className="buttonLine">
                        <Link to="/Gerente_hist-consultas" className="buttonB">Acessar consultas</Link>
                     </div>
                  </div>

                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Área de Dashboards</b></h5>
                        <img src={dashIcon} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Visualize, altere e faça análises com nossos dashboards personalizados para melhor monitorar a saúde da sua região
                     </div>
                     <div className="buttonLine">
                        <Link to="/Gerente_dashboards" className="buttonB">Ir para Dashboards</Link>
                     </div>
                  </div> 
               </div> 
            </div>
         </main>
      </div>
   )
}

export default Gerente_home;