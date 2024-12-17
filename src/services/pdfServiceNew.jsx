export const fetchPdfs = async (keyword, path) => {
  const url = import.meta.env.VITE_API;
  const response = await fetch(url + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ palavra_chave: keyword }),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Erro ao buscar PDFs");
  }
};