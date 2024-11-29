import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png'

const EsqueceuSenha = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-center">
      <header className="p-6">
        <img src={logo} alt="Logo" className="w-80 h-20 mt-5" />
      </header>

      <main className="flex flex-col items-center p-8">
        <form className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Redefina sua senha</h2>
          <p className="text-gray-600 mb-4">
            Para redefinir sua senha, informe seu e-mail e nós enviaremos um e-mail mostrando as instruções
          </p>
          <input
            type="email"
            placeholder="E-Mail"
            required
            className="border rounded-full py-2 px-4 w-full mb-4"
          />
          <button
            type="submit"
            className="btn-cheetah text-white py-2 px-4 rounded-full w-full"
          >
            Enviar
          </button>
          <Link to="/login" className="text-blue-500 block mt-4">Voltar</Link>
        </form>
      </main>

    </div>
  );
};

export default EsqueceuSenha;
