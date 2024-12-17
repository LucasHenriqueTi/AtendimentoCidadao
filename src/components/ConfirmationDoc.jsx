import PropTypes from 'prop-types'; 
import { useNavigate } from 'react-router-dom'; 
import amicoImage from '../assets/amico.png'; 
import styled from 'styled-components'; 
import Button from './Button'; // Importando o botão que foi modificado

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(104, 103, 103, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  text-align: right;
  width: 48vw; 
  height: 450px; 
  position: relative; 
`;

const ImgTextContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  height: 100%; 
`;

const MessageText = styled.p`
  margin-top: 80px; 
`;

const ConfirmationDoc = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); 
    navigate('/'); 
  };

  if (!isOpen) return null; 

  return (
    <ModalBackground>
      <ModalContent>
        <Button 
          text="X" 
          isClose={true}  // Define que é o botão de fechar
          onClick={handleClose} 
        />
        <ImgTextContainer>
          <img src={amicoImage} alt="Documento gerado com sucesso!" />
          <MessageText>Seu documento foi gerado com sucesso!</MessageText>
        </ImgTextContainer>
      </ModalContent>
    </ModalBackground>
  );
};

ConfirmationDoc.propTypes = {
  isOpen: PropTypes.bool.isRequired,  
  onClose: PropTypes.func.isRequired,  
};

export default ConfirmationDoc;
