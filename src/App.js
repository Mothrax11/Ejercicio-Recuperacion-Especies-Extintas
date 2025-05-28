import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import EspeciesDatos from './EspeciesDatos';
import { EspeciesProvider } from './EspeciesProvider';
import EspecieDetail from './EspecieDetail';
import Navegacion from './BarraDeNavegacion';
import EspecieFiltradaDatos from './EspecieFiltradaDatos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EspeciesProvider>
          <BrowserRouter>
          <Navegacion></Navegacion>
          <Routes>
            <Route path="/" element={<EspeciesDatos/>}/>
            <Route path="/especie/:id" element={<EspecieDetail/>}/>
            <Route path="/especie/periodo/:periodo/habitat/:habitat" element={<EspecieFiltradaDatos />} />
            <Route path="/especie/habitat/:habitat/periodo/:periodo" element={<EspecieFiltradaDatos />} />
            <Route path="/especie/habitat/:habitat" element={<EspecieFiltradaDatos/>}/>
            <Route path="/especie/periodo/:periodo" element={<EspecieFiltradaDatos/>}/>
          </Routes>
        </BrowserRouter>
        </EspeciesProvider>
      </header>
    </div>
  );
}

export default App;
