import { Route, Routes } from 'react-router-dom';
import './App.css';
import Lobby from './screens/Lobby';
import Space from './screens/Space';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path="/" element={<Lobby/>} />
        <Route  path="/space/:spaceId" element={<Space/>} />
      </Routes>
      
    </div>
  );
}

export default App;
