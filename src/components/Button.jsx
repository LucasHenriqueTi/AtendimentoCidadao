import styled from 'styled-components';
import PropTypes from 'prop-types'; 
import HomeImg from '../assets/Vector.svg'; 

const CustomCard = styled.button`
    background-color: ${props => 
      props.$isNext || props.$isSubmit || props.$isSubHipo || props.$isSubUni ? '#1A4862' : 
      props.$isPrev ? '#1A4862' : props.$isClose ? 'rgb(255, 0, 0)' : '#fffedc'};
    border: ${props => 
      props.$isNext || props.$isSubmit || props.$isSubHipo || props.$isSubUni || props.$isClose ? '1px solid transparent' : 
      props.$isPrev ? '1px solid transparent' : '2px solid #f3b105'};
    border-radius: ${props => 
      props.$isNext || props.$isPrev || props.$isSubmit || props.$isSubHipo || props.$isSubUni ? '8px' : props.$isClose ? '48%' : '15px'};
    padding: ${props => 
      props.$isNext || props.$isPrev || props.$isSubmit || props.$isSubHipo || props.$isSubUni ? '0.6em 1.2em' : props.$isClose ? '0' : '20px'};
    font-size: ${props => 
      props.$isNext || props.$isPrev || props.$isSubmit || props.$isSubHipo || props.$isSubUni ? '0.8em' : props.$isClose ? '1.2rem' : '1.1rem'};
    font-weight: ${props => 
      props.$isNext || props.$isPrev || props.$isSubmit || props.$isSubHipo || props.$isSubUni ? '500' : 'normal'};
    font-family: inherit;
    width: ${props => 
      props.$isNext || props.$isPrev || props.$isSubmit || props.$isSubHipo || props.$isSubUni ? '8%' : props.$isClose ? '35px' : '345px'};
    min-width: ${props => 
      props.$isNext || props.$isPrev || props.$isSubmit || props.$isSubHipo || props.$isSubUni ? '90px' : props.$isClose ? '35px' : '180px'};
    height: ${props => 
    props.$isNext || props.$isPrev || props.$isSubmit || props.$isSubHipo || props.$isSubUni 
        ? 'auto' 
        : props.$isClose ? '35px' : '100%'};
    cursor: pointer;
    transition: background-color 0.5s, transform 0.3s, border-color 0.25s;
    color: ${props => 
      props.$isNext || props.$isPrev || props.$isSubmit || props.$isSubHipo || props.$isSubUni ? '#fff' : props.$isClose ? '#fff' : '#000'};

    &:hover {
      background-color: ${props => 
        props.$isNext || props.$isPrev || props.$isSubmit || props.$isSubHipo || props.$isSubUni ? '#47A2C3' : props.$isClose ? '#ff5c5c' : '#f3b105'};
      color: #fff;
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      width: 40%;
      height: auto;
      font-size: 1rem;
      padding: 15px;
    }

    @media (max-width: 480px) {
      width: 90%;
      font-size: 0.9rem;
      padding: 10px;
    }
`;

const HomeButtonStyled = styled(CustomCard)`
    display: flex;
    align-items: baseline;
    justify-content: space-around;
    background-color: #fff;
    color: #4A7A97;
    border-radius: 16px;
    position: absolute;
    top: 5%;
    left: 3%;
    border: 2px solid #4A7A97;
    gap: .6%;
    padding: .3% 1%;
    height: 4.5%;
    background: #fff;
    width: 5%;

    &:hover {
        transform: scale(1.1);
        transition: 0.8s;
        background-color: #fff;
        color: #4A7A97;
    }

    img {
        width: 20px;
        height: auto;
    }
`;

const Button = ({ text, imgSrc, onClick, isNext, isPrev, isSubmit, isSubHipo, isSubUni, isHomeButton, isClose }) => {
    if (isHomeButton) {
        return (
            <HomeButtonStyled onClick={onClick}>
                <img src={imgSrc || HomeImg} alt={text} />
                {text}
            </HomeButtonStyled>
        );
    }

    return (
      <CustomCard 
        onClick={onClick} 
        $isNext={isNext} 
        $isPrev={isPrev} 
        $isSubmit={isSubmit} 
        $isSubHipo={isSubHipo} 
        $isSubUni={isSubUni} 
        $isClose={isClose}  // Nova prop para o botão de fechar
      > 
        {text}
      </CustomCard>
    );
};

// Definindo as validações das props
Button.propTypes = {
    text: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    onClick: PropTypes.func,
    isNext: PropTypes.bool,
    isPrev: PropTypes.bool,
    isSubmit: PropTypes.bool,
    isSubHipo: PropTypes.bool,
    isSubUni: PropTypes.bool,
    isHomeButton: PropTypes.bool,
    isClose: PropTypes.bool,  // Nova prop para o botão de fechar
};


export default Button;