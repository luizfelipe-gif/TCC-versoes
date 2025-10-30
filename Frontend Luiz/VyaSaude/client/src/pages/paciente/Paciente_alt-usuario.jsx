import "./Paciente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_paciente/"
import { Link } from "react-router-dom";

function Paciente_altUsuario() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home">
            <div className="title_Home">
               <h1><b>Página Inicial</b><br/>(Paciente)</h1>
            </div>

            <div className="grid-container_Home paciente-home">

            </div>
         </main>
      </div>
   )
}

export default Paciente_altUsuario;