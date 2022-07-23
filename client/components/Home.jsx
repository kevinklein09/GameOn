import React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
const Home = () => (
      <div>
        <br></br><br></br>
    <Typography variant="h4">Welcome to GameOn.</Typography>
    <Typography>We're excited that you're here. If you want to find people to play local pick up games, you've come to the right place. With our app you can join scheduled games ranging from football to volleyball to even ping pong! Never again will you miss out on playing your favorite sport with like-minded people. <Link to="/login">Sign up</Link> for a free account today to get started!</Typography>
    <br></br>
    <br></br>
    <Typography variant="h5">FAQs</Typography>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Do I have to pay anything?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Nope! Our app is completely free to use, just login with your Google account and you'll be ready to go!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>How do I use your app?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you want to browse the games happening in your area, simply visit
            the <strong>Games</strong> tab at the top of the page.
            If You want to host your own game, click on <strong>Post</strong>.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>What sports can I host?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our app currently supports the following sports activities:
            <ul>
              <li>
                Volleyball
              </li>
              <li>
                Basketball
              </li>
              <li>
                Tennis
              </li>
              <li>
                Football
              </li>
              <li>
                Soccer
              </li>
              <li>
                Ultimate Frisbee
              </li>
              <li>
                Softball
              </li>
              <li>
                Bowling
              </li>
              <li>
                Rugby
              </li>
              <li>
                Ping Pong
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
);
export default Home;
