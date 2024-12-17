import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importa useNavigate
import Button from "../components/Button";
import styled from "styled-components";

const CapsuleBodyContainerStyle = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: #47A2C3B2;
width: 100vw;
height: 100vh;
margin: 5vh 0 0 0;
border-radius: 20px 20px 0 0;
border: 3px solid #F3B105;
box-shadow: 0px 4px 50px 0px #F3B10566;

  & .btn-success { /*Botão de aplicar filtro*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1A4862;
    color: #fff;
    border: 2px solid #1A4862;
    box-shadow: 0px 4px 4px 0px #00000033;
    top: 733px;
    font-size: 1rem;
    left: 665px;
    padding: 10px 10px;
    gap: 10px;
    border-radius: 4px;
    border: 2px 0px 0px 0px;
    opacity: 0px;
  }

& .btn-success:hover {
  background-color: #2a6f97;
}

& #filter-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
  width: 99vw;
  height: 85vh;
  margin: 3vh 0 0 0;
  position: absolute;
  bottom: 0;
  border-radius: 20px;
  border: 1px solid #0000001a;

  & .filter-form {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: 100px;
  }
  & #form-group-filter{
  display:flex;
  align-content: center;
  justify-content: space-evenly;
  align-items: baseline;
  width: 60vw;
  }
  & .link-filter {
  margin: 35px 0 0 0;
  }
  & .link-filter-button {
    padding: 10px;
    border-radius: 6px;
    text-decoration: none;
    background: red;
    text-decoration: none;
    color: #fff;
  }

    & #filter-input{
        border: 1px solid #00000045;
        box-shadow: 2px 3px 4px 0px #00000045 inset;
        padding-left: 2%;
        width: 100%;
        height: 50px;
        font-size: 1.2rem;
        min-height: 37px;
        border: 1px solid 00000045;
        border-radius: 10px;
        outline-color: #1A4862;
        padding-left: 10px;
      }

      & .filter-label-input {
      width: 20vw;
      font-size: 1.2rem;
      }

      & #filter-results{
        display: flex;
        justify-content: center;
        align-items: baseline;
        align-content: center;
        list-style: none;
        max-width: 89%;
        min-width:89%;
        padding: 20px;
        min-height: 200px;
        border: 1px solid #00000045;
        box-shadow: 2px 3px 4px 0px #00000045 inset;
        border-radius: 10px;

        & .box-filter-result {
          display:flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 70px;
          border-bottom: 1px solid #3636364d;
          width: 98%;
        
        & p {
          display:flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 60px;
      }
      & a {
        display:flex;
        justify-content: center;
        align-items: center;
        max-height: 30px;
        width: 200px;
        padding: 5px;
        border-radius: 6px;
        text-decoration: none;
        font-size: 1rem;
        background-color: #47A2C3B2;
        color: #1e3a8a;
      }
      & a:hover {
        background-color: #31748db2;
      }
    }    
}
}`;

const FilterNew = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  const [fileUrl, setFileUrl] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [pdfUrl, setPdfUrl] = useState(""); // Armazena a URL do PDF
  const [resultMessage, setResultMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const caminho = import.meta.env.VITE_API;
  const [fileName, setFileName] = useState(""); // Adiciona estado para o nome do arquivo

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const file = params.get("file");
    if (file) {
      setFileUrl(file);
    }
  }, [location.search]);

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    if (filterValue.trim() === "") {
      alert("Por favor, insira um critério de filtro.");
      return;
    }

    setLoading(true); // Mostra um carregamento durante o processo
    setResultMessage(""); // Limpa a mensagem anterior
    setPdfUrl(""); // Limpa a URL do PDF anterior
    setFileName(""); // Limpa o nome do arquivo anterior

    try {
      const response = await fetch(caminho+"filtro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caminhoArquivo: fileUrl,
          filtrarDados: filterValue,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Tente capturar a mensagem de erro
        throw new Error(`Erro ao processar o filtro: ${errorMessage}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType !== "application/pdf") {
        const jsonResponse = await response.json();
        throw new Error(
          jsonResponse.message || "A resposta do servidor não é um arquivo PDF"
        );
      }

      const blob = await response.blob();
      const pdfDownloadUrl = window.URL.createObjectURL(blob);

      // Obtém o nome do arquivo e o número da página a partir dos headers da resposta
      const nomeArquivoOriginal =
        response.headers.get("X-Nome-Original") || "arquivo";
      const numeroPagina = response.headers.get("X-Numero-Pagina") || "1";

      setPdfUrl(pdfDownloadUrl);
      setFileName(`${nomeArquivoOriginal}_pagina_${numeroPagina}.pdf`); // Define o nome do arquivo
      setResultMessage("Página filtrada disponível para visualização.");

    } catch (error) {
      setLoading(false);

      if (error instanceof Error) {
        console.error("Erro ao filtrar:", error.message); // Acessa a mensagem do erro
        setResultMessage(
          "Ocorreu um erro ao processar a solicitação: " + error.message + "\nPor favor, pesquise manualmente."
        );
      } else {
        console.error("Erro desconhecido:", error);
        setResultMessage("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button text="Tela Inicial" isHomeButton onClick={() => navigate('/')} /> {/* Atualizando para usar useNavigate */}
      <CapsuleBodyContainerStyle>
        <div className="container mt-5" id="filter-container">
          <h1>Filtrar Dados no PDF</h1>

          {/* Botão para voltar à página anterior */}

          <form onSubmit={handleFilterSubmit} className="filter-form">
            <div className="form-group" id="form-group-filter">
              <label htmlFor="filter-input" className="filter-label-input">Digite o critério de filtro:</label>
              <input
                type="text"
                id="filter-input"
                className="form-control"
                placeholder="Exemplo: 0001.06.000.000-8"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              {loading ? "Processando..." : "Aplicar Filtro"}
            </button>
          </form>

          {/* Exibe a mensagem de resultado */}
          <div id="filter-results" className="mt-4">
            <div className="box-filter-result">
              <p>{resultMessage}</p>
            {/* Exibe o botão para visualizar o PDF filtrado apenas se houver um PDF disponível */}
            {pdfUrl && (
              <a href={pdfUrl} download={fileName} target="_blank" rel="noopener noreferrer" className="btn btn-info mt-3">
                Visualizar Página Filtrada
              </a>
            )}
            </div> 
          </div>
          <div className="mb-4 link-filter">
            <a
              href={caminho + fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary link-filter-button"
            >
              Ver PDF Original
            </a>
          </div>
        </div>
      </CapsuleBodyContainerStyle>
    </>
  );
};

export default FilterNew;