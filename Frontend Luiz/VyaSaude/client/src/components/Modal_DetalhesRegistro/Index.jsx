import "./Modal_DetalhesRegistro.css";
import api from '../../services/api';

export default function Modal_DetalhesRegistro({onClose}) {
   return (
      <div className="modal-overlay">
         <div className="modal-content">
            <div>
               <span className="h3 text-success">Modal_DetalhesRegistro</span>
            </div>

            <div>
               <h1>Modal_DetalhesRegistro</h1>
            </div>
            
            <button className="buttonModal" onClick={onClose}>Fechar</button>
         </div>
      </div>
   )
}