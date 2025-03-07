import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Footer from "./Footer.jsx";
import Header from "./header.jsx";
import Content from "./Content.jsx"
import "./header.css"
import Candidate from './Candidate.jsx';
function App() {
  return (
    <div className="hello">
      <Header />
      <Candidate/>
 
    </div>
  );
}

export default App;
