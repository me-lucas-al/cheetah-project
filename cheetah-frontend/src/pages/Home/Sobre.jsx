import React from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/images/logo.png";

const Sobre = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-center">
      <header className="p-6">
        <img src={logo} alt="Logo" className="w-80 h-20 mt-5" />
      </header>

      <main className="flex flex-col items-center p-8 max-w-[50rem] bg-white rounded-lg min-h-auto">
        <p className="text-2xl font-bold mb-4">Sobre o Projeto Cheetah</p>
        <p className="text-lg leading-relaxed text-gray-700 space-y-4">
  O projeto <strong>Cheetah</strong> surgiu nas salas de aula do IFSP de
  Bragança Paulista, onde, no terceiro ano do curso técnico de
  informática, cinco alunos –{" "}
  <strong>
    Rafael Lopes Aniceto, Raul Ramos Cirilo, Lucas Almeida de Souza,
    Matheus Gabriel Veronez e Igor Frediani
  </strong>{" "}
  – tiveram a ideia de ajudar vestibulandos em sua jornada para o
  ingresso nas universidades. A experiência de estarem próximos ao
  desafio dos vestibulares despertou neles uma vontade de colaborar com
  aqueles que buscam entrar em cursos específicos, e assim surgiu o
  projeto. A essência deste projeto é criar uma plataforma de apoio
  colaborativo, com espaços de comunicação como chats e fóruns. O
  diferencial está no foco detalhado e específico: cada fórum e chat é
  voltado para um curso e universidade particulares. Isso significa que,
  ao entrar na plataforma, um estudante que deseja ingressar em um curso
  específico, como Engenharia na Universidade Estadual de Campinas
  (Unicamp), por exemplo, encontrará não apenas dicas gerais sobre
  vestibular, mas também discussões, materiais e conselhos diretamente
  relacionados a essa universidade e ao curso escolhido. A estrutura do
  projeto está pensada para que a comunicação e o compartilhamento de
  conhecimento sejam os elementos centrais. Em cada fórum, os usuários
  podem compartilhar links, documentos e até experiências pessoais, que
  muitas vezes trazem um valor enorme ao permitir que os futuros
  vestibulandos conheçam os caminhos e os desafios de quem já trilhou
  aquele percurso. Mais do que isso, os estudantes podem esclarecer
  dúvidas, pedir ajuda em conteúdos específicos e interagir diretamente
  com quem já está mais avançado na jornada. A expectativa do projeto
  vai além do simples compartilhamento de materiais e dicas. Ele
  representa um espaço de apoio mútuo e construção de uma comunidade de
  aprendizado, onde quem já passou por desafios pode estender a mão para
  aqueles que estão chegando. Com essa plataforma, espera-se que o apoio
  dos vestibulandos uns aos outros faça a diferença, e que os fóruns de
  discussão e interação sirvam para encorajar, orientar e até mesmo
  inspirar os futuros universitários.
</p>

<hr className="my-4 border-gray-300" />

<h2 className="text-lg font-bold">Missão, Visão e Valores do Projeto</h2>

<p className="mt-4">
  <strong>Missão:</strong><br /> Facilitar o acesso à informação e ao
  compartilhamento de materiais e experiências entre estudantes,
  promovendo uma rede de apoio que auxilie vestibulandos a se
  prepararem para ingressar em cursos e universidades específicas. Nosso
  objetivo é proporcionar um ambiente onde a ajuda mútua e o
  conhecimento compartilhado impulsionem todos rumo ao sucesso
  acadêmico.
</p>

<p className="mt-4">
  <strong>Visão:</strong> <br />Ser uma referência para estudantes que buscam
  orientação e apoio em sua jornada acadêmica, formando uma comunidade
  colaborativa de vestibulandos e veteranos que possa crescer e se
  expandir. Almejamos alcançar estudantes em todo o país, tornando o
  aprendizado coletivo acessível e eficaz.
</p>

<p className="mt-4">
  <strong>Valores:</strong>
</p>
<ul className="list-disc list-inside">
  <li>
    <strong>Colaboração:</strong> Acreditamos no poder da ajuda mútua
    e no impacto que o compartilhamento de conhecimento pode ter na
    vida de quem busca oportunidades.
  </li>
  <li>
    <strong>Empatia:</strong> Reconhecemos os desafios enfrentados
    pelos vestibulandos e nos comprometemos a criar um espaço de
    acolhimento, onde todos possam aprender e se sentir apoiados.
  </li>
  <li>
    <strong>Compromisso com a Educação:</strong> Nosso foco é
    contribuir para o desenvolvimento acadêmico de cada usuário,
    oferecendo materiais e informações relevantes para seus objetivos.
  </li>
  <li>
    <strong>Transparência e Confiabilidade:</strong> Priorizamos a
    integridade e a precisão das informações compartilhadas,
    garantindo um ambiente de confiança.
  </li>
  <li>
    <strong>Inclusão:</strong> Promovemos um espaço aberto a todos os
    estudantes, independentemente de curso ou universidade de
    interesse, para que possam colaborar e crescer juntos.
  </li>
</ul>

        

        <Link to="/login" className="text-blue-500 block mt-8 hover:underline">
          Voltar
        </Link>
      </main>
    </div>
  );
};

export default Sobre;
