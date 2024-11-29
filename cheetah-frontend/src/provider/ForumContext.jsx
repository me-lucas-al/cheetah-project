import React, { createContext } from 'react';

// Cria o contexto ForumContext, que permitirá compartilhar dados entre componentes sem necessidade de passar props manualmente
export const ForumContext = createContext();

// Define o componente ForumProvider que encapsula outros componentes filhos e provê o contexto de dados de fórum
export const ForumProvider = ({ children }) => {
  // Dados do fórum, contendo uma lista de universidades, campus e cursos com seus respectivos links
  const forumData = [
    {
      name: 'ENEM',
      courses: [
        { name: 'Informações sobre o ENEM', link: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem' }
      ],
    },
    {
      name: 'USP',
      campuses: [
        {
          name: 'Câmpus São Paulo',
          courses: [
            { name: 'Ciências da Computação - Diurno', link: 'https://uspdigital.usp.br/jupiterweb/listarGradeCurricular?codcg=45&codcur=45051&codhab=1&tipo=N' },
            { name: 'Engenharia de Computação - Integral', link: 'https://uspdigital.usp.br/jupiterweb/listarGradeCurricular?codcg=3&codcur=3121&codhab=10&tipo=N' },
          ],
        },
        {
          name: 'Câmpus São Carlos',
          courses: [
            { name: 'Ciências da Computação - Integral', link: 'https://www.icmc.usp.br/graduacao/ciencias-de-computacao-bacharelado' },
            { name: 'Ciência de Dados - Integral', link: 'https://www.icmc.usp.br/graduacao/ciencia-de-dados-bacharelado' },
            { name: 'Engenharia de Computação - Integral', link: 'https://www.icmc.usp.br/graduacao/engenharia-de-computacao' },
            { name: 'Estatística e Ciência de Dados - Noturno', link: 'https://www.icmc.usp.br/graduacao/estatistica-bacharelado' },
            { name: 'Sistemas de Informação - Noturno', link: 'https://www.icmc.usp.br/graduacao/sistemas-de-informacao-bacharelado' },
          ],
        },
      ],
    },
    {
      name: 'Unicamp',
      campuses: [
        {
          name: 'Câmpus Campinas',
          courses: [
            { name: 'Sistemas de Informação - Integral', link: 'https://www3.ft.unicamp.br/pt-br/graduacao/cursos/bsi' },
          ],
        },
      ],
    },
    {
      name: 'UFMG',
      campuses: [
        {
          name: 'Câmpus Belo Horizonte',
          courses: [
            { name: 'Ciências da Computação - Diurno', link: 'https://ufmg.br/cursos/graduacao/2377/91205' },
            { name: 'Sistemas de Informação - Noturno', link: 'https://ufmg.br/cursos/graduacao/2358/91199' },
          ],
        },
      ],
    },
    {
      name: 'IFSP',
      campuses: [
        {
          name: 'Câmpus Bragança Paulista',
          courses: [
            { name: 'Tecnologia em Análise e Desenvolvimento de Sistemas - Noturno', link: 'https://bra.ifsp.edu.br/cursos-artigos/121-tecnologia-em-analise-e-desenvolvimento-de-sistemas' },
          ],
        },
        {
          name: 'Câmpus São Paulo',
          courses: [
            { name: 'Tecnologia em Análise e Desenvolvimento de Sistemas - Noturno', link: 'https://spo.ifsp.edu.br/tads' },
            { name: 'Sistemas de Informação - Diurno', link: 'https://spo.ifsp.edu.br/tads' },
          ],
        },
        {
          name: 'Câmpus São Carlos',
          courses: [
            { name: 'Engenharia de Software - Integral', link: 'https://scl.ifsp.edu.br/index.php/cursos.html?id=1762:bacharelado-em-engenharia-de-software&catid=61' },
          ],
        },
        {
          name: 'Câmpus Votuporanga',
          courses: [
            { name: 'Sistemas de Informação - Diurno', link: 'https://vtp.ifsp.edu.br/index.php/component/content/article/70-institucional/2604-bsi.html' },
          ],
        },
        {
          name: 'Câmpus Presidente Epitácio',
          courses: [
            { name: 'Ciência da Computação - Integral', link: 'https://pep.ifsp.edu.br/index.php/curso-superior/bacharelado-em-ciencia-da-computacao' },
          ],
        },
        {
          name: 'Câmpus Salto',
          courses: [
            { name: 'Ciência da Computação - Diurno', link: 'https://slt.ifsp.edu.br/index.php/component/content/article?id=509#bacharelado-em-ciencia-da-computacao' },
          ],
        },
        {
          name: 'Câmpus São João da Boa Vista',
          courses: [
            { name: 'Ciência da Computação - Integral', link: 'https://www.sbv.ifsp.edu.br/bacharelados/64-ensino/cursos/387-ciencia-da-computacao' },
          ],
        },
        {
          name: 'Câmpus Birigui',
          courses: [
            { name: 'Engenharia de Computação - Integral', link: 'https://bri.ifsp.edu.br/index.php/cursos-superiores/engenharia-da-computacao' },
          ],
        },
        {
          name: 'Câmpus Piracicaba',
          courses: [
            { name: 'Engenharia de Computação - Integral', link: 'https://prc.ifsp.edu.br/index.php/cursos?layout=edit&id=1221' },
          ],
        },
      ],
    },
  ];

  // Retorna o ForumContext.Provider, que envolve os componentes filhos e compartilha o forumData com eles
  return (
    <ForumContext.Provider value={{ forumData }}>
      {children}
    </ForumContext.Provider>
  );
};
