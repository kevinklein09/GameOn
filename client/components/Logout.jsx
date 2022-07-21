import axios from 'axios'
import React, { useEffect } from 'react'

const Logout = () => {

  useEffect( () => {
    axios.get('/logout')
    .then((res) => {res.redirect('/login')})
    .catch(err => console.error(err));
  })
};

export default Logout;