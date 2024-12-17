import { useState } from 'react';
import Button from '../components/Button';
import CapsuleBodyContainer from '../components/CapsuleForm';
import Footer from '../components/Footer';
import ConfirmationDialog from '../components/ConfirmationDoc';
import "../style/reqGeral.css";
import styled from 'styled-components';
import GlobalStyle from '../style/GlobalStyle';
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
        margin-bottom: 210px;
    }
`;

const DocEscritura = () => {
    const [isDialogOpen, setDialogOpen] = useState(false); // Estado para controlar o diálogo
    const navigate = useNavigate();

    // Função para baixar o PDF
    const handleDownloadPdf = (pdfPath) => {
        // Simplesmente cria um link e inicia o download
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = pdfPath.split('/').pop(); // Define o nome do arquivo com base no caminho
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove o link após o clique
        setDialogOpen(true);  // Abre o diálogo de confirmação
    };

    return (
        <>
            <GlobalStyle />
            <CapsuleBodyContainer>
                <BodyContainerStyle className="body-container" id="id-body-container">
                    <Button text="Tela Inicial" isHomeButton onClick={() => navigate('/')} /> {/* Atualizando para usar useNavigate */}
                    <div className="card-box card-reqGeral">

                        <div className="buttons">
                            {/* Primeiro botão que baixa o primeiro PDF */}
                            <Button
                                text="1ª Hipótese - Mut. Residente"
                                onClick={() => handleDownloadPdf('/modelos/1hip.pdf')} // Ajuste o caminho para /modelos
                                isSubmit={true}
                            />
                            {/* Segundo botão que baixa o segundo PDF */}
                            <Button
                                text="2ª Hipótese - Divorciado ou Separado"
                                onClick={() => handleDownloadPdf('/modelos/2hip.pdf')} // Ajuste o caminho para /modelos
                                isSubmit={true}
                            />
                            {/* Terceiro botão que baixa o terceiro PDF */}
                            <Button
                                text="3ª Hipótese - Sinistro"
                                onClick={() => handleDownloadPdf('/modelos/3hip.pdf')} // Ajuste o caminho para /modelos
                                isSubmit={true}
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

export default DocEscritura;
