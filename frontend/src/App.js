import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menus from "./pages/Menus";
import Login from "./pages/Login";
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import UserList from './pages/UserList';
import UpdateUser from './pages/UpdateUser';
import ProductList from './pages/ProductList';
import UpdateProduct from './pages/UpdateProduct';
import OrderList from './pages/OrderList';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/menus' element={<Menus />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/shipping' element={<Shipping />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/placeorder' element={<PlaceOrder />} />
              <Route path='/order/:id' element={<Order />} />
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/cart/:id/*' element={<Cart />} />
              <Route path='/search/:keyword' element={<Home />} />
              <Route path='/page/:pageNumber' element={<Home />} />
              <Route path='/search/:keyword/page/:pageNumber' element={<Home />} />
              
              {/* Admin */}
              <Route path='/admin/userlist' element={<UserList />} />
              <Route path='/admin/update/user/:id' element={<UpdateUser />} />
              <Route path='/admin/productlist' element={<ProductList />} />
              <Route path='/admin/productlist/:pageNumber' element={<ProductList />} />
              <Route path='/admin/product/update/:id' element={<UpdateProduct />} />
              <Route path='/admin/orderlist' element={<OrderList />} />
            </Routes>
          </Container>
        </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
