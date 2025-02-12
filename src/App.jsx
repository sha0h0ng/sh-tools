import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import RandomizerTool from './components/RandomizerTool';
import PasswordGenerator from './components/PasswordGenerator';
import DelimiterToJson from './components/DelimiterToJson';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Sidebar />
      <Container fluid className='main-content'>
        <Routes>
          <Route path='/' element={<RandomizerTool />} />
          <Route path='/password-generator' element={<PasswordGenerator />} />
          <Route path='/delimiter-to-json' element={<DelimiterToJson />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
