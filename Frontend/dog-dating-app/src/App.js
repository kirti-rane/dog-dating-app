import './App.css';
import './Components/signUp';
import SignUp from './Components/signUp'; // Correct component name (PascalCase)
import Home from './Components/Home';
import Login from './Components/login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated imports

function App() {
  return (

    <div className="App">
     
      <Routes>  {/* Use Routes here */}
        <Route path="/" element={<Home/>}/>
        <Route path="/signUp" element={<SignUp />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>

      
    </div>

  );
}

export default App;
