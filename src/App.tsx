import { BrowserRouter as Router} from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import Rotas from './layouts/Rotas';

function App() {

  return (
    <Router>
      <MainLayout>
        <Rotas />
      </MainLayout>
    </Router>
  );
}

export default App
