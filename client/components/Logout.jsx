import React, { useEffect, useContext } from 'react';
import { UserContext } from '../index';
const axios = require('axios');


const Logout = () => {
  const {context, setContext} = useContext(UserContext);
  console.log(context);

  useEffect(() => {
    axios.get('/logout')
      .then(() => {
        setContext(null);
        console.log('logged out');
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (<div>
      Thanks for using our app! Come back anytime.
    </div>
  );
};
export default Logout;
