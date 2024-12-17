import { useState } from 'react';
import Inputs from '../components/Inputs';
import Button from '../components/Button';
import Footer from '../components/Footer';
import ConfirmationDialog from '../components/ConfirmationDoc'; // Importando o diálogo
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import "../style/reqGeral.css"; // Mantenha este import se precisar dos estilos
import GlobalStyle from '../style/GlobalStyle';
import styled from 'styled-components';
import { generateDoc } from '../components/validacao/generateDoc'; // Ajuste o caminho conforme necessário
import { validateRg, validateCpf } from '../components/validacao/validation'; // Ajuste o caminho conforme necessário
import CapsuleBodyContainer from '../components/CapsuleForm'; // Importando o CapsuleBodyContainer

const BodyContainerStyle = styled.div`
height: 30vh;

button {
    width: auto;
    margin-bottom: 100px;
}
`;

const UniaoModifyStyle = styled.div`
#label-solicitacao, #label-nome, .div-radio {
    display: none;
}

form {
    display: grid;
    grid-template-columns: 65% 1fr;
    height: 15vh;
    width: 90%;
    padding-left: 3.5%;
    margin-top: 0;

    & #label-rg-cpf {
        align-items: center;
        height: 100%;
        width: 100%;
        gap: 0 6%;
        padding-left: 16%;

        & p {
            display:flex;
            align-items: flex-end;
            margin: 0 0 0 5px;
        }
        
    }
    & #label-emissor {
        margin: 0 0 5% 0;
        gap: 2%;

        & p {
            width: 100%;
            margin: auto auto auto 3px;
        }
        & #emissor {
        min-height: 41px;
        width: 100%;
        border: none;
        border-radius: 10px;
        outline-color: #1A4862;
        }
    }
}

input {
    width: 195px;
    min-height: 37px;
    font-size: 1.1rem;
    letter-spacing: .1rem;
    padding-left: 2%;
}
`;

const ErrorMessage = styled.p`
 color: red;
 font-size: 0.9rem;
 margin-top: -6px;
`;

const UniaoEstav = () => {
    const navigate = useNavigate(); // Hook para navegação
    const [formData, setFormData] = useState({
        rg: '',
        cpf: '',
        emissor: '' // Adicionando emissor aqui
    });

    const [errors, setErrors] = useState([]); // Estado para armazenar os erros
    const [isDialogOpen, setDialogOpen] = useState(false); // Estado para controlar o diálogo

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleNext = () => {
        const { rg, cpf, emissor } = formData; // Incluindo emissor na validação
        let newErrors = [];

        // Verificar se RG, CPF e Emissor estão preenchidos
        if (!rg || !cpf || !emissor) {
            newErrors.push('Por favor, insira RG, CPF e Emissor.');
        } else {
            // Validação para RG
            if (!validateRg(rg)) {
                newErrors.push('Por favor, insira um RG válido.');
            }

            // Validação para CPF
            if (!validateCpf(cpf)) {
                newErrors.push('Por favor, insira um CPF válido.');
            }
        }

        if (newErrors.length > 0) {
            setErrors(newErrors); // Define os erros e não prossegue
            return; 
        }

        setErrors([]); // Limpa os erros se tudo estiver válido

        const docType = 'declaracao'; // Define o tipo de documento como 'declaracao'
        generateDoc(formData, docType); // Chama a função generateDoc com formData e o tipo de documento
        setDialogOpen(true); // Abre o diálogo
    };

    return (
        <>
            <GlobalStyle />
            <CapsuleBodyContainer>
                <BodyContainerStyle className="body-container " id="id-body-container">
                    <Button text="Tela Inicial" isHomeButton onClick={() => navigate('/')} />
                    <UniaoModifyStyle className="card-box card-reqGeral uniao-estavel">
                        <Inputs formData={formData} handleChange={handleChange} currentStep={1} /> {/* Certifique-se que Inputs apenas gera RG, CPF e Emissor */}

                        {/* Exibição de erros */}
                        {errors.length > 0 && (
                            <div>
                                {errors.map((error, index) => (
                                    <ErrorMessage key={index}>{error}</ErrorMessage>
                                ))}
                            </div>
                        )}

                        <div className="buttons">
                            <Button text="Gerar Documento" isSubUni={true} onClick={handleNext} />
                        </div>
                    </UniaoModifyStyle>
                </BodyContainerStyle>
            </CapsuleBodyContainer>

            <Footer />
            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
};

export default UniaoEstav;
