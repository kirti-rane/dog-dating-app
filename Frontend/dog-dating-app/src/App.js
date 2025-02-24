import './App.css';
import './Components/signUp';
import store from '../src/Store/index'
import { Provider } from 'react-redux'
import SignUp from './Components/signUp'; // Correct component name (PascalCase)
import Home from './Components/Home';
import Login from './Components/login';
import UserInfo from './Components/UserInfo'
import SwipeRight from './Components/SwipeRight'
import { ToastContainer } from 'react-toastify'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated imports

function App() {
  return (

    <div className="App">
      <Provider store={store}>
        <ToastContainer />
        <Routes>  {/* Use Routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userInfo" element={<UserInfo/>}/>
          <Route path="/swipeRight" element={<SwipeRight/>}/>
        </Routes>
      </Provider>


    </div>

  );
}

export default App;
