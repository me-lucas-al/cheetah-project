import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import defaultProfileImage from "/src/assets/images/default-profile.png";
import logo from "/src/assets/images/logo.png";
import { useUser } from "/src/provider/UserContext.jsx";

const Perfil = () => {
  const navigate = useNavigate();
  const { userId } = useUser();

  const [userData, setUserData] = useState({
    id: "",
    tipoUser: "",
    nome: "",
    email: "",
    dataNascimento: "",
    estado: "",
    cidade: "",
    formacao: "",
    formacaoStatus: "",
    rg: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.get(`/users/${userId}`);
        const { tipoUser } = userResponse.data;
        const response = await api.get(`/users/${tipoUser.toLowerCase()}/${userId}`);
        setUserData(response.data);
      } catch (err) {
        console.error("Erro ao carregar os dados do usuário:", err);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir seu perfil?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/users/${userData.tipoUser.toLowerCase()}/${userId}`);
        localStorage.clear();
        alert("Perfil excluído com sucesso!");
        navigate("/login");
      } catch (err) {
        console.error("Erro ao excluir o perfil:", err);
        setError("Erro ao excluir o perfil. Tente novamente.");
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();  // Previne o recarregamento da página

    try {
      setLoading(true);
      await api.put(`/users/${userData.tipoUser.toLowerCase()}/${userId}`, userData);
      alert("Perfil atualizado com sucesso!");
      setIsEditing(false);  // Volta para o modo de exibição após editar
    } catch (err) {
      console.error("Erro ao atualizar o perfil:", err);
      setError("Erro ao atualizar o perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Função para formatar a data no padrão brasileiro (DD/MM/YYYY)
  const formatDateToBR = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('pt-BR');
  };

  // Função para converter data para o formato ISO (YYYY-MM-DD) para input de tipo date
  const formatDateForInput = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <img src={logo} alt="Logo" className="w-80 h-20 mb-8" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl flex flex-col items-center">
        <img
          src={defaultProfileImage}
          alt="Usuário"
          className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {userData.nome || "Usuário"}
        </h2>
        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="mt-8">
          {!isEditing ? (
            <div>
              {/* Exibindo email com o label */}
              <p className="text-gray-700">
                <strong>Email:</strong> {userData.email || "Não fornecido"}
              </p>

              {/* Exibindo data de nascimento formatada no padrão brasileiro */}
              {userData.dataNascimento && (
                <p className="text-gray-700">
                  <strong>Data de Nascimento:</strong> {formatDateToBR(userData.dataNascimento)}
                </p>
              )}
              {userData.estado && (
                <p className="text-gray-700">
                  <strong>Estado:</strong> {userData.estado}
                </p>
              )}
              {userData.cidade && (
                <p className="text-gray-700">
                  <strong>Cidade:</strong> {userData.cidade}
                </p>
              )}

              {/* Mostrar RG, Formação e Status da Formação somente se o usuário não for Aluno */}
              {userData.tipoUser !== "Aluno" && (
                <>
                  {userData.rg && (
                    <p className="text-gray-700">
                      <strong>RG:</strong> {userData.rg}
                    </p>
                  )}
                  {userData.formacao && (
                    <p className="text-gray-700">
                      <strong>Formação:</strong> {userData.formacao}
                    </p>
                  )}
                  {userData.formacaoStatus && (
                    <p className="text-gray-700">
                      <strong>Status da Formação:</strong> {userData.formacaoStatus}
                    </p>
                  )}
                </>
              )}

              <div className="flex justify-between mt-6">
                {/* Botão de Editar visível quando não está no modo de edição */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Excluir Perfil
                </button>
              </div>
              <Link to="/login" className=" mt-8 flex text-blue-600 hover:underline text-center justify-center">Voltar</Link>

            </div>
          ) : (
            <form onSubmit={handleUpdateProfile}>
              <div>
                <label>Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={userData.nome}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Data de Nascimento</label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formatDateForInput(userData.dataNascimento)}  // Formato para o campo de data
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={userData.estado}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={userData.cidade}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              {/* Mostrar RG, Formação e Status da Formação somente se o usuário não for Aluno */}
              {userData.tipoUser !== "Aluno" && (
                <>
                  <div>
                    <label>RG</label>
                    <input
                      type="text"
                      name="rg"
                      value={userData.rg}
                      onChange={handleChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>Formação</label>
                    <input
                      type="text"
                      name="formacao"
                      value={userData.formacao}
                      onChange={handleChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>Status da Formação</label>
                    <input
                      type="text"
                      name="formacaoStatus"
                      value={userData.formacaoStatus}
                      onChange={handleChange}
                      className="border p-2 w-full"
                    />
                  </div>
                </>
              )}

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Atualizando..." : "Atualizar Perfil"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
