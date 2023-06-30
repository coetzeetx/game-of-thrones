import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HousesList from './components/HousesList/HousesList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HousesList/>} />
      </Routes>
    </Router>
  );
}

export default App;
