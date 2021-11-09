import classes from './App.module.css';
import { useContext } from 'react';
import { Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Products from './components/Product/Product';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import AuthContext from './store/auth-context';

function App() {
  const ctx = useContext(AuthContext);
  debugger;
  return (
    <>
      <div className={classes.content}>
        <Header />
        <main>
          <Switch>
            <Route path="/" exact>
              {ctx.isLoggedIn && <h1>Welcome to Product Demo App</h1>}
              {!ctx.isLoggedIn && <Login />}
            </Route>
            <Route path="/login">
              {!ctx.isLoggedIn && <Login />}
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
            <Route path="/products/:id" exact>
              <ProductDetail />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>

          </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
