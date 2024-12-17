import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import FormSteps from './pages/RequerimentoGeral';
import UniaoEstav from './pages/UniaoEstav';
import HomeNew from './pages/HomeNew';
import FilterNew from './pages/FilterNew';
import Hipoteca from './pages/Hipoteca'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/form-steps" element={<FormSteps />} />
        <Route path="/uniao-estav" element={<UniaoEstav />} />
        <Route path="/hipoteca" element={<Hipoteca />} />
        <Route path="/homenew" element={<HomeNew />} />
        <Route path="/filter" element={<FilterNew />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
