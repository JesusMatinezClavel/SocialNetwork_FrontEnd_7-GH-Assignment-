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
      <div className="container-fluid">
        <div className="row">
          <Header />
          <Body />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
