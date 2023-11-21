import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Screens/Login';
import HomePage from './Screens/HomePage';
import EditProduct from './Screens/EditProduct';
import AddProduct from './Screens/AddProduct';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/homepage" element={<HomePage/>}/>
      <Route path="/add-product" element={<AddProduct/>}/>
      <Route path="/edit-product/:id" element={<EditProduct/>}/>
    </Routes>
    </>
  );
}

export default App;
