 <h2 align='center'>GAME ON</h2>
 
 ---

 <h2 align='left'>HOW TO START THE APP</h2>

---

- in your terminal, run npm install or npm -i to install all of your dependencies

- npm run build to compile your files with webpack

- in a separate terminal, run " npm run start " to start up your server

- create a .env file. the template can be copied from the example.env file
---
 <h2 align='left'>SETUP YOUR ENVIRONMENT</h2>

---

In your .env file, add the following environment variables:
  - MONGODB_PASS= if using MongoDB Cloud, use your connection password here
  - USERNAME= if using MongoDB Cloud, use your connection username here
  - MAP_TOKEN= create a MAPBOX account and create an access token
  - CLIENT_ID=
  - CLIENT_SECRET=
  - EXPRESS_SECRET= 
  - DB_URI= your MongoDB connection string


---

 <h2 align='left'>KNOWN BUGS</h2>

---
The following are the various bugs we were unable to resolve during the course of our project:

<h4 align='left'>PROFILE COMPONENT</h4>

  - Refreshing the profile page breaks the component and throws the error "Rendered more hooks than during the previous render."

<h4 align='left'>MAP COMPONENT</h4>

  - For events at the same location, map overlaps icon markers and prevents popup on click
  - onClick functions do not work within the popup button HTML
  - After a user updates their RSVP and the URL changes with their parameters, refreshing that page breaks that component. For 
  example: localhost:3000/#/map?user=user@gmail.com&userId=62dadc628024c191c8328edd&event=62dadc272bb727037ff7ba04&status=Going

<h4 align='left'>EVENT COMPONENT</h4>

  - Dropdown does not automatically close upon interaction

---
  <h2 align='center'>Available Resources</h2>

  - https://www.mongodb.com/docs/cloud-manager/tutorial/connect-to-mongodb/
  - https://docs.mapbox.com/help/getting-started/access-tokens/
  - https://www.mongodb.com/docs/manual/reference/connection-string/
  - https://reactjs.org/docs/hooks-reference.html#useref
  - https://docs.mapbox.com/mapbox-gl-js/guides/
  - https://visgl.github.io/react-map-gl/docs/api-reference/popup
  - https://mui.com/material-ui/material-icons/
  - https://mui.com/material-ui/customization/color/#main-content 

  