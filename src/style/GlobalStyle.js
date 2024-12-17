// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 /* Estilos globais aqui */
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    overflow: hidden; /* Remove o scroll vertical */
  }


  button {
    cursor: pointer
  }
  .card-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #fff;
    width: 48vw;
    height: 43vh;
    margin-top: 3%;
    border-radius: 20px;
    border: 1px solid #0000001a;

    & .etapa-barra {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      width: 35px;
      height: 35px;
      border: 5px solid #333;
      border-radius: 23px;
      font-size: 1.4em;
      padding: 0;
      margin: 0;
    }

    & .barra {
      height: 6px;
      width: 60px;
      background-color: #333; /* Cor padrão */
    }

    & .barra.active {
      background-color: #48a848; /* Nova cor para as barras a partir da segunda etapa */
    }

    /* Adicionando estilos para as etapas */
    & .etapa-barra.active {
      border-color: #48a848; /* Cor da borda ativa */
    }

    & .etapa-barra.previous {
      border-color: #48a848; /* Cor da borda dos passos anteriores */
    }
  }

  form {
    /* dentro do card-box, irá guardar apenas label > p, input */
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    align-content: flex-end;
    flex-direction: row;
    flex-wrap: wrap;
    width: 99%;
    height: 21vh;
    font-size: .9rem;
    font-weight: normal;
    margin: 15px 0 0 0;

    & .div-radio {
      /* caixa responsável por guardar os dois label > input(radio) */
      display: none;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 64px;
      position: relative;

      & .input-radio {
        background-color: green;
        width: 30%;
      }
    }

    label > p {
      margin-top: 0;
      min-height: 15px;
    }

    .label-input-text {
      margin: 0 0 20px 0;
    }

    /* Label e input para o radio */
    & .label-radio {
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      position: relative;
      padding-left: 35px;
      margin-right: 10px;
      cursor: pointer;
      font-size: 16px;
    }

    & .input-radio {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    /* Estilos para label da descrição */
    & #label-descricao {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: column;
      height: 100%;
      width: 100%;
      padding: 2px !important;
      gap: 3%;
      margin: -10px 0;

      & p {
        /* <p>aragrafo para a descrição, dentro do label */
        width: 95%;
        text-align: left;
        margin: 0;
      }

      & #descricao {
        height: 100%;
        width: 95%;
        padding: 1%;
        border: 1px solid #00000045;
        box-shadow: 2px 3px 4px 0px #00000045 inset;
        border-radius: 10px;
        outline-color: #1A4862;
      }
    }

    & .input-text{
      border: 1px solid #00000045;
      box-shadow: 2px 3px 4px 0px #00000045 inset;
      padding-left: 2%;
    }
  }


/*_____________________________________________________Páginas de Busca (Ainda fora do Padrão, sem protótipo)*/

#search-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  width: 99vw;
  height: 88vh;
  margin: 8vh 0 0 0;
  border-radius: 20px 20px 0 0;
  border: 1px solid #0000001a;

  & .form-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 150px;
    margin: 1vh 0 0 0;
    gap: 5px;

    & .form-control {
      border: 1px solid #00000045;
      box-shadow: 2px 3px 4px 0px #00000045 inset;
      padding-left: 2%;
      width: 81%;
      height: 50px;
      font-size: 1.2rem;
      min-height: 37px;
      border-radius: 10px;
      outline-color: #1A4862;
      padding-left: 10px;
    }

    & .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #1A4862;
      color: #fff;
      font-size: 1rem;
      border: 2px solid #1A4862;
      box-shadow: 0px 4px 4px 0px #00000033;
      padding: 10px 18px;
      gap: 10px;
      height: 50px;
      border-radius: 6px;
      cursor: pointer;
    }

    & .btn:hover {
      background-color: #47A2C3;
      color: #fff;
    }
  }

  button {
    cursor: pointer;
  }

  & ul { /* Container da lista de busca */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    list-style: none;
    max-width: 89%;
    min-width: 89%;
    padding: 20px;
    min-height: 580px;
    border: 1px solid #00000045;
    box-shadow: 2px 3px 4px 0px #00000045 inset;
    border-radius: 10px;
    overflow-y: scroll;

    & li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      border-bottom: 1px solid #3636364d;

      & span {
        display: flex;
        align-items: center;
        height: 60px;
        width: 65vw;
        padding: 1%;
      }

      & .button-group {
        display: flex;
        justify-content: space-around;
        color: #fff;
        width: 22vw;
        gap: 20px;

        & .btn {
          padding: 10px;
          border-radius: 6px;
          text-decoration: none;
        }

        & .btn-primary {
          background-color: red;
          color: #fff;
        }

        & .btn-primary:hover {
          background-color: #d50000;
        }

        & .btn-secondary {
          background-color: #47A2C3B2;
          color: #1e3a8a;
        }

        & .btn-secondary:hover {
          background-color: #31748db2;
        }
      }
    }
  }
}

}    
`;

export default GlobalStyle;
