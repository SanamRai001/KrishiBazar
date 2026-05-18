import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar'
import  Footer from  './components/Footer'
const Layout = () => (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout></Layout>}>
            <Route element={<PrivateRoute></PrivateRoute>}>
              <Route element={<CartPage></CartPage>} path='/cart'></Route>
              <Route element={<CheckoutPage></CheckoutPage>} path='/checkout'></Route>
            </Route>
            <Route element={<HomePage></HomePage>} path='/'></Route>
            <Route element={<ProductPage></ProductPage>} path='/product/:id'></Route>
          </Route>
          <Route element={<LoginPage></LoginPage> } path='/login'></Route>
          <Route element={<RegisterPage></RegisterPage>} path='/register' ></Route>
          <Route element={<NotFoundPage></NotFoundPage>} path='*'></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App