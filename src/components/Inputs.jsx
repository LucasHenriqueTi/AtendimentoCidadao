import { useRef, useEffect } from "react";
import { default as MaskedInput } from "react-text-mask"; // Importando a nova biblioteca
import styled from "styled-components";
import PropTypes from "prop-types";
import Tooltip from "./tooltip/Tooltip";
import "../style/reqGeral.css";

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  resize: none;
`;

const StyledForm = styled.form`
  display: flex;

  & #label-emissor {
      display: flex;

      & p{
        margin: auto auto auto 0;
      }
      & #emissor{
        margin: auto auto auto 0;
      }
    }
  & .span-with-icon {
    display: flex;
    align-items: center;
  }
  & #label-rg-cpf {
    display: grid;
    grid-template-columns: 36% 64%;
    height: 70px;

    & #cpf {
      width: 55%;
      margin: auto auto auto 0;
      }

    & p {
      margin: auto 0;
      height: auto;
    }

    & #rg {
      margin: 0;
      width: 90%;
    }
    & #emissor {
      margin: 0;
      width: 60%;

      & option {
        height: 20px;
        margin:0;
      }
    }
  }
`;

const Inputs = ({ formData, handleChange, currentStep }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentStep === 1 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  return (
    <>
      <StyledForm>
        {currentStep === 1 && (
          <>
            <div className="div-radio"> {/*Input radio foi removido visualmente e sua função está como automático para requerente devido a pedido de Hamilton, responsável pelo acompanhamento do projeto dentro do NACI*/}
              <label htmlFor="idDadosMutuario" className="label-radio">
                <p>Mutuário/a</p>
                <input
                  type="radio"
                  name="mutOrReq"
                  className="input-radio"
                  id="idDadosMutuario"
                  value="Mutuário"
                  required
                  checked={formData.mutOrReq === "Mutuário"}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <Tooltip message="Mutuário: adquirente do imóvel"></Tooltip>
              </label>

              <label htmlFor="idRequerente" className="label-radio">
                <p>Requerente</p>
                <input
                  type="radio"
                  name="mutOrReq"
                  className="input-radio"
                  id="idRequerente"
                  value="Requerente"
                  required
                  checked={formData.mutOrReq === "Requerente"}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <Tooltip message="Requerente: É a parte que faz um requerimento, aquele que solicita algo a alguém"></Tooltip>
              </label>
            </div>

            <label
              htmlFor="solicitacao"
              className="label-input-data label-input-text"
              id="label-solicitacao"
            >
              <p className="span-with-icon">
                Solicitação:
                <Tooltip message="Tipo de solicitação que você precisará descrever"></Tooltip>
              </p>
              <input
                type="text"
                className="input-text"
                id="solicitacao"
                value={formData.solicitacao}
                onChange={handleChange}
                ref={inputRef}
                required
                autoComplete="off"
                maxLength={50}
              />
            </label>

            <label
              htmlFor="rg"
              className="label-input-data label-input-text"
              id="label-rg-cpf"
            >
              <p>RG:</p>
              <p>CPF:</p>
              <MaskedInput
                mask={[
                  /[A-Za-z0-9]/,
                  /[A-Za-z0-9]/,
                  ".", // Dois primeiros dígitos
                  /[A-Za-z0-9]/,
                  /[A-Za-z0-9]/,
                  /[A-Za-z0-9]/,
                  ".", // Três dígitos centrais
                  /[A-Za-z0-9]/,
                  /[A-Za-z0-9]/,
                  /[A-Za-z0-9]/,
                  "-", // Três últimos dígitos
                  /[A-Za-z0-9]/, // Dígito verificador
                ]}
                className="input-text"
                id="rg"
                value={formData.rg}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              <MaskedInput
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ]} // Máscara sem escape
                className="input-text"
                id="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label
              htmlFor="nome"
              className="label-input-data label-input-text"
              id="label-nome"
            >
              <p>Nome completo:</p>
              <input
                type="text"
                className="input-text"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label htmlFor="emissor" className="label-input-data label-input-text" id="label-emissor">

              <p>Emissor:</p>
              <select
                id="emissor"
                className="input-text"
                value={formData.emissor}
                onChange={handleChange}
                required
                autoComplete="off"
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="SSP">SSP</option>
                <option value="SDS">SDS</option>
                <option value="PF">PF</option>
                <option value="IFP">IFP</option>
                <option value="DETRAN">SDS</option>
                <option value="OAB">OAB</option>
                <option value="PC">PC</option>
                <option value="PM">PM</option>
                <option value="CRM">CRM</option>
                <option value="COREN">COREN</option>
                <option value="CREA">CREA</option>
                <option value="CREF">CREF</option>
                <option value="Cartorio">Cartório Civil</option>
                <option value="Outro">Outro</option>
              </select>
            </label>
          </>
        )}

        {currentStep === 2 && (
          <>
            <label
              htmlFor="endereco"
              className="label-input-data label-input-text"
            >
              <p>Endereço:</p>
              <input
                type="text"
                className="input-text"
                id="endereco"
                value={formData.endereco}
                onChange={handleChange}
                required
                autoComplete="off"
                maxLength={50}
              />
            </label>

            <label
              htmlFor="email"
              className="label-input-data label-input-text"
            >
              <p>E-mail:</p>
              <input
                type="email"
                className="input-text"
                id="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                maxLength={35}
              />
            </label>

            <label
              htmlFor="telefone"
              className="label-input-data label-input-text"
            >
              <p>Telefone:</p>
              <MaskedInput
                mask={[
                  "(",
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]} // Máscara sem escape
                className="input-text"
                id="telefone"
                value={formData.telefone}
                onChange={handleChange}
                autoComplete="off"
              />
            </label>

            <label
              htmlFor="encaminhar"
              className="label-input-data label-input-text"
            >
              <p>Encaminhar:</p>
              <select
                id="encaminhar"
                className="input-text"
                value={formData.encaminhar}
                onChange={handleChange}
                required
                autoComplete="off"
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="SRF">SRF</option>
                <option value="SPI">SPI</option>
                <option value="SRI">SRI</option>
                <option value="NIP">NIP</option>
                <option value="DDOC">DDOC</option>
                <option value="SEA">SEA</option>
                <option value="SCT">SCT</option>
              </select>
            </label>
          </>
        )}

        {currentStep === 3 && (
          <label htmlFor="descricao" id="label-descricao">
            <p>Descrição:</p> {/* Alterado de <p> para <span> */}
            <StyledTextarea
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              maxLength={456}
              required
              autoComplete="off"
            />
          </label>
        )}
      </StyledForm>
    </>
  );
};

// Definindo as validações das props
Inputs.propTypes = {
  formData: PropTypes.shape({
    mutOrReq: PropTypes.string,
    solicitacao: PropTypes.string,
    rg: PropTypes.string,
    emissor: PropTypes.string,
    nome: PropTypes.string,
    cpf: PropTypes.string,
    endereco: PropTypes.string,
    email: PropTypes.string,
    telefone: PropTypes.string,
    encaminhar: PropTypes.string,
    descricao: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default Inputs;
