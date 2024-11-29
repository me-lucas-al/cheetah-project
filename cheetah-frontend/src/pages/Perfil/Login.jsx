import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // Importação do React Hook Form
import logo from "/src/assets/images/logo.png";
import eye from "/src/assets/images/eye.svg";
import eyeoff from "/src/assets/images/eye-off.svg";
import api from "../../api/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // Controle de visibilidade da senha
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (data) => {
    try {
      // Envia os dados para o backend
      const response = await api.post("/login", data);

      // Caso o login seja bem-sucedido
      alert("Login bem-sucedido", response.data);

      // Redireciona o usuário após o login
      navigate("/perfil");
    } catch (error) {
      if (error.response?.status === 404) {
        setErrorMessage("Usuário não encontrado.");
      } else if (error.response?.status === 401) {
        setErrorMessage("E-mail ou senha inválidos.");
      } else {
        setErrorMessage("Erro ao realizar o login. Tente novamente.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4 py-8">
      <header className="mb-8">
        <img src={logo} alt="Logo" className="w-80 h-20" />
      </header>

      <main className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Faça o login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Input para email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Usuário"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              {...register("email", {
                required: "O campo de e-mail é obrigatório",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Insira um e-mail válido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Input para senha */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              {...register("senha", {
                required: "O campo de senha é obrigatório",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
            />
            <img
              src={showPassword ? eye : eyeoff}
              alt="Show/Hide password"
              className="absolute right-3 top-3 cursor-pointer w-5 h-5"
              onClick={togglePassword}
            />
            {errors.senha && (
              <p className="text-red-600">{errors.senha.message}</p>
            )}
          </div>
          {errorMessage && (
            <p className="m-2 text-red-500 text-sm text-center">
              {errorMessage}
            </p>
          )}

          {/* Botão de envio */}
          <button
            type="submit"
            className="btn-cheetah text-white w-full py-2 rounded-md mb-4"
          >
            Enviar
          </button>

          {/* Links adicionais */}
          <div className="space-y-2 flex flex-col">
            <Link to="/" className="text-blue-600 hover:underline">
              Ir para a home
            </Link>
            <Link to="/esqueceuSenha" className="text-blue-600 hover:underline">
              Esqueceu a senha?
            </Link>
            <Link to="/cadastroGeral" className="text-blue-600 hover:underline">
              Não possui uma conta? Cadastre-se agora
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
 