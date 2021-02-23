import Footer from './component/Footer';
import Header from './component/Header';
import { Container } from 'react-bootstrap';
import {HomeScreen} from './screens/HomeScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { ProductScreen } from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShipingScreen from './screens/ShipingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import UserEditScreen from './screens/UserEditScreen'
import ProductEditScreen from './screens/ProductEditScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main className='py-3'>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/shipping' component={ShipingScreen}/>
          <Route path='/payment' component={PaymentScreen}/>
          <Route path='/products/:id' component={ProductScreen} exact/>
          <Route path='/cart/:id?'  component={CartScreen}/>
          <Route path='/sigin' />
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/userlist' component={ UserListScreen}/>
          <Route path='/admin/productlist' component={ ProductListScreen}/>
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
