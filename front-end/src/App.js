import { NewsReader } from "./NewsReader";
import "./App.css";
import logo from "./assets/images/logo.png";

function App() {
  return (
    <div className="App-container">
      <header className="App-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <p>A GIT Delinquent: News Reader App</p>
        </div>
      </header>
      <NewsReader />
    </div>
  );
}

export default App;

//testingthecommitactions
