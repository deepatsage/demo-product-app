import React from 'react';
import classes from './Error.module.css';
const ErrorPage = (props) => {
  return (
    <div className={classes.error}>
      <p>An Error has occured!!</p>
    </div>
  )
}
export default ErrorPage;