import React, { useEffect, useState } from "react";
import { useForm} from "react-hook-form";
import { useNavigate, Link  } from "react-router-dom";
import api from "../../api/api";
import eye from "../../assets/images/eye.svg";
import eyeOff from "../../assets/images/eye-off.svg";
import Layout from "../Layout/Layout";
import { useUser } from "../../provider/UserContext";

const CadastroAluno = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserId } = useUser(); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const senha = watch("senha");
  const confirmarSenha = watch("confirmarSenha");

  const onSubmit = async (data) => {
    setErrorMessage(""); // Limpar mensagens de erro anteriores
    try {
      const response = await api.post("/users/aluno", {
        ...data,
        tipoUser: "Aluno",
      });
      const userId = response.data.id; // Captura o ID do usuário retornado
      setUserId(userId); // Armazena no contexto
      localStorage.setItem("userId", userId); // Armazena no localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data)); // Salva todas as informações do usuário
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error.response?.data || error.message);

      if (error.response?.status === 500) {
        setErrorMessage("E-mail já cadastrado. Tente outro e-mail.");
      } else {
        setErrorMessage("Erro ao realizar o cadastro. Tente novamente.");
      }
    }
  };

  useEffect(() => {
    const fetchEstados = async () => {
      const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
      const data = await response.json();
      setEstados(data);
    };
    fetchEstados();
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      const fetchCidades = async () => {
        const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`;
        const response = await fetch(urlCidades);
        const data = await response.json();
        setCidades(data);
      };
      fetchCidades();
    } else {
      setCidades([]);
    }
  }, [estadoSelecionado]);

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Cadastro Aluno</h2>

        <input
          type="text"
          placeholder="Nome Completo"
          className="input-cheetah mb-4"
          {...register("nome", { required: "Nome é obrigatório" })}
        />
        {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}

        <input
          type="email"
          placeholder="E-Mail"
          className="input-cheetah mb-4"
          {...register("email", {
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: "Formato de e-mail inválido",
            },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="input-cheetah"
            {...register("senha", { required: "Senha é obrigatória", minLength: { value: 6, message: "Senha deve ter pelo menos 6 caracteres" } })}
          />
          <img
            src={showPassword ? eye : eyeOff}
            alt="Mostrar/Esconder Senha"
            className="absolute right-3 top-3 cursor-pointer w-6 h-6"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            className="input-cheetah"
            {...register("confirmarSenha", {
              required: "Confirmação de senha é obrigatória",
              validate: (value) => value === senha || "As senhas não coincidem",
            })}
          />
          <img
            src={showConfirmPassword ? eye : eyeOff}
            alt="Mostrar/Esconder Confirmação de Senha"
            className="absolute right-3 top-3 cursor-pointer w-6 h-6"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        {errors.confirmarSenha && <p className="text-red-500 text-sm">{errors.confirmarSenha.message}</p>}

        <label className="block text-sm mb-1">Data de nascimento</label>
        <input
          type="date"
          className="input-cheetah mb-4"
          {...register("dataNascimento", { required: "Data de nascimento é obrigatória" })}
        />
        {errors.dataNascimento && <p className="text-red-500 text-sm">{errors.dataNascimento.message}</p>}

        <label className="block text-sm mb-1">Gênero</label>
        <select
          className="input-cheetah mb-4"
          {...register("genero", { required: "Selecione um gênero" })}
        >
          <option value="">Selecione</option>
          <option>Feminino</option>
          <option>Masculino</option>
          <option>Outro</option>
        </select>
        {errors.genero && <p className="text-red-500 text-sm">{errors.genero.message}</p>}

        <label htmlFor="estado" className="block text-sm mb-1">
          Estado
        </label>
        <select
          id="estado"
          className="input-cheetah mb-4"
          {...register("estado", { required: "Selecione um estado" })}
          onChange={(e) => setEstadoSelecionado(e.target.value)}
        >
          <option value="">Selecione</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.sigla}>
              {estado.nome}
            </option>
          ))}
        </select>
        {errors.estado && <p className="text-red-500 text-sm">{errors.estado.message}</p>}

        <label htmlFor="cidade" className="block text-sm mb-1">
          Cidade
        </label>
        <select
          id="cidade"
          className="input-cheetah mb-4"
          {...register("cidade", { required: "Selecione uma cidade" })}
          disabled={!cidades.length}
        >
          <option value="">Selecione</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>
        {errors.cidade && <p className="text-red-500 text-sm">{errors.cidade.message}</p>}

        <button type="submit" className="btn-cheetah w-full mb-4">
          Cadastrar
        </button>

        <Link to="/cadastroGeral" className=" flex text-blue-600 hover:underline text-center justify-center">Voltar</Link>
        {errorMessage && <p className="mt-2 text-red-500 text-sm text-center">{errorMessage}</p>}

      </form>
    </Layout>
  );
};

export default CadastroAluno;
