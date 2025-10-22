import "./Paciente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_paciente/"
import ButtonAjuda from "../../components/ButtonAjuda"
import { Link } from "react-router-dom";
import { useUsuario } from '../../context/UsuarioContext';

import more from '../../components/Sidenav/iconsSideBar/more.png';
import AddUserMale     from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';

function Paciente_home() {
   const { setUsuario, usuario } = useUsuario();

   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <ButtonAjuda/>
         <main className="content-home">
            <div className="title_Home">
               <img src={more} id="logoMore"/><br /><br />
               <h2><b>Olá, {usuario.nome}!</b></h2> {/* PRONTO PRA ESTILIZAR: NOME DO USUARIO DINAMICO */}
               <h4>Bem-vindo(a) à sua área do paciente.</h4>
            </div>

            {/* <p><b>Navegar para:</b></p> */}
            <div className="shortcutField paciente-home">
            </div>

            <div className="gridBoxOtherOptions">
               <div className="gridBoxOptions_lines">
                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Meu Perfil</b></h5>
                        <img src={UserManagerIcon} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Verifique, edite e atualize suas informações pessoais (nome, endereço, telefone e email)
                     </div>
                     <div className="buttonLine">
                        <Link to="/Paciente_perfil" className="buttonB">Visualizar perfil</Link>
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
                        <Link to="/Paciente_hist-consultas" className="buttonB">Clique para mais</Link>
                     </div>
                  </div>
               </div>

               <div className="gridBoxOptions_lines">
                  <div className="boxSimpleInfos boxSimpleInfos-larger">
                     <div className="headerLine">
                        <h5><b>Área de Dashboards</b></h5>
                        <img src={dashIcon} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Visualize, altere e faça análises com nossos dashboards personalizados para melhor monitorar a saúde da sua região
                     </div>
                     <div className="buttonLine">
                        <Link to="/Paciente_dashboards" className="buttonB">Ir para Dashboards</Link>
                     </div>
                  </div>

               </div>  
            </div>
         </main>
      </div>
   )
}


export default Paciente_home;