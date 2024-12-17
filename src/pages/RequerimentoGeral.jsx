import { useState } from "react";
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import CapsuleBodyContainer from '../components/CapsuleForm';
import Footer from '../components/Footer';
import ConfirmationDialog from '../components/ConfirmationDoc'; // Importando o diálogo
import "../style/reqGeral.css";
import styled from "styled-components";
import GlobalStyle from "../style/GlobalStyle";
import { generateDoc } from "../components/validacao/generateDoc";
import {
  validateNome,
  validateSolicitacao,
  validateRg,
  validateCpf,
  validateEmail,
  validateTelefone,
  validateDescricao,
  //validateMutOrReq,
  validateEmissor,
} from "../components/validacao/validation";
import { useNavigate } from "react-router-dom"; // Importando useNavigate


const StepBar = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 55%;
  margin: 0;
  padding: 4px;

  & li {
    list-style: none;
  }
`;
const BodyContainerStyle = styled.div`
  height: 43vh;

  button {
    width: auto;
    margin-bottom: 40px;
  }
  
  #rg, #cpf, #telefone {
    font-size: 1rem;
    letter-spacing: .1rem;
  }
    & #ErrorMessageReqG {
      position: relative;
      bottom: 0;
      height: 10px;
      width: auto;
    }
    & #ErrorMessageReqG > p{
      margin-top: -7px;
    }
`;

const FormSteps = () => {
  const navigate = useNavigate(); // Hook para navegação
  const [formData, setFormData] = useState({
    mutOrReq: "Requerente",
    solicitacao: "",
    rg: "",
    emissor: "",
    nome: "",
    cpf: "",
    endereco: "",
    email: "",
    telefone: "",
    descricao: "",
    encaminhar: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState([]);
  const [docType, setDocType] = useState("requerimento1");
  const [isDialogOpen, setDialogOpen] = useState(false); // Estado para controlar o diálogo


  const handleChange = (e) => {
    const { id, type, value } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        mutOrReq: value,
      }));
    } else {
      const finalValue = value;

      if (id === "nome") {
        const capitalizedValue =
          finalValue.charAt(0).toUpperCase() + finalValue.slice(1);
        const noNumbers = capitalizedValue.replace(/[0-9]/g, "");
        setFormData((prev) => ({ ...prev, [id]: noNumbers }));
      } else if (
        id === "solicitacao" ||
        id === "descricao" ||
        id === "endereco"
      ) {
        const capitalizedValue =
          finalValue.charAt(0).toUpperCase() + finalValue.slice(1);
        setFormData((prev) => ({ ...prev, [id]: capitalizedValue }));
      } else {
        setFormData((prev) => ({ ...prev, [id]: finalValue }));
      }
    }
  };

  const handleNext = () => {
    let isValid = true;
    const newErrors = [];

    if (currentStep === 1) {
      if (!formData.nome ||
          !validateNome(formData.nome) ||
          !formData.solicitacao ||
          !validateSolicitacao(formData.solicitacao) ||
          !formData.rg || 
          !validateRg(formData.rg) ||
          !formData.cpf || 
          !validateCpf(formData.cpf) ||
          //!formData.mutOrReq ||
          //!validateMutOrReq(formData.mutOrReq) ||
          !formData.emissor ||  
          !validateEmissor(formData.emissor)) { 

        newErrors.push("Preencha os campos corretamente");
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.endereco ||
        !formData.encaminhar ||
        formData.email && !validateEmail(formData.email) ||
        formData.telefone && !validateTelefone(formData.telefone) ||
        formData.descricao && !validateDescricao(formData.descricao)) {
        newErrors.push("Preencha os campos corretamente");
        isValid = false;
      }
    }

    if (isValid) {
      setErrors([]);
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // Gera o documento e abre o diálogo
        generateDoc(formData, docType);
        setDialogOpen(true); // Abre o diálogo
      }
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <>
      <GlobalStyle />
      <CapsuleBodyContainer>
        <BodyContainerStyle className="body-container" id="id-body-container">
          <Button
            text="Tela Inicial"
            isHomeButton
            onClick={() => navigate("/")}
          />{" "}
          {/* Atualizando para usar useNavigate */}
          <div className="card-box card-reqGeral">
            <StepBar>
              <li id="etapa-barra-1" className={`etapa-barra etapa-barra-1 ${currentStep >= 1 ? 'active' : ''}`}>1</li>
              <li className={`barra ${currentStep >= 2 ? 'active' : ''}`}></li>
              <li id="etapa-barra-2" className={`etapa-barra etapa-barra-2 ${currentStep >= 2 ? 'active' : ''}`}>2</li>
              <li className={`barra ${currentStep >= 3 ? 'active' : ''}`}></li>
              <li id="etapa-barra-3" className={`etapa-barra etapa-barra-3 ${currentStep >= 3 ? 'active' : ''}`}>3</li>
            </StepBar>
            <Inputs
              formData={formData}
              handleChange={handleChange}
              currentStep={currentStep}
            />
            {errors.length > 0 && (
              <div style={{ color: "red" }} id="ErrorMessageReqG">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <div className="buttons">
              {currentStep === 1 && (
                <Button text="Próximo" isNext={true} onClick={handleNext} />
              )}
              {currentStep === 2 && (
                <>
                  <Button
                    text="Voltar"
                    isPrev={true}
                    onClick={() => setCurrentStep(currentStep - 1)}
                  />
                  <Button text="Próximo" isNext={true} onClick={handleNext} />
                </>
              )}
              {currentStep === 3 && (
                <>
                  <Button
                    text="Voltar"
                    isPrev={true}
                    onClick={() => setCurrentStep(currentStep - 1)}
                  />
                  <Button
                    text="Gerar Documento"
                    isSubmit={true}
                    onClick={() => {
                      setDocType("requerimento1");
                      handleNext();
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </BodyContainerStyle>
      </CapsuleBodyContainer>
      <Footer />
      {/* Diálogo de Confirmação */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default FormSteps;
