import './Style/Style.css';
import './Style/Responsive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './Pages/Products/ProductPage';
import Home from './Pages/Home/Home';
import Signup from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
// import Dashboard from './Pages/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Pages/Products/Cart';
import CategoryClothes from './Pages/Home/CategoryClothes';
import DashBoardTab from './Pages/Dashboard/DashBoardTab';
import Profile from './Pages/Others/Profile';
import ProtectedRoute from './Pages/Auth/ProtectedRoute';

function App() {
  return (
    <>



      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<DashBoardTab />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mens/:title/:id" element={<ProductPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/men/:category' element={<CategoryClothes />} />
          <Route path='/profile/:user/:id' element={<ProtectedRoute />}>
            <Route path='/profile/:user/:id' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
