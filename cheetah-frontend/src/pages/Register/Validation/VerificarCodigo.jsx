import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png'

const VerificarCodigo = () => (
  <div className="flex flex-col items-center min-h-screen bg-gray-900 text-center">
      <header className="p-6">
        <img src={logo} alt="Logo" className="w-80 h-20 mt-5" />
      </header>
  <main className="flex flex-col items-center p-8">
    <form className="bg-white p-6 shadow-md rounded w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Verificação de E-mail</h2>
      <p className="mb-2">Digite o código enviado para seu e-mail</p>
      <input type="number" placeholder="Código" className="border p-2 w-full mb-4" />
      <button className="btn-cheetah text-white px-4 py-2 w-full">Enviar</button>
      <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 block mt-4">Voltar</Link>
      </div>
    </form>
  </main>
  </div>
);

export default VerificarCodigo;
