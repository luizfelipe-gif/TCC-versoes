import './Index.css'
import { Link } from "react-router-dom";

import UserManagerIcon from '../iconsSideBar/UserManagerIcon.png';
import ClosePane       from '../iconsSideBar/Close Pane.png';
import configIcon      from '../iconsSideBar/configIcon.png';
import dashIcon        from '../iconsSideBar/dashIcon.png';
import dbIcon          from '../iconsSideBar/dbIcon.png';
import HomeAddress     from '../iconsSideBar/Home Address.png';
import OrgManagericon  from '../iconsSideBar/OrgManagericon.png';
import query           from '../iconsSideBar/query.png';
import AddUserMale     from '../iconsSideBar/Add User Male.png';
import home            from '../iconsSideBar/Home.png';


// Página Inicial
// Cadastro de Pacientes
// Cadastro de Endereços
// Histórico de Consultas
// Histórico de Visitas
// Perfil
// Dashboards


function Sidenav() {
   return (
      <aside className="sidenav">
         <div className="sidenav-content">
            <div className='sidenav-group1'>
               
               <div className='sidenav-buttons'>
                  <img src={home} className="sideBarIcon"/>
                  <Link to="/Agente_home">
                  <p>Página Inicial</p></Link>
               </div>

               <div className='sidenav-buttons'>
                  <img src={AddUserMale} className="sideBarIcon"/>
                  <Link to="/Agente_cad-paciente">
                  <p>Cadastro de Pacientes</p></Link>
               </div>

               <div className='sidenav-buttons'>
                  <img src={HomeAddress} className="sideBarIcon"/>
                  <Link to="/Agente_cad-endereco">
                  <p>Cadastro de Endereços</p></Link>
               </div>

               <div className='sidenav-buttons'>
                  <img src={query} className="sideBarIcon"/>
                  <Link to="/Agente_hist-consultas">
                  <p>Histórico de Consultas</p></Link>
               </div>

               <div className='sidenav-buttons'>
                  <img src={query} className="sideBarIcon"/>
                  <Link to="/Agente_hist-visitas">
                  <p>Agenda de Visitas</p></Link>
               </div>

            </div>

            <div className='sidenav-group2'>

               <div className='sidenav-buttons'>
                  <img src={UserManagerIcon} className="sideBarIcon"/>
                  <Link to="/Agente_perfil">
                  <p>Meu Perfil</p></Link>
               </div>

               <div className='sidenav-buttons'>
                  <img src={dashIcon} className="sideBarIcon"/>
                  <Link to="/Agente_dashboards">
                  <p>Dashboards</p></Link>
               </div>

            </div>

         </div>
      </aside>
   )
};

export default Sidenav;