import "./Admin.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_admin/"
import { Link, useNavigate  } from "react-router-dom";

function Admin_bDados() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home">
            <div className="title_Home">
               <h1><b>Página Inicial</b><br/>(Admin)</h1>
            </div>
            <div className="grid-container_Home admin_home_grid">

            </div>
         </main>
      </div>
   )
}

export default Admin_bDados;