import PropTypes from 'prop-types'; // Import PropTypes
import { formatFileName } from "../utils/formatUtils";

const ResultsListNew = ({ results }) => {
  const caminho = import.meta.env.VITE_API;
  return (
    <ul className="list-group mt-3">
      {results.map((url, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{formatFileName(url)}</span>
          <div className="button-group">
            <a
              href={`${caminho}${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm mx-2"
            >
              Ver PDF
            </a>
            <a
              href={`/filter?file=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              Filtrar Dados
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Define prop types
ResultsListNew.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string).isRequired, // Expecting an array of strings
};

export default ResultsListNew;
