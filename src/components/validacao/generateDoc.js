import { PDFDocument, rgb } from 'pdf-lib';

// Função para enviar dados para a API
async function sendToApi(data) {
    const url = import.meta.env.VITE_FAKE_API;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar os dados para a API');
        }

        const responseData = await response.json();
        return responseData; // Retorna a resposta da API se necessário
    } catch (error) {
        console.error('Erro ao enviar os dados para a API:', error);
        throw error;
    }
}

export async function generateDoc(formData, docType) {
    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return ''; 
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    // Função para formatar data
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Função para quebrar texto em múltiplas linhas
    const wrapText = (text, maxLength) => {
        const lines = [];
        for (let i = 0; i < text.length; i += maxLength) {
            lines.push(text.slice(i, i + maxLength));
        }
        return lines;
    };

    const dataAtual = formatDate(new Date());
    const encaminhar = formData.encaminhar?.toUpperCase() || '';

    // Dados para enviar para a API
    const apiData = {
        solicitacao: formData.solicitacao, 
        tipoDocumento: formData.mutOrReq,
        encaminhamento: formData.encaminhar, 
        nome: formData.nome, 
        email: formData.email, 
        data: dataAtual,
        descricao: formData.descricao, 
        rg: formData.rg, 
        emissor: formData.emissor,
        endereco: formData.endereco, 
        telefone: formData.telefone, 
        cpf: formData.cpf,
    };

    // Modelos de PDF a serem utilizados
    const urlMap = {
        requerimento1: '/modelos/requerimento1.pdf',
        declaracao: '/modelos/declaracao.pdf',
        documentacaoHipoteca: '/modelos/documentacaoHipoteca.pdf',
        procuraoParticular: '/modelos/procuraoParticular.pdf',
        requerimentoGeral: '/modelos/requerimentoGeral.pdf',
        documentoEscritura1: '/modelos/documentoEscritura1.pdf',
        documentoEscritura2: '/modelos/documentoEscritura2.pdf',
        documentoEscritura3: '/modelos/documentoEscritura3.pdf',
    };

    const url = urlMap[docType] || urlMap['requerimento1'];
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPage(0);

    // Adicionar texto ao PDF dependendo do tipo de documento
    if (docType === 'requerimento1') {
        page.drawText(`Tipo de Documento: ${capitalizeFirstLetter(formData.mutOrReq)}`, { x: 45, y: 605, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Solicitação: ${capitalizeFirstLetter(formData.solicitacao)}`, { x: 45, y: 583, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Encaminhamento: ${encaminhar}`, { x: 320, y: 605, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Nome: ${capitalizeFirstLetter(formData.nome)}`, { x: 45, y: 563, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Email: ${formData.email}`, { x: 320, y: 500, size: 10, color: rgb(0, 0, 0) });
        page.drawText(`Data: ${dataAtual}`, { x: 450, y: 230, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`RG: ${formData.rg}`, { x: 45, y: 543, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Emissor: ${formData.emissor}`, { x: 200, y: 543, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Endereço: ${capitalizeFirstLetter(formData.endereco)}`, { x: 45, y: 523, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Telefone: ${formData.telefone}`, { x: 45, y: 500, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`CPF: ${formData.cpf}`, { x: 320, y: 543, size: 12, color: rgb(0, 0, 0) });

        const descricaoLines = wrapText(formData.descricao, 74);
        descricaoLines.forEach((line, index) => {
            page.drawText(line, { x: 45, y: 436 - (index * 15), size: 12, color: rgb(0, 0, 0) });
        });
    } else if (docType === 'documentacaoHipoteca') {
        page.drawText(`Data: ${dataAtual}`, { x: 450, y: 307, size: 10, color: rgb(0, 0, 0) });
        const descricaoLines = wrapText(formData.descricao, 74);
        descricaoLines.forEach((line, index) => {
            page.drawText(line, { x: 45, y: 280 - (index * 15), size: 12, color: rgb(0, 0, 0) });
        });
    } else if (docType === 'declaracao') {
        page.drawText(`RG: ${formData.rg}`, { x: 63, y: 333, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`Emissor: ${formData.emissor}`, { x: 183, y: 333, size: 12, color: rgb(0, 0, 0) });
        page.drawText(`CPF: ${formData.cpf}`, { x: 63, y: 358, size: 12, color: rgb(0, 0, 0) });
    }

    try {
        const pdfBytes = await pdfDoc.save();
        
        // Criar um link de download direto para o PDF
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const urlBlob = URL.createObjectURL(blob);
        
        // Redirecionar para o link de download
        const link = document.createElement('a');
        link.href = urlBlob;
        link.download = `${capitalizeFirstLetter(docType)}-modelo.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(urlBlob); // Liberar o URL após uso
    } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
    }

    await sendToApi(apiData);
    
    // Limpar o localStorage
    localStorage.removeItem('formData');
}
