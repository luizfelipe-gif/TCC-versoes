import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import ButtonBack from "../../components/ButtonBack/Index"
// import PageWIP from "../../components/PageWIP/Index"
import { useNavigate, Link } from "react-router-dom";
import { Button, FormLabel, TextField } from "@mui/material";
import TabelaVisitas from "../../components/TabelaVisitas/Index";

function Agente_histVisitas() {
   const navigate = useNavigate();

   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-pages">
            <div className="agente-perfil d-block" style={{position: "relative"}}>
               <div className="title-pages">
                  <svg onClick={() => navigate(-1)} style={{ cursor:"pointer" }} className="align-self-start"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#000000"></path> </g></svg>
                  <h1 className="align-self-center h2 px-5">Consulta de Visitas Domiciliares</h1>
               </div>

               <div className="table-inputs">
                  <Button variant="outlined" >Visitas realizadas</Button>
                  <Button variant="outlined">Visitas Agendadas</Button> 
               </div>

               <span className="h4 text-success">Filtros</span>

               <div className="table-inputs">
                  <TextField label="Agente"></TextField>
                  <TextField label="Zona"></TextField>
                  <TextField label="Bairro"></TextField>
                  <TextField label="De: DD/MM/AAAA"></TextField>
                  <TextField label="Até: DD/MM/AAAA"></TextField>
               </div>

               <div className="table-inputs">
                  <Button variant="outline">Aplicar filtros</Button>
                  <Button variant="outline">Remover filtros</Button>
               </div>
               
               <br></br>

               <TabelaVisitas />
            </div>
         </main>
      </div>
   )
}

export default Agente_histVisitas;