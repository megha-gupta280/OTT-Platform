import './App.css';
import Home from "./components/Home";
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { connect } from "react-redux";

function App() {
  const counter = useSelector((state) => state.id)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/shows" />} />
          <Route exact path={`/shows/${counter}`} element={<Home />} />
          <Route exact path="/shows" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default connect()(App);
