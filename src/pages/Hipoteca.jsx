import { useState } from 'react';
import Button from '../components/Button';
import Inputs from '../components/Inputs';
import CapsuleBodyContainer from '../components/CapsuleForm';
import Footer from '../components/Footer';
import ConfirmationDialog from '../components/ConfirmationDoc';
import "../style/reqGeral.css";
import styled from 'styled-components';
import GlobalStyle from '../style/GlobalStyle';
import { generateDoc } from '../components/validacao/generateDoc';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

const BodyContainerStyle = styled.div`
    height: 33vh;

    .card-box {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        width: 48vw;
        height: 32vh;
        margin-top: 0;
        border-radius: 20px;
        border: 1px solid #0000001a;
    }
    button {
        width: auto;
        margin-bottom: 65%;
    }
`;

const Hipoteca = () => {
    const navigate = useNavigate(); // Hook para navegação
    const [formData, setFormData] = useState({
        descricao: '', // Apenas a descrição
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleNext = () => {
        const docType = 'documentacaoHipoteca'; // Define o tipo de documento
        generateDoc(formData, docType); // Gera o documento
        setDialogOpen(true); // Abre o diálogo
    };
    const [isDialogOpen, setDialogOpen] = useState(false); // Estado para controlar o diálogo
    return (
        <>
            <GlobalStyle />
            <CapsuleBodyContainer>
                <BodyContainerStyle className="body-container" id="id-body-container">
                    <Button text="Tela Inicial" isHomeButton onClick={() => navigate('/')} /> {/* Atualizando para usar useNavigate */}
                    <div className="card-box card-reqGeral">
                        <Inputs
                            formData={formData}
                            handleChange={handleChange}
                            currentStep={3} // Apenas o passo da descrição
                        />
                        <div className="buttons">
                            <Button
                                text="Gerar Documento"
                                onClick={handleNext}
                                isSubHipo={true} // Passando a nova prop
                            />
                        </div>
                    </div>
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

export default Hipoteca;
