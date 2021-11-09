import React, { useState, useEffect } from 'react';
import userCognitoPool from '../UserPool';
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (email, password) => { },
  accessToken: '',
  errorMessage: '',
  authenticateUser: () => { },
  getSession: () => { },
  isProcessing: false
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const user = await userCognitoPool.getCurrentUser();
        if (user.Session) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    })()


  }, []);
  debugger;
  const logoutHandler = () => {
    const user = userCognitoPool.getCurrentUser();
    if (user) {
      user.signOut();
      setAccessToken('');
    }
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    setIsLoading(true);
    authenticateUser(email, password)
      .then((data) => {
        setAccessToken(data.getAccessToken().getJwtToken());
        setIsLoggedIn(true);
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage(error.message);
        setIsLoggedIn(false);
        setAccessToken('');
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const authenticateUser = async (emailId, password) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: emailId, Pool: userCognitoPool });

      const authDetail = new AuthenticationDetails({
        Username: emailId,
        Password: password
      });

      user.authenticateUser(authDetail, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (error) => {
          reject(error);
        }
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        accessToken: accessToken,
        errorMessage: errorMessage,
        authenticateUser,
        isProcessing: isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
