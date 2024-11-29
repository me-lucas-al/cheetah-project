import React from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/images/logo.png";

const Itinerario = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-center">
      <header className="p-6">
        <img src={logo} alt="Logotipo da aplicação" className="w-80 h-20 mt-8" />
      </header>

      <main className="flex flex-col items-center p-8 bg-white rounded-md">
        <h1 className="text-2xl font-bold mb-4">Itinerário</h1>
        <p>
          Este ainda é um projeto futuro, estamos trabalhando nisso...
        </p>
        <Link to="/login" className="text-blue-500 block mt-4 hover:underline">Voltar</Link>
      </main>
    </div>
  );
};

export default Itinerario;
