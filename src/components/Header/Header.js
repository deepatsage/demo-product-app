import { React, useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import classes from './Header.module.css';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';

const Header = () => {
  const ctx = useContext(AuthContext);

  return (<header>
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img alt="Product Demo App" src="/images/logo.png" />
          </Link>
        </li>
        {ctx.isLoggedIn && <li>
          <NavLink activeStyle={classes.activestyle} to="/products">
            Product
          </NavLink>
        </li>}
        {ctx.isLoggedIn && <li>
          <NavLink activeStyle={classes.activestyle} to="/cart">
            Cart
          </NavLink>
        </li>}
        {ctx.isLoggedIn &&
          <li>
            <NavLink onClick={ctx.onLogout} to="/login">
              Logout
            </NavLink>
          </li>
        }
      </ul>
    </nav>
  </header >)
}

export default Header;