import { useUsuario } from "../context/UsuarioContext";

export function usePermissao(tipoPermitido) {
   const {usuario} = useUsuario();
   if (!usuario) return false;

   return usuario.tipoPermitido === tipoPermitido;
}