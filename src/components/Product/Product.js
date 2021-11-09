import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import useFetch from "../../services/useFetch";
import { Link } from "react-router-dom";
import './Product.module.css'
import classes from './Product.module.css';
import ErrorPage from '../Error/Error';

const Products = () => {
  const { data: products, loading, error } = useFetch(
    "product"
  );

  if (error) return <ErrorPage errorDetails={error} />;
  if (loading) return <LoadingSpinner />;
  if (products && products.length === 0) return <h2>No Records Found!!</h2>;

  return (
    products && <div id="products" className={classes.product} > {
      products.map((p) => {
        return (<div key={p.id} className={classes.product}>
          <Link to={`products/${p.id}`}>
            <img src={`/images/${p.image}`} alt={p.name} />
            <h3>{p.name}</h3>
            <h3>${p.price}</h3>
          </Link>
        </div>)
      })
    }</div >
  )
}

export default Products;