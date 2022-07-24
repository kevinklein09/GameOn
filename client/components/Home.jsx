import React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a373ab',
      darker: '#395B64',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const Home = () => (
  <ThemeProvider theme={theme}>
      <div>
        <br></br><br></br>
    <Typography variant="h4">Welcome to GameOn.</Typography>
    <Typography>We are excited that you are here. If you want to find people to play local pick up games, you have come to the right place. With our app you can join scheduled games ranging from football to volleyball to even ping pong! Never again will you miss out on playing your favorite sport with like-minded people. <Link to="/login">Sign up</Link> for a free account today to get started!</Typography>
    <br></br>
    <br></br>
    <Typography variant="h5">FAQs</Typography>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: '#A5C9CA',
          }}
        >
          <Typography><strong>Do I have to pay anything?</strong></Typography>
        </AccordionSummary>
        <AccordionDetails sx={{
          backgroundColor: '#A5C9CA',
        }}>
          <Typography>
          Nope! Our app is completely free to use, just login with your Google account and
          you will be ready to go!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{
            backgroundColor: '#A5C9CA',
          }}
        >
          <Typography><strong>How do I use your app?</strong></Typography>
        </AccordionSummary>
        <AccordionDetails sx={{
          backgroundColor: '#A5C9CA',
        }}>
          <Typography>
            If you want to browse the games happening in your area, simply visit
            the <strong>Games</strong> tab at the top of the page.
            If you want to host your own game, click on <strong>Post</strong>.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{
            backgroundColor: '#A5C9CA',
          }}
        >
          <Typography><strong>What sports can I host?</strong></Typography>
        </AccordionSummary>
        <AccordionDetails
                  sx={{
                    backgroundColor: '#A5C9CA',
                  }}>
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
      </ThemeProvider>
);
export default Home;
