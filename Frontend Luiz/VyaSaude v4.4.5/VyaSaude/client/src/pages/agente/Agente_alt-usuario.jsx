import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import ButtonBack from "../../components/ButtonBack/Index"
import PageWIP from "../../components/PageWIP/Index"
import { Link, useNavigate  } from "react-router-dom";

function Agente_altUsuario() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home" style={{position: "relative"}}>
            <Link to="/Agente_home-usuario" className="backButton">
               <ButtonBack />
            </Link>
            <div className="title_Home">
               <h1><b>Alterar informações de Usuário</b></h1>
            </div>

            <PageWIP />

            {/* <div className="grid-container_Home agente-home">

            </div> */}
         </main>
      </div>
   )
}

export default Agente_altUsuario;