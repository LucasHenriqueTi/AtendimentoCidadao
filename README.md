# Projeto NACI - Núcleo de Atendimento ao Cidadão

## Descrição

Este projeto foi desenvolvido em ReactJS com Vite, utilizando as bibliotecas **react-text-mask** (para inputs), **styled-components**, e **pdf-lib**. A aplicação tem como objetivo principal padronizar documentos, facilitando o atendimento ao pessoal do NACI, além de unificar modelos em uma plataforma de dashboard com templates prontos. A aplicação também permite buscar documentos de maneira filtrada, possibilitando que atendentes do NACI pesquisem por nome de bairro ou outros dados essenciais de mutuário ou requerente presentes nos PDFs.

## Funcionalidades

### 1. Geração de PDFs

A lógica para geração de PDFs é realizada pela biblioteca pdf-lib, que permite inserir dados de formulários em um template PDF usando coordenadas com a função `drawText`.

### 2. Envio de Dados via API

Os dados dos formulários são enviados para uma API em formato JSON, armazenando-os de maneira temporária. A aplicação não possui banco de dados local, não realiza auto-complete nem armazena dados localmente. A busca de documentos é feita através de uma solicitação para a API que processa os PDFs, e o backend devolve os resultados correspondentes.

### 3. Busca de Documentos

Uma das funcionalidades da aplicação é a busca de documentos. O usuário pode pesquisar documentos utilizando uma API que processa a busca e retorna o PDF que contém os dados pesquisados, como o nome de um bairro.

## Estrutura do Projeto

- **public/**: Contém arquivos estáticos.
- **src/**: Diretório principal da aplicação.
  - **assets/**: Imagens utilizadas na aplicação.
  - **components/**: Contém todos os componentes da aplicação.
    - **Button.jsx**: Componente para os botões, exceto "procuração particular" do dashboard.
    - **CapsuleForm.jsx**: Componente de estilo que envolve os formulários das páginas.
    - **ConfirmationDoc.jsx**: Botão exibido após o download do documento.
    - **Footer.jsx**: Componente de rodapé da aplicação.
    - **Inputs.jsx**: Componente que reúne todos os inputs dos formulários.
    - **Result.jsx** e **Search.jsx**: Componentes relacionados à busca de documentos.
    - **validacao/**: Pasta que contém a lógica de validação em JavaScript dos inputs e a funcionalidade de geração do documento.
  - **modelos/**: Modelos em PDF utilizados na aplicação.
  - **pages/**: Contém as páginas criadas através dos componentes.
  - **services/**: Funcionalidades relacionadas à busca de PDFs.
  - **styles/**: Estilos globais em JavaScript que podem ser reutilizados em várias páginas.
  - **utils/**: Funcionalidades auxiliares para busca de PDFs.
  - **routers.jsx**: Arquivo que define as rotas da aplicação.

Componentes:

Botões: Todos os botões, exceto "Procuração Particular", estão em button.jsx.  
CapsuleForm: Um estilo que envolve os formulários das páginas.  
ConfirmationDoc: Componente que exibe uma mensagem de sucesso após o download do documento.  
Footer: Componente de rodapé que exibe informações na parte inferior da página.  
Inputs: Todos os inputs dos formulários estão agrupados em um único componente inputs.jsx.  As validações estão em "validation.js" dentro de component.  
Result e Search: Componente que faz parte da funcionalidade de busca de documentos.  

## Instalação

Para rodar o projeto, será necessário instalar as bibliotecas após o comando `npm install`:

```bash
npm install react-text-mask
npm install pdf-lib
npm install styled-components
