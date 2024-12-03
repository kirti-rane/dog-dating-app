import './App.css';
import './Components/signUp';
import Navbar from './Components/Navbar';
import SignUp from './Components/signUp'; // Correct component name (PascalCase)
import Reviews from './Components/Reviews';
import Carousel from 'react-bootstrap/Carousel';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated imports

function App() {
  return (

    <div className="App">
      <Navbar />
      <Routes>  {/* Use Routes here */}
        <Route path="/signUp" element={<SignUp />} /> {/* Use 'element' prop with JSX */}
      </Routes>

      {/* <div class="carousel slide">
          <Reviews name="Alice" review="My dog has found a new Love"/>
        </div> */}

      <Carousel>
        <Carousel.Item>
          <Reviews name="Alice" review="My dog has found a new Love" />
        </Carousel.Item>
        <Carousel.Item>
          <Reviews name="Kirti" review="My dog has found a new Love" />
        </Carousel.Item>
        <Carousel.Item>
          <Reviews name="John" review="Such a wonderful experience!" />
        </Carousel.Item>
      </Carousel>
    </div>



  );
}

export default App;
