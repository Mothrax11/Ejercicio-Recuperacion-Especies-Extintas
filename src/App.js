import './App.css';
import EspeciesDatos from './EspeciesDatos';
import { EspeciesProvider } from './EspeciesProvider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EspeciesProvider>
        <EspeciesDatos/>
        </EspeciesProvider>
      </header>
    </div>
  );
}

export default App;
