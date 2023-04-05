import React from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
import OutlinedInput from '@mui/material/OutlinedInput';

// const ENV = require('../../.env');

// const { MAP_TOKEN } = ENV;

const AddressField = ({
  handleAddress,
  handleCity,
  handleState,
  handleZip,
  address,
  city,
  state,
  zip,
}) => (
  <div style={{ marginTop: '10px' }}>
    <AddressAutofill accessToken={process.env.MAP_TOKEN}>
      <OutlinedInput
        style={{ backgroundColor: 'white', marginRight: '5px' }}
        placeholder='Address'
        autoComplete='address-line1'
        inputProps={{
          name: 'address',
          onChange: (e) => handleAddress(e),
          required: '',
          value: address || '',
        }}
      />
      {/* <input
      name="address"
      placeholder="Address"
      type="text"
      onChange={(e) => handleAddress(e)}
      value={address || ''}
      required='required'
      autoComplete="address-line1" /> */}
    </AddressAutofill>
    <OutlinedInput
      style={{ backgroundColor: 'white', marginRight: '5px' }}
      placeholder='City'
      autoComplete='address-level2'
      inputProps={{
        name: 'city',
        onChange: (e) => handleCity(e),
        required: '',
        value: city || '',
      }}
    />
    {/* <input
      name="city" placeholder="City" type="text"
      onChange={(e) => handleCity(e)}
      value={city || ''}
      required='required'
      autoComplete="address-level2" /> */}
    <OutlinedInput
      style={{ backgroundColor: 'white', marginRight: '5px' }}
      placeholder='State'
      autoComplete='address-level1'
      inputProps={{
        name: 'state',
        onChange: (e) => handleState(e),
        required: '',
        value: state || '',
      }}
    />
    {/* <input
      name="state" placeholder="State" type="text"
      onChange={(e) => handleState(e)}
      value={state || ''}
      required='required'
      autoComplete="address-level1" /> */}
    <OutlinedInput
      style={{
        backgroundColor: 'white',
        marginRight: '5px',
        marginTop: '10px',
      }}
      placeholder='Postcode'
      autoComplete='postal-code'
      inputProps={{
        name: 'postcode',
        onChange: (e) => handleZip(e),
        required: '',
        value: zip || '',
      }}
    />
    *required
    {/* <input
      name="postcode" placeholder="Postcode" type="text"
      onChange={(e) => handleZip(e)}
      value={zip || ''}
      required='required'
      autoComplete="postal-code" /> */}
  </div>
);

export default AddressField;
