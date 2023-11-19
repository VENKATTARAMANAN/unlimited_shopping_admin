import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Screens/Login';
import HomePage from './Screens/HomePage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/homepage" element={<HomePage/>}/>
    </Routes>
    </>
  );
}

export default App;
