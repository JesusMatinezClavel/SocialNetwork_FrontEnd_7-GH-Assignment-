// Styles
import './App.css'

//Bootstrap
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';

// Methos/modules

//Components/Views
import { Body } from "./pages/body/body";
import { Header } from "./common/header/header";
import { Footer } from "./common/footer/footer";

//Redux


function App() {

  return (
    <>
      <Container fluid>
        <Row>
          <Header />
          <Body />
          <Footer />
        </Row>
      </Container>
    </>
  )
}

export default App
