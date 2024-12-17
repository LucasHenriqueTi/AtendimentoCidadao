import { useState } from 'react';
import { fetchPdfs } from '../services/pdfServiceNew';
import ResultsList from '../components/ResultsListNew';
import SearchBar from '../components/SearchBarNew';
import styled from 'styled-components';
import Button from '../components/Button'; // Importando o Button
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import GlobalStyle from '../style/GlobalStyle';

// Mova a definição do styled component para fora do componente
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

  }
`;

const HomeNew = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // Hook para navegação

  const handleSearch = async (keyword) => {
    try {
      const data = await fetchPdfs(keyword, 'buscar');
      setResults(data);
    } catch (error) {
      console.error('Erro ao buscar PDFs:', error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Button text="Tela Inicial" isHomeButton onClick={() => navigate('/')} /> {/* Botão para voltar à Tela Inicial */}
      <CapsuleBodyContainerStyle> {/* Envolvendo o conteúdo no CapsuleBodyContainer */}
        <div className="container" id='search-container'>
          <h1 className="my-4">Buscar PDFs</h1>
          <SearchBar onSearch={handleSearch} />
          <ResultsList results={results} />
        </div>
      </CapsuleBodyContainerStyle>
    </>
  );
};

export default HomeNew;