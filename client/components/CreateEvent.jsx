/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React from 'react';

const CreateEvents = () => (
      <div>
        <h1>
            THIS IS WHERE YOU CREATE NEW EVENTS
        </h1>

        <form>
          <div id="category">
            <select onChange={() => console.log ("changed")}defaultValue="">
              <option value="" disabled hidden>pick a sport</option>
              <option>basketball</option>
              <option>baseball</option>
              <option>soccer</option>
            </select>
          </div>

          <div id="description">
            <textarea rows="5" cols="60" onChange={(e) => {
              console.log(e.target.value);
            }}>
              Enter Description Here
            </textarea>
          </div>

          <div id="location">
            <input type="text" value="insert location here"></input>
          </div>

          <div id="equipment">
            <input type="text" value="list equipment here"></input>
            <button> add item </button>
          </div>

          <div id="date">
            <input type="date"></input>
          </div>

          <div id="submit">
            <button> POST EVENT </button>
          </div>
        </form>
      </div>
);

export default CreateEvents;
