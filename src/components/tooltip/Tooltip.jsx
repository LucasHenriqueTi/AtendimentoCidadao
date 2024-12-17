import PropTypes from 'prop-types';
import './style.css'; 

const Tooltip = ({ message, children }) => {
  return (
    <span className="tooltip-container">
      <span className="tooltip-trigger">
        {children}
        <span className="tooltip-text">{message}</span>
        <span id="i">i</span>
      </span>
    </span>
  );
};

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Tooltip;
