import { Fragment } from 'react';
import Footer from './component/Footer';
import Header from './component/Header';
import { Container } from 'react-bootstrap';
import {HomeScreen} from './screens/HomeScreen';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Container>
        <main className='py-3'>
          <HomeScreen/>
        </main>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default App;
