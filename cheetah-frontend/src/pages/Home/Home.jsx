import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/images/logo.png';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Menu de Navegação */}
      <nav className="bg-gray-900 text-white py-4 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="w-80 h-20" />
          </div>
          <div className="space-x-6">
            <Link to="/" className="hover:underline">Início</Link>
            <Link to="/forum" className="hover:underline">Fórum</Link>
            <Link to="/sobre" className="hover:underline">Sobre</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/cadastroGeral" className="hover:underline">Cadastro</Link>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-28 px-4 bg-gray-50">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900">Bem-vindo ao Portal Cheetah</h1>
          <p className="mt-4 text-lg text-gray-600">Conectando você ao conhecimento e à comunidade.</p>
        </header>

        <main className="flex flex-col items-center space-y-6">
          <Link to="/forum">
            <button className="btn-primary w-64 py-3 px-6 text-lg">Acessar Fórum</button>
          </Link>
          <Link to="/sobre">
            <button className="btn-secondary w-64 py-3 px-6 text-lg">Saber Mais</button>
          </Link>
          <Link to="/login">
            <button className="btn-primary w-64 py-3 px-6 text-lg">Fazer Login</button>
          </Link>
          <Link to="/cadastroGeral">
            <button className="btn-secondary w-64 py-3 px-6 text-lg">Cadastrar-se</button>
          </Link>
        </main>
      </div>

      {/* Rodapé */}
      <footer className="bg-teal-700 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Cheetah. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Conectando comunidades com tecnologia.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
