import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import RandomizerTool from './components/RandomizerTool';
import PasswordGenerator from './components/PasswordGenerator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Sidebar />
      <Container fluid>
        <Row>
          <Col className='main-content'>
            <Routes>
              <Route path='/' element={<RandomizerTool />} />
              <Route
                path='/password-generator'
                element={<PasswordGenerator />}
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
