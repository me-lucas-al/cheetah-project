import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import logo from "/src/assets/images/logo.png";

const Admin = () => {
  const navigate = useNavigate();
  
  // Estado para armazenar dados do usuário, lista de usuários e mensagem de erro
  const [userData, setUserData] = useState({
    id: "",
    nome: "",
    email: "",
    tipoUser: "",
    dataNascimento: "",
    cidade: "",
    estado: "",
    rg: "",
    formacao: "",
    statusFormacao: "",
    genero: "", // Adicionando o campo para gênero
  });
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Função para buscar os dados de um usuário pelo ID
  const fetchUserData = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      setUserData(response.data);
    } catch (err) {
      console.error("Erro ao carregar os dados do usuário:", err);
    }
  };

  // Função para listar todos os usuários
  const fetchAllUsers = async () => {
    try {
      const response = await api.get("/users");
      setUserList(response.data);
    } catch (err) {
      console.error("Erro ao carregar os usuários:", err);
      setError("Erro ao carregar os usuários.");
    }
  };

  // Função para listar todos os monitores
  const fetchMonitors = async () => {
    try {
      const response = await api.get("/users/monitor");
      setUserList(response.data);
    } catch (err) {
      console.error("Erro ao carregar os monitores:", err);
      setError("Erro ao carregar os monitores.");
    }
  };

  // Função para listar todos os alunos
  const fetchStudents = async () => {
    try {
      const response = await api.get("/users/aluno");
      setUserList(response.data);
    } catch (err) {
      console.error("Erro ao carregar os alunos:", err);
      setError("Erro ao carregar os alunos.");
    }
  };

  // Função para atualizar o usuário
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/users/${userData.tipoUser.toLowerCase()}/${userData.id}`, {
        ...userData,
        rg: userData.rg || '', 
        formacao: userData.formacao || '', 
        statusFormacao: userData.statusFormacao || '',
      });
      alert("Usuário atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar o usuário:", err);
      setError("Erro ao atualizar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar o usuário
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este usuário?");
    if (confirmDelete) {
      try {
        await api.delete(`/users/${userData.tipoUser.toLowerCase()}/${userId}`);
        alert("Usuário excluído com sucesso!");
        setUserData({});
        fetchAllUsers(); // Recarregar a lista de usuários após exclusão
      } catch (err) {
        console.error("Erro ao excluir o usuário:", err);
        setError("Erro ao excluir o usuário.");
      }
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <img src={logo} alt="Logo" className="w-80 h-20 mb-8" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Administração</h2>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {/* Formulário de atualização de usuário */}
        <form onSubmit={handleUpdateUser} className="mb-6">
          <div>
            <label>ID do usuário</label>
            <input
              type="text"
              name="id"
              value={userData.id}
              onChange={(e) => setUserData({ ...userData, id: e.target.value })}
              className="border p-2 w-full"
              placeholder="Digite o ID do usuário"
            />
          </div>
          <button
            type="button"
            onClick={() => fetchUserData(userData.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
          >
            Buscar usuário por ID
          </button>
        </form>

        {userData.id && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dados do Usuário</h3>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label>Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={userData.nome}
                  onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Tipo de Usuário</label>
                <select
                  name="tipoUser"
                  value={userData.tipoUser}
                  onChange={(e) => setUserData({ ...userData, tipoUser: e.target.value })}
                  className="border p-2 w-full"
                >
                  <option value="Aluno">Aluno</option>
                  <option value="Monitor">Monitor</option>
                </select>
              </div>
              {/* Campo para o gênero */}
              <div>
                <label>Gênero</label>
                <select
                  name="genero"
                  value={userData.genero}
                  onChange={(e) => setUserData({ ...userData, genero: e.target.value })}
                  className="border p-2 w-full"
                >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {/* Exibindo detalhes adicionais se for Monitor */}
              {userData.tipoUser === "Monitor" && (
                <>
                  <div>
                    <label>RG</label>
                    <input
                      type="text"
                      name="rg"
                      value={userData.rg}
                      onChange={(e) => setUserData({ ...userData, rg: e.target.value })}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>Formação</label>
                    <input
                      type="text"
                      name="formacao"
                      value={userData.formacao}
                      onChange={(e) => setUserData({ ...userData, formacao: e.target.value })}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>Status da Formação</label>
                    <input
                      type="text"
                      name="statusFormacao"
                      value={userData.statusFormacao}
                      onChange={(e) => setUserData({ ...userData, statusFormacao: e.target.value })}
                      className="border p-2 w-full"
                    />
                  </div>
                </>
              )}
              <div>
                <label>Data de Nascimento</label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={userData.dataNascimento}
                  onChange={(e) => setUserData({ ...userData, dataNascimento: e.target.value })}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={userData.cidade}
                  onChange={(e) => setUserData({ ...userData, cidade: e.target.value })}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={userData.estado}
                  onChange={(e) => setUserData({ ...userData, estado: e.target.value })}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mt-6 flex">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Atualizando..." : "Atualizar Usuário"}
                </button>
                <button
                  onClick={() => handleDeleteUser(userData.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 ml-4"
                >
                  Excluir Usuário
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de usuários */}
        <div className="mt-8 w-full">
          <h3 className="text-xl font-semibold text-gray-800">Lista de Usuários</h3>
          <button
            onClick={fetchMonitors}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
          >
            Listar Monitores
          </button>
          <button
            onClick={fetchStudents}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 ml-4"
          >
            Listar Alunos
          </button>
          <button
            onClick={fetchAllUsers}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 ml-4"
          >
            Listar Todos os Usuários
          </button>
          <div className="mt-6">
            {userList.length > 0 ? (
              <ul>
                {userList.map((user) => (
                  <li key={user.id} className="text-gray-700">
                    {user.id} - {user.nome} ({user.tipoUser}) - {user.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">Nenhum usuário encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
