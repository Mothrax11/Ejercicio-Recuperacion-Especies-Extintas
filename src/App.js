import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import EspeciesDatos from './EspeciesDatos';
import { EspeciesProvider } from './EspeciesProvider';
import EspecieDetail from './EspecieDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EspeciesProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<EspeciesDatos/>}/>
            <Route path="/especie/:id" element={<EspecieDetail/>}/>
          </Routes>
        </BrowserRouter>
        </EspeciesProvider>
      </header>
    </div>
  );
}

export default App;
