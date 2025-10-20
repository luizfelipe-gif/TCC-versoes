import "../../App.css"
import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import PageWIP from "../../components/PageWIP/Index";
import ButtonBack from "../../components/ButtonBack/Index"
import { Link, useNavigate  } from "react-router-dom";

function Agente_homeUsuario() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home" style={{position: "relative"}}>
            <Link to="/Agente_home" className="backButton">
               <ButtonBack />
            </Link>

            <div className="title_Home">
               <h1><b>Cadastro de Usuarios</b></h1>
            </div>

            <div className="simpleBoxShadow">
               <h4>Selecione uma das opções abaixo</h4><br />

               <div className="shortcutField paciente-home">
                  <Link to='/Agente_cad-usuario'><div className="shortcutClick"><p>Cadastrar novo usuário</p></div></Link>
                  <Link to='/Agente_alt-usuario'><div className="shortcutClick"><p>Alterar usuários</p></div></Link>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Agente_homeUsuario;