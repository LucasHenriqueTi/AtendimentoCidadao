import styled from 'styled-components';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Ellipse2 from '../assets/Ellipse 2.svg'; 
import Ellipse1 from '../assets/Ellipse 1.svg'; 
import IMGB2 from '../assets/9027293-removebg-preview-transformed 1 (1).svg'; 
import { Link } from 'react-router-dom'; // Importando Link
import { useState } from 'react'; // Para controlar o estado do modal
import Modal from '../components/Modal'; // Importando o componente Modal

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  position: relative;
  width:100vw;
`;

// Título do NACI 
const Title = styled.h1`
  color: #363636;
  font-size: 1.5rem;
  position: absolute;
  left: 9vw;
  top: 28vh; /* Diminuindo a margem superior para subir o título */
  z-index: 9999; /* Ainda está na frente de outros elementos */

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-top: 15%;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-top: 20%;
  }
`;

// CARDS Container
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  z-index: 9999;
  position: absolute;
  top: 9vh;
  right: 8vw;
  height: 67%;
  width: 400px;

  @media (max-width: 768px) {
    left: 85%;
  }

  @media (max-width: 480px) {
    left: 70%;
  }
`;

//pq? 
const CardWrapper = styled.div` 
  height: 27%;
  margin: 0;
`;

// Imagem de baixo do canto esquerdo (circulo esquerdo!!!!!!!!!!!!)
const CircleYellow = styled.img`
  position: absolute;
  bottom: 0.5%;
  left: 0;
   width: 26.7%;
  height: auto;

  @media (max-width: 768px) {
    width: 40%;
    left: -30%;
  }

  @media (max-width: 480px) {
    width: 60%;
    left: -20%;
  }
`;
// Imagem de baixo do canto esquerdo (Bonecos!!!!!!!!!!)
const IMGPeople = styled.img`
  position: absolute;
  bottom: 2.5%;
  left: 1vw;
  width: 45%;
  height: auto;

  @media (max-width: 768px) {
    width: 70%;
    left: -30%;
  }

  @media (max-width: 480px) {
    width: 50%;
    left: -20%;
  }
`;

// Imagem de baixo do canto direito (Download do doc!!!!!!!!!)
const IMGDownload = styled.div`
  position: absolute;
  bottom: 7.5%;
  right: 80px;
  width: 7%;
  height: 14%;
  background-color: white;
  border: 2px solid #47A2C3; /* Blue border */
  border-radius: 50%; /* Makes it circular */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition on hover */

  &:hover {
    background-color: #47A2C3; /* Background color on hover */
    color: white; /* Text color on hover */
    border-color: #ffffff; /* Border color changes on hover */
  }

  &::before {
    content: 'Modelos';
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 8px; /* Space between text and icon */
    color: inherit; /* Text inherits the color, so it changes on hover */
  }

  &::after {
    content: ''; /* Removendo o texto anterior */
    width: 28px; /* Tamanho do SVG */
    height: 28px; /* Tamanho do SVG */
    cursor: pointer;
    transition: all 0.3s ease; /* Suaviza a transição de cor e background */

    /* Adicionando o SVG como fundo */
    background-image: url("data:image/svg+xml;utf8,<svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M14 20.6667L5.66669 12.3333L8.00002 9.91666L12.3334 14.25V0.666656H15.6667V14.25L20 9.91666L22.3334 12.3333L14 20.6667ZM4.00002 27.3333C3.08335 27.3333 2.29891 27.0072 1.64669 26.355C0.994464 25.7028 0.667798 24.9178 0.666687 24V19H4.00002V24H24V19H27.3334V24C27.3334 24.9167 27.0072 25.7017 26.355 26.355C25.7028 27.0083 24.9178 27.3344 24 27.3333H4.00002Z' fill='black'/></svg>"); 
    background-size: cover; /* Ajusta o tamanho do SVG */
    display: inline-block; /* Garante que o SVG seja tratado como um bloco */
    margin-top: 8px; /* Espaçamento entre o texto e o ícone */
  }

  /* Hover do SVG */
  &:hover::after {
    background-image: url("data:image/svg+xml;utf8,<svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M14 20.6667L5.66669 12.3333L8.00002 9.91666L12.3334 14.25V0.666656H15.6667V14.25L20 9.91666L22.3334 12.3333L14 20.6667ZM4.00002 27.3333C3.08335 27.3333 2.29891 27.0072 1.64669 26.355C0.994464 25.7028 0.667798 24.9178 0.666687 24V19H4.00002V24H24V19H27.3334V24C27.3334 24.9167 27.0072 25.7017 26.355 26.355C25.7028 27.0083 24.9178 27.3344 24 27.3333H4.00002Z' fill='white'/></svg>"); 
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    bottom: 10%;
    right: 60px;

    &::before {
      font-size: 0.7rem;
    }

    &::after {
      width: 20px; /* Ajuste para dispositivos móveis */
      height: 20px; /* Ajuste para dispositivos móveis */
    }
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    bottom: 12%;
    right: 50px;

    &::before {
      font-size: 0.6rem;
    }

    &::after {
      width: 16px; /* Ajuste para dispositivos móveis */
      height: 16px; /* Ajuste para dispositivos móveis */
    }
  }
`;

// Circulo azul
const CircleBlue = styled.img`
  position: absolute;
  top: -20px;
  right: 0;
  width: 27.7%;

  @media (max-width: 768px) {
    width: 80px;
    left: 300px;
  }

  @media (max-width: 480px) {
    width: 60px;
    left: 200px;
  }
`;



const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar o modal

  // Função para abrir e fechar o modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen); // Alterna entre abrir e fechar o modal
  };
  return (
    <Container>
      <Title>NACI - NÚCLEO DE ATENDIMENTO AO CIDADÃO</Title>
      <CardContainer>
        <CardWrapper>
          <Link to="form-steps">
            <Button text="Requerimento Geral" />
          </Link>
        </CardWrapper>
        <CardWrapper>
          <Link to="/uniao-estav">
            <Button text="Declaração de não convívio em União Estável" />
          </Link>
        </CardWrapper>
        <CardWrapper>
          <Link to="/hipoteca">
            <Button text="Documentação para Solicitação de Liberação da Hipoteca e Caução - IRH/IPSEP" />
          </Link>
        </CardWrapper>
        <CardWrapper>
          <Link to="/homenew">
            <Button text="Pesquisar Documento" />
          </Link>
        </CardWrapper>
      </CardContainer>


      <CircleBlue src={Ellipse1} alt="Ellipse1" />
      <CircleYellow src={Ellipse2} alt="Ellipse2" />
      <IMGPeople src={IMGB2} alt="IMGB2" />
      <IMGDownload onClick={toggleModal} />
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={toggleModal} />}
      <Footer />
    </Container>
  );
};

export default Dashboard;
