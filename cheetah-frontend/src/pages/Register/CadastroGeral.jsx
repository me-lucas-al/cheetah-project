import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'

function CadastroGeral(){
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4 py-8">
      <header className="mb-8">
        <img src={logo} alt="Logo" className="w-80 h-20" />
      </header>

      <main className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-8 mt-4">Você quer se cadastrar como:</h2>
        <div className="space-y-4">
          <Link to="/cadastroAluno">
            <button className="bg-gray-700 cursor-pointer hover:bg-gray-500 text-white w-full py-2 rounded-md">Aluno</button>
          </Link>
          <Link to="/cadastroMonitor">
            <button className="mt-5 bg-gray-700 cursor-pointer hover:bg-gray-500 text-white w-full py-2 rounded-md">Monitor</button>
          </Link>
        </div>
        <Link to="/login" className="mt-6 inline-block text-blue-600 hover:underline">Voltar</Link>
      </main>

    </div>
  );
};

export default CadastroGeral;
