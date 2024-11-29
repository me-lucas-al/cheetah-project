import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CadastroAluno from "./pages/Register/CadastroAluno";
import CadastroMonitor from "./pages/Register/CadastroMonitor";
import CadastroGeral from "./pages/Register/CadastroGeral";
import EsqueceuSenha from "./pages/Register/Validation/EsqueceuSenha";
import Login from "./pages/Perfil/Login";
import Perfil from "./pages/Perfil/Perfil";
import VerificarCodigo from "./pages/Register/Validation/VerificarCodigo";
import VerificarEmail from "./pages/Register/Validation/VerificarEmail";
import Sobre from "./pages/Home/Sobre";
import Itinerario from "./pages/Home/Itinerario";
import Forum from "./pages/Forum/Forum";
import Admin from "./pages/admin/Admin"
import { ForumProvider } from "./provider/ForumContext";
import { UserProvider } from "./provider/UserContext";  

function App() {
  return (
    <UserProvider>  
      <ForumProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastroAluno" element={<CadastroAluno />} />
            <Route path="/cadastroMonitor" element={<CadastroMonitor />} />
            <Route path="/cadastroGeral" element={<CadastroGeral />} />
            <Route path="/esqueceuSenha" element={<EsqueceuSenha />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verificarCodigo" element={<VerificarCodigo />} />
            <Route path="/verificarEmail" element={<VerificarEmail />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/itinerario" element={<Itinerario />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/admin" element={<Admin/>} />            
          </Routes>
        </Router>
      </ForumProvider>
    </UserProvider> 
  );
}

export default App;
