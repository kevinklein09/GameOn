/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */

import React from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
const ENV = require('../../.env');

const { MAP_TOKEN } = ENV;

const AddressField = ({ handleAddress, handleCity, handleState, handleZip, address, city, state, zip}) => (
  <div>
    <AddressAutofill accessToken={MAP_TOKEN}>
    <input
      name="address"
      placeholder="Address"
      type="text"
      onChange={(e) => handleAddress(e)}
      value={address || ''}
      autoComplete="address-line1" />
  </AddressAutofill>
    <input
      name="city" placeholder="City" type="text"
      onChange={(e) => handleCity(e)}
      value={city || ''}
      autoComplete="address-level2" />
    <input
      name="state" placeholder="State" type="text"
      onChange={(e) => handleState(e)}
      value={state || ''}
      autoComplete="address-level1" />
    <input
      name="postcode" placeholder="Postcode" type="text"
      onChange={(e) => handleZip(e)}
      value={zip || ''}
      autoComplete="postal-code" />

  </div>
)

export default AddressField;