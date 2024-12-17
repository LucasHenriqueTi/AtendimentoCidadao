import styled from 'styled-components';
import PropTypes from 'prop-types'; // Importando PropTypes para validação

const CapsuleBodyContainerStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #47A2C3B2;
    width: 80vw;
    height: 65vh;
    border-radius: 100px;
    border: 3px solid #F3B105;
    box-shadow: 0px 4px 50px 0px #F3B10566;
`;

const CapsuleBodyContainer = (props) => {
  return (
    <CapsuleBodyContainerStyle>
      {props.children}
    </CapsuleBodyContainerStyle>
  );
};

// Definindo a validação das props
CapsuleBodyContainer.propTypes = {
  children: PropTypes.node, // 'node' permite qualquer tipo de conteúdo (elementos React, strings, etc.)
};

export default CapsuleBodyContainer;
