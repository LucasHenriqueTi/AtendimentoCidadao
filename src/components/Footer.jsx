import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #47A2C3;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  height: 1.5%;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem; /* Tamanho de fonte padrão */

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajuste para tablets */
    padding: 15px 0; /* Espaçamento maior em tablets */
  }

  @media (max-width: 480px) {
    font-size: 0.7rem; /* Ajuste para dispositivos móveis */
    padding: 5px 0; /* Espaçamento maior em mobile */
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
 Todos os direitos reservados - Versão 1.1
    </FooterContainer>
  );
};

export default Footer;
