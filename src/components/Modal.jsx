import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';  
import styled from 'styled-components'; 
import Button from './Button'; // Importando o botão que foi modificado
import { generateDoc } from '../components/validacao/generateDoc'; // Certifique-se de ajustar o caminho conforme necessário

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
  z-index: 10000; /* Z-index alto para ficar acima dos outros elementos */
  pointer-events: none; /* Impede a interação com o fundo */
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  width: 30vw;
  height: auto; /* se adapta a resolução do zoom +125% */
  position: relative; 
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: auto; /* Permite interação somente com o modal */ 
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px; /* Move o botão "X" para o canto superior direito */
`;

const ButtonList = styled.div`
  margin-top: 40px; /* Espaço adicional para garantir que os botões fiquem abaixo do botão "X" */
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  background-color: white;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  color: black;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background-color: #47A2C3;
    color: white;
  }
`;

const Modal = ({ isOpen, onClose }) => { // Adicionando formData como prop
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); 
    navigate('/'); 
  };

  const handleDownload = async (docType) => {
    await generateDoc({}, docType); // Chame a função de geração de PDF com o tipo de documento
};

  if (!isOpen) return null; 

  return (
    <ModalBackground>
      <ModalContent>
        <CloseButtonWrapper>
          <Button text="X" isClose={true} onClick={handleClose} />
        </CloseButtonWrapper>

        <ButtonList>
          <StyledButton onClick={() => handleDownload('procuraoParticular')}>
            Procuração Particular
          </StyledButton>
          <StyledButton onClick={() => handleDownload('requerimentoGeral')}>
            Requerimento Geral
          </StyledButton>
          <StyledButton onClick={() => handleDownload('documentoEscritura1')}>
            Documento Escritura 1ª Hipótese Mutuário Residente
          </StyledButton>
          <StyledButton onClick={() => handleDownload('documentoEscritura2')}>
            Documento Escritura 2ª Hipótese Separado ou Divorcio
          </StyledButton>
          <StyledButton onClick={() => handleDownload('documentoEscritura3')}>
            Documento Escritura 3ª Hipótese Sinistro
          </StyledButton>
        </ButtonList>
      </ModalContent>
    </ModalBackground>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,  
  onClose: PropTypes.func.isRequired,  
};

export default Modal;
