// Validação dos campos de input

export const validateNome = (nome) => {
    const regex = /^[A-ZÁÉÍÓÚÃÂÊÎÔÛÇ]+( [A-ZÁÉÍÓÚÃÂÊÎÔÛÇ]+)*$/i;
    return regex.test(nome) && /^[A-Za-z\sáéíóúãâêîôûç]+$/.test(nome); // Permitir letras e espaços
};


export const validateSolicitacao = (solicitacao) => {
    return /^[A-Z].*/.test(solicitacao); // Primeira letra maiúscula
};

export const validateRg = (rg) => {
    return rg.trim() !== ''; // Deve ser preenchido
};

export const validateEmissor = (emissor) => {
    return emissor.trim() !== ''; // Deve ser preenchido
};

export const validateCpf = (cpf) => {
    return cpf.trim() !== ''; // Deve ser preenchido
};

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const validateTelefone = (telefone) => {
    return telefone.trim() !== ''; // Deve ser preenchido
};

export const validateDescricao = (descricao) => {
    return /^[A-Z].{0,499}$/.test(descricao); // Começa com maiúscula e até 500 caracteres
};

export const validateEndereco = (endereco) => {
    return endereco.trim() !== ''; // Deve ser preenchido
};

export const validateEncaminhar = (encaminhar) => {
    return encaminhar.trim() !== ''; // Deve ser preenchido
};

/**export const validateMutOrReq = (mutOrReq) => {
    return mutOrReq === 'Mutuário' || mutOrReq === 'Requerente';
};*/

