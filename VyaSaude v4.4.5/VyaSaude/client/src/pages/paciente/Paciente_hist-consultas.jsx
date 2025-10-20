import "./Paciente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_paciente/"
import { Link } from "react-router-dom";
import ButtonBack from "../../components/ButtonBack/Index"
import PageWIP from "../../components/PageWIP/Index"

function Paciente_histConsultas() {
   // return(
   //    <div className="app">
   //       <Header/>
   //       <Sidenav/>
   //       <main className="content-home">
   //          <div className="title_Home">
   //             <h1><b>Histórico de Consultas</b><br/>(Paciente)</h1>
   //          </div>

   //          <div className="grid-container_Home paciente-home">

   //          </div>
   //       </main>
   //    </div>
   // )
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home" style={{position: "relative"}}>
            <Link to="/Paciente_home" className="backButton">
               <ButtonBack />
            </Link>

            <div className="title_Home">
               <h1><b>Histórico de Consultas</b></h1>
            </div>

            <PageWIP />

            {/* <div className="grid-container_Home agente-home">

            </div> */}
         </main>
      </div>
   )
}

export default Paciente_histConsultas;