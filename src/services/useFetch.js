import { useState, useEffect, useContext } from "react";
import AuthContext from '../store/auth-context';
const baseUrl = 'https://0s17580d0h.execute-api.us-east-1.amazonaws.com/';

export default function useFetch(url) {

  const ctx = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        debugger;
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + ctx.accessToken
          }
        };
        const response = await fetch(baseUrl + url, options);
        if (response.ok) {
          const resp = await response.text();
          setData(JSON.parse(resp));
        } else {
          throw response;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [url, ctx.accessToken]);

  return { data, error, loading };
}
