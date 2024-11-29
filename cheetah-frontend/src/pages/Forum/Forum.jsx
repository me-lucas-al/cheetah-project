import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ForumContext } from '/src/provider/ForumContext';

function Forum() {
  // Usa o contexto do fórum para acessar os dados das universidades
  const { forumData = [] } = useContext(ForumContext);

  // Define o estado para o termo de pesquisa e um objeto para armazenar quais detalhes estão abertos
  const [searchTerm, setSearchTerm] = useState("");
  const [openDetails, setOpenDetails] = useState({});

  // Função para normalizar strings: remove acentuação e converte para minúsculas para facilitar a busca
  const normalizeString = (str) => str
    ?.normalize("NFD") // Normaliza a string para separar os acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .toLowerCase(); // Converte tudo para minúsculas

  // Filtra as universidades e os cursos com base no termo de pesquisa
  const filteredData = useMemo(() => {
    return forumData
    .map((university) => ({
      ...university,
      // Filtra os cursos em cada campus de acordo com o termo de pesquisa
      campuses: university.campuses?.map((campus) => ({
        ...campus,
        courses: campus.courses.filter(course =>
          normalizeString(course.name).includes(normalizeString(searchTerm)) ||
          normalizeString(university.name).includes(normalizeString(searchTerm)) || // Busca pelo nome da universidade
          normalizeString(campus.name).includes(normalizeString(searchTerm)) // Busca pelo nome do campus
        ),
      })).filter(campus => campus.courses.length > 0), // Filtra os campus que têm cursos correspondentes
      courses: university.courses?.filter(course =>
        normalizeString(course.name).includes(normalizeString(searchTerm)) ||
        normalizeString(university.name).includes(normalizeString(searchTerm)) // Busca pelo nome da universidade
      ),
    }))
    .filter(university => (university.courses?.length > 0 || university.campuses?.length > 0)); // Filtra as universidades com cursos correspondentes
  }, [searchTerm, forumData]);
  // Atualiza o estado de quais detalhes devem estar abertos quando o termo de pesquisa muda
  useEffect(() => {
    const newOpenDetails = {};
    filteredData.forEach((university, uniIndex) => {
      // Abre os detalhes das universidades que têm cursos ou campus com cursos correspondentes
      if (university.courses?.length > 0 || university.campuses?.some(campus => campus.courses.length > 0)) {
        newOpenDetails[uniIndex] = true;
      }
    });
    setOpenDetails(newOpenDetails); // Atualiza o estado com as novas configurações de detalhes abertos
  }, [searchTerm, filteredData]); // Executa o efeito sempre que o termo de pesquisa ou os dados filtrados mudarem

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center  px-4 py-8">
      <header className="mb-8">
        <img src="/src/assets/images/logo.png" alt="Logo" className="w-80 h-20" />
      </header>

      <main className="bg-white p-6 rounded-lg shadow-md-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Fórum de Universidades</h2>

        {/* Campo de entrada de texto e botão para o termo de pesquisa */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Pesquisar curso, cidade ou universidade"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa conforme o usuário digita
            className="border p-2 flex-1 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={() => setSearchTerm("")} // Limpa o termo de pesquisa ao clicar no botão
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            Buscar
          </button>
        </div>

        {/* Lista as universidades e cursos filtrados */}
        <div className="space-y-4">
          {filteredData.map((university, index) => (
            <details key={index} className="bg-gray-50 p-4 rounded shadow-md cursor-pointer" open={openDetails[index]}>
              <summary className="font-semibold text-lg text-gray-900">{university.name}</summary>

              {/* Lista os cursos diretos da universidade */}
              {university.courses && university.courses.map((course, courseIndex) => (
                <details key={courseIndex} className="mt-2 ml-6 pl-4" open>
                  <summary className="font-semibold text-gray-900">{course.name}</summary>
                  
                  {/* Link para acessar o fórum e saber mais sobre o curso */}
                  <p className="mt-2 ml-6">
                    <a href="https://chat-cheetah.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Acessar o fórum
                    </a>
                  </p>
                  <p className="mt-2 ml-6">
                    <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Saiba mais 
                    </a>
                  </p>
                </details>
              ))}

              {/* Lista os cursos em cada campus da universidade */}
              {university.campuses && university.campuses.map((campus, campusIndex) => (
                <details key={campusIndex} className="mt-4 ml-6 pl-4" open>
                  <summary className="font-semibold text-lg text-gray-900">{campus.name}</summary>
                  {campus.courses.map((course, courseIndex) => (
                    <details key={courseIndex} className="mt-2 ml-6 pl-4" open>
                      <summary className="font-semibold text-gray-900">{course.name}</summary>
                      
                      {/* Links para acessar o fórum e obter mais informações sobre o curso */}
                      <p className="mt-2 ml-6">
                        <a href="https://chat-cheetah.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          Acessar o fórum
                        </a>
                      </p>

                      <p className="mt-2 ml-6">
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          Saiba mais 
                        </a>
                      </p>
                    </details>
                  ))}
                </details>
              ))}
            </details>
          ))}
        </div>
        <Link to="/" className="text-blue-600 hover:underline flex justify-center mt-4">Home</Link>
      </main>

      <footer className="mt-8 text-white">
        <p>© Copyright by Cheetah</p>
      </footer>
    </div>
  );
}

export default Forum;
