import Footer from './component/Footer';
import Header from './component/Header';
import { Container } from 'react-bootstrap';
import {HomeScreen} from './screens/HomeScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { ProductScreen } from './screens/ProductScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main className='py-3'>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart' />
          <Route path='/sigin' />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
