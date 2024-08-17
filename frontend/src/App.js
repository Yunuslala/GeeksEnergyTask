import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import "./App.css";
import AuthForm from './components/AuthFrom';
import store from './redux/store/store';
import LoginForm from './components/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Updateprofile from './components/Updateprofile';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={ <LoginForm  />} />
            <Route exact path="/register" element={<AuthForm />} />
            <Route exact path="/update-profile/:id" element={<Updateprofile />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
