import { useState } from "react";
import PropTypes from "prop-types"; // Importe a biblioteca PropTypes

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  
  const handleSearchClick = () => {
    onSearch(keyword);
  };

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Digite a palavra-chave"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleSearchClick}>
        Buscar
      </button>
    </div>
  );
};

// Validação das props
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Valida que onSearch é uma função e é obrigatória
};

export default SearchBar;
